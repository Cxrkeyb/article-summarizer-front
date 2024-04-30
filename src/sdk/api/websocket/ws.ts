import { io, Socket } from 'socket.io-client';

import Storage from '@/sdk/storage/base';
import config from '@/settings';

class SocketServiceMainable {
  socketClient: Socket;

  storage: Storage;

  constructor({ storage }: { storage: Storage }) {
    this.storage = storage;
    this.socketClient = io(`${config.WS_URL}`, {
      withCredentials: true,
      query: { token: this.storage.get('access_token') },
    });
  }

  send(type: string, ...args: any[]): void {
    this.socketClient.emit(type, ...args);
  }

  disconnect(): void {
    this.socketClient.disconnect();
  }

  registerEvent(type: string, fnc: (...args: any[]) => void): void {
    this.socketClient.on(type, (...args: unknown[]) => {
      fnc(...args);
    });
  }
}
export default SocketServiceMainable;
