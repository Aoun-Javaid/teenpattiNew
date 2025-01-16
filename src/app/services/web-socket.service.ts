import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BASE_URL_WS } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: Socket;

  constructor() {
    // Initialize the socket connection
    this.socket = io(BASE_URL_WS, {
      path: '/csp-chat/',
    });

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

    this.socket.on('userTest', (data) => {
      console.log('UserTest event data:', data);
    });

    this.socket.on('message', (data) => {
      console.log('Message received:', data);
    });
  }

  sendMessage(eventName: string, message: any) {
    this.socket.emit(eventName, message);
  }

  onEvent(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
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
