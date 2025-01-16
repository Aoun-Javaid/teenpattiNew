import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleService } from '../../services/toggle.service';
import { WebSocketService } from '../../services/web-socket.service';
import { v4 as uuidv4 } from 'uuid';
import { ChatRulesModalComponent } from "../../Modals/chat-rules-modal/chat-rules-modal.component";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, ChatRulesModalComponent],
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
  resultMessage: string = '';

  constructor(private toggle: ToggleService,
     private socketService: WebSocketService,
     private modalsService:ModalService
     ) {

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
    const result = this.checkBlockedWords(this.text);
    this.resultMessage = result.message;

    if (this.text != '' && result.isValid) {
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

  checkBlockedWords(input: string): { isValid: boolean; message: string } {
    const blockedWords: string[] = [
      ".COM", ".CO", "EXCH", "EXCHANGE", "DIAMOND",
      "KING", "LION", "BOOK", "MAHADEV","GMAIL","YAHOO","HOTMAIL",
      "SULTAN", "KHELLO", "BONUS", "KHAI LAGAI",
      "LAY BET", "SITE", "Turbo", "Cbtf"
    ];

    const normalizedInput = input.trim().replace(/\s+/g, "");

    console.log('normalizedInput',normalizedInput)


    const phoneRegex = /\b(?:\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?[\d\s.-]{7,10}\b/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*|www\.[^\s]+/;

    const foundWord = blockedWords.find(word =>
      normalizedInput.toLowerCase().includes(word.toLowerCase())
    );

    if (foundWord) {
      return {
        isValid: false,
        message: `Message not sent due to the use of blocked word: "${foundWord}".`
      };
    } else if (phoneRegex.test(normalizedInput)) {
      return {
        isValid: false,
        message: 'Message contains a phone number, which is not allowed.'
      };
    } else if (emailRegex.test(normalizedInput)) {
      return {
        isValid: false,
        message: 'Message contains an email address, which is not allowed.'
      };
    } else if (urlRegex.test(normalizedInput)) {
      return {
        isValid: false,
        message: 'Message contains a website URL, which is not allowed.'
      };
    } else {
      return {
        isValid: true,
        message: ""
      };
    }
  }
  openChatRulesModal(){
    let obj={
      show:true,
    }
    this.modalsService.setChatRulesModal(obj);
  }



}
