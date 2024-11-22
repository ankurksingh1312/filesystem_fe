import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:5000', {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server', this.socket?.id);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
    return this.socket;
  }

  emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected, attempting to connect...');
      this.connect();
    }
    console.log(`Emitting ${event}:`, data);
    this.socket?.emit(event, data);
  }

  subscribe(event: string, callback: Function) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected, attempting to connect...');
      this.connect();
    }
    console.log(`Subscribing to ${event}`);
    this.socket?.on(event, (...args) => {
      console.log(`Received ${event}:`, args);
      callback(...args);
    });

  }
  unsubscribe(event: string) {
    this.socket?.off(event);
  }
  
}
export const socketService = new SocketService(); 