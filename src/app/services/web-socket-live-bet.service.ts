import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BASE_URL_WS } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class WebSocketLiveBetService {
  private socket: Socket | undefined;

  constructor() {

  }
  connect(token: string, room: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      console.log('Existing socket connection closed.');
    }
    this.socket = io(BASE_URL_WS, {
      transports: ['websocket'],
      path: '/csp-top-bets/',  // Specify the correct path for WebSocket namespace
      query: { token, room },  // Pass token and project ID
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
  sendMessage(eventName: string, message: any) {
    if (this.socket) {
      this.socket.emit(eventName, message);
    }
  }

  onEvent(eventName: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  }

  listen(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
  listenForMessages(): Observable<any> {
    return new Observable(observer => {
      if (this.socket) {
        this.socket.onAny((eventName: string, data: any) => {
          observer.next({ event: eventName, ...data });
        });
      }
    });
  }
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
