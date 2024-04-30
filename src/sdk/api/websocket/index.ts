import { Socket } from 'socket.io-client';

import WsService from '@/sdk/api/websocket/ws';
import Storage from '@/sdk/storage/base';

class SocketService {
  client: Socket;

  service: WsService;

  dataWaitingForPush: any[] = [];

  attempRecconectionCount = 0;

  isConnect = false;

  lostConnection = false;

  storage: Storage;

  connect = (): void => {
    this.service = new WsService({ storage: this.storage });
    this.client = this.service.socketClient;
    this.handleBasicEvents();
  };

  disconnect = (): void => {
    if (this.isConnect) this.service.disconnect();
  };

  restartConnection = (): void => {
    this.service.disconnect();
    this.connect();
  };

  handleBasicEvents = (): void => {
    this.client.on('connect', () => {
      this.attempRecconectionCount = 1;
      this.isConnect = true;
      this.lostConnection = false;
      this.dataWaitingForPush.forEach((e) => {
        this.send(e.token, ...e.args);
      });
      this.dataWaitingForPush = [];
    });

    this.client.io.on('error', () => {
      this.lostConnection = true;
      this.attempRecconectionCount += 1;
    });

    this.client.io.on('reconnect_error', () => {
      this.isConnect = false;
      this.attempRecconectionCount += 1;
      this.lostConnection = true;
    });
  };

  registerEvent = (type: string, fnc: (...args: any[]) => void): void => {
    this.service.registerEvent(type, fnc);
  };

  send = (token: string, ...args: any[]): void => {
    if (!this.client) {
      this.dataWaitingForPush.push({ token, args });
      return;
    }

    this.service.send(token, ...args);
  };

  setStorage(storage: Storage) {
    this.storage = storage;
  }
}

export const socketClient = new SocketService();
