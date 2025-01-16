import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleService } from '../../services/toggle.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  text:any;
  constructor(private toggle: ToggleService, private socketService: WebSocketService) {

  }
  ngOnInit(): void {

    this.socketService.onEvent('userTest', (data) => {
      console.log('Received userTest event:', data);
    });

    this.socketService.onEvent('message', (data) => {
      console.log('Received message event:', data);
    });
    this.socketService.listenForMessages().subscribe((data: any) => {
      if (data) {
        console.log('Received messages:', data);
        // this.updateIncomingMessage(data);
      }
    });
  }
  closeMobSideBar() {
    this.toggle.setMobSideBarState(false);
  }
  sendMessage() {
    this.socketService.sendMessage('message', { content: this.text });
    this.text='';
  }
}
