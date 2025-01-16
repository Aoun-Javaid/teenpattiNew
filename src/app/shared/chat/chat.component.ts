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
  mobSidebarState: boolean = false;
  hideSideBar: boolean = false;
  selectedLanguage: string = 'English';
  selectedOption: string = 'xyz';
  viewType = 'Profile';
  timeoutId: any;
  constructor(private toggle: ToggleService, private socketService: WebSocketService) {

  }
  ngOnInit(): void {
    this.hideSideBar = true;
    this.getMobSidebarState();
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
  getMobSidebarState() {
    this.toggle.getChatMobSidebarState().subscribe((val: boolean) => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (val) {
        setTimeout(() => {
          this.mobSidebarState = val;
        }, 10);
      }
      if (!val) {
        this.mobSidebarState = val;

        this.timeoutId = setTimeout(() => {
          this.hideSideBar = true;
        }, 700);
      } else {
        this.hideSideBar = false;
      }
    });
  }
  closeMobSideBar() {
    this.toggle.setChatMobSidebarState(false);
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
