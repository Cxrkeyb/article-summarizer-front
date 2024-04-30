import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import { Buffer } from 'buffer';

import Storage from '@/sdk/storage/base';
import { toBase64 } from '@/utils';

import { HINTS } from './constants';

export class AuthClient {
  private readonly discoveryUrl: string;

  private readonly clientId: string;

  private readonly redirectUri: string;

  public authEndpoints: {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    jwksEndpoint: string;
    revocationEndpoint: string;
  };

  public storage: Storage;

  constructor(discoveryUrl: string, clientId: string, redirectUri: string) {
    this.discoveryUrl = discoveryUrl;
    this.clientId = clientId;
    this.redirectUri = redirectUri;
  }

  setStorage(storage: Storage) {
    this.storage = storage;
  }

  init = async (): Promise<void> => {
    try {
      if (this.authEndpoints?.authorizationEndpoint) return;

      const discoveryResponse = await axios.get(this.discoveryUrl);

      this.authEndpoints = {
        authorizationEndpoint: discoveryResponse.data.authorization_endpoint,
        tokenEndpoint: discoveryResponse.data.token_endpoint,
        jwksEndpoint: discoveryResponse.data.jwks_uri,
        revocationEndpoint: discoveryResponse.data.revocation_endpoint,
      };
    } catch (error) {
      console.log(error);
      // throw new Error("Couldn't retrieve authorization endpoints");
    }
  };

  getClaimsFromJWT = (jwt: string): { exp: string } => {
    // Split the JWT into three parts: the header, the payload, and the signature
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [header, payload, signature] = jwt.split('.');

    // Decode the payload using the Buffer class
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');

    // Parse the decoded payload as JSON
    const claims = JSON.parse(decodedPayload);

    return claims;
  };

  checkExpiration = async (token: string | null): Promise<void> => {
    if (!token) return;

    // Check if the token has expired
    const now = new Date();

    const claims = this.getClaimsFromJWT(token);
    const expiration = new Date(parseInt(claims.exp, 10) * 1000);

    if (now > expiration) {
      await this.getRefreshToken();
    }
  };

  getAuthorizationCode = (
    stateCustom?: string | null,
    hint?: keyof typeof HINTS,
  ): void => {
    let base64Hint = '';
    if (hint) {
      base64Hint = toBase64(HINTS[hint]);
    }
    // Generate a random state parameter to include in the authorization request
    const state = stateCustom ?? Math.random().toString(36).substring(2);

    this.storage.set('state', state);

    // Redirect the user to the authorization endpoint with the necessary query parameters
    window.location.replace(
      `${this.authEndpoints.authorizationEndpoint}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${state}&hint=${base64Hint}`,
    );
  };

  exchangeCodeForToken = async (authorizationCode: string): Promise<void> => {
    try {
      // Make a request to the token endpoint to exchange the authorization code for an access token
      const tokenResponse = await axios.post(
        this.authEndpoints.tokenEndpoint,
        {
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.storage.set(
        'access_token',
        tokenResponse.data.access_token,
        tokenResponse.data.expires_in,
      );
      this.storage.set(
        'refresh_token',
        tokenResponse.data.refresh_token,
        tokenResponse.data.expires_in,
      );
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  getRefreshToken = async (): Promise<void> => {
    const refreshToken = this.storage.get('refresh_token');
    if (!refreshToken) return;
    // Make a request to the token endpoint to exchange the refresh token for a new access token
    const tokenResponse = await axios.post(
      this.authEndpoints.tokenEndpoint,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    // Store the new access and refresh tokens in local storage
    this.storage.set('access_token', tokenResponse.data.access_token);
    this.storage.set('refresh_token', tokenResponse.data.refresh_token);
  };

  processCallback = async (): Promise<boolean> => {
    // If they don't, check if they have an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    const state = urlParams.get('state');
    if (!state || !authorizationCode)
      throw new Error('Invalid authorization code');

    const originalState = this.storage.get('state');
    if (state !== originalState) throw new Error('Invalid state parameter');
    this.storage.delete('state');

    // If they do, exchange the authorization code for an access token
    try {
      await this.exchangeCodeForToken(authorizationCode);
      return true;
    } catch {
      // show error message
      throw new Error('Error exchanging authorization code for token');
    }
  };

  async logout(): Promise<void> {
    const accessToken = this.storage.get('access_token');
    if (!accessToken) return;

    try {
      await axios.post(
        this.authEndpoints.revocationEndpoint,
        {
          token: accessToken,
          token_type_hint: 'access_token',
          client_id: this.clientId,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
    } catch (e) {
      Sentry.captureException(e);
    }
    // Remove the access and refresh tokens from local storage
    this.storage.delete('access_token');
    this.storage.delete('refresh_token');
  }
}
