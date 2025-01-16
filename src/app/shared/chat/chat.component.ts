import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleService } from '../../services/toggle.service';
import { WebSocketService } from '../../services/web-socket.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  text: any;
  casinoChat: any = [];
  connectedUsers: any;
  token:any;
  constructor(private toggle: ToggleService, private socketService: WebSocketService) {

  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.token= uuidv4();
    }
    this.socketService.connect(this.token);

    this.socketService.onEvent('loadConnectedClients', (data) => {
      console.log('Received loadConnectedClients:', data);
      this.connectedUsers = data;
    });

    this.socketService.onEvent('loadNewMessage', (data) => {
      this.updateIncomingMessage(data);
      console.log('Received message event:', data);
    });

  }
  closeMobSideBar() {
    this.toggle.setMobSideBarState(false);
  }
  sendMessage() {
    if (this.text != '') {
      this.socketService.sendMessage('newMessage', { content: this.text });
      this.text = '';
    }
  }
  updateIncomingMessage(data: any) {
    this.casinoChat.push(data);
    this.scrollChat();
  }
  scrollChat(){
    setTimeout(() => {
      const parent = document.querySelector('.messages');
      const lastChild = parent?.lastElementChild;

      if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    }, 200);
  }
}
