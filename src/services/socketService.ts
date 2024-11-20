import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  subscribe(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  unsubscribe(event: string) {
    this.socket.off(event);
  }
}

export const socketService = new SocketService(); 