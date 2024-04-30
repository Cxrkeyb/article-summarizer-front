import { AuthClient } from '@/sdk';
import setting from '@/settings';

export let authClient: AuthClient;

export default function getAuthClient(redirectURI?: string) {
  if (!authClient) {
    authClient = new AuthClient(
      setting.AUTH_DISCOVERY_URL!,
      setting.AUTH_CLIENT_ID!,
      redirectURI!,
    );
  }
  return authClient;
}
