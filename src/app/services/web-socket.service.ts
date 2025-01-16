import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: Socket;

  constructor() {
    // Initialize the socket connection
    this.socket = io('https://v2.universestudio.online', {
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

  // Method to send messages to the server
  sendMessage(eventName: string, message: any) {
    this.socket.emit(eventName, message);
  }

  // Method to listen to a specific event
  onEvent(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }
  listen(event: string, callback: (data: any) => void): void {
    if (this.socket) {
        this.socket.on(event, callback);
    }
}

disconnect(): void {
    if (this.socket) {
        this.socket.disconnect();
    }
}

}
