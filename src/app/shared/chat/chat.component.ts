import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleService } from '../../services/toggle.service';
import { WebSocketService } from '../../services/web-socket.service';
import { v4 as uuidv4 } from 'uuid';
import { ChatRulesModalComponent } from '../../Modals/chat-rules-modal/chat-rules-modal.component';
import { ModalService } from '../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, ChatRulesModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  text: any;
  casinoChat: any = [];
  itemImg = '/languages/english.svg'
  connectedUsers: any;
  itemTitle = 'English';
  token: any;
  mobSidebarState: boolean = false;
  hideSideBar: boolean = false;
  selectedLanguage: string = 'English';
  selectedOption: string = 'xyz';
  viewType = 'Profile';
  profileState = false
  browser = false
  timeoutId: any;
  resultMessage: string = '';
  isMobileInfo: any;
  langList: boolean = false;
  selectedIndex: number | null = null;

  languages = [
    { title: 'English', img: '/languages/english.svg' },
    { title: 'Sports', img: '/languages/sport.svg' },
    { title: 'Cricket', img: '/languages/cricket.svg' },
    { title: 'Casino', img: '/languages/casino.png' },
    { title: 'India', img: '/languages/india.svg' },
    { title: 'Pakistan', img: '/languages/pakistan.svg' },
    { title: 'Nepal', img: '/languages/nepal.svg' },
    { title: 'Bangladesh', img: '/languages/bangladash427321838.svg' },
    { title: 'Sri Lanka', img: '/languages/srilanka.svg' },
  ];

  constructor(
    private toggle: ToggleService,
    private socketService: WebSocketService,
    private modalsService: ModalService,
    private toaster: ToastrService,
    private deviceService: DeviceDetectorService
  ) {}
  ngOnInit(): void {
    this.isMobileInfo = this.deviceService.os;
    this.hideSideBar = true;
    this.getMobSidebarState();
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = uuidv4();
    }
    this.socketService.connect(this.token);

    this.socketService.onEvent('loadConnectedClients', (data) => {
      // console.log('Received loadConnectedClients:', data);
      this.connectedUsers = data;
    });

    this.socketService.onEvent('loadNewMessage', (data) => {
      this.updateIncomingMessage(data);
      // console.log('Received message event:', data);
    });

    this.toggle.getProfileMobSidebarState().subscribe((val: boolean) => {
      this.profileState = val
    });

    this.toggle.getBrowseMobSidebarState().subscribe((val: boolean) => {
      this.browser = val
    })
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

        setTimeout(() => {
          const className = document.querySelector('.decrease-index') as HTMLElement;
          className.classList.add('!z-[99]')
        }, 700);
      }
      if (!val) {
        this.mobSidebarState = val;

        this.timeoutId = setTimeout(() => {
          this.hideSideBar = true;
        }, 700);
        setTimeout(() => {
          const className = document.querySelector('.decrease-index') as HTMLElement;
          className.classList.remove('!z-[99]')
        }, 700);
      } else {
        this.hideSideBar = false;
      }
    });
  }
  closeMobSideBar() {
    this.toggle.setChatMobSidebarState(false);
    this.toggle.setMobileNavState(null)
  }
  sendMessage() {
    const result = this.checkBlockedWords(this.text);
    this.resultMessage = result.message;
    if (this.resultMessage != '') {
      this.toaster.error(this.resultMessage);
    }
    if (this.text != '' && result.isValid) {
      this.socketService.sendMessage('newMessage', { content: this.text });
      this.text = '';
    }
  }
  updateIncomingMessage(data: any) {
    this.casinoChat.push(data);
    this.scrollChat();
  }
  scrollChat() {
    setTimeout(() => {
      const parent = document.querySelector('.messages');
      const lastChild = parent?.lastElementChild;

      if (lastChild) {
        lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    }, 200);
  }

  ChatFocusScroll() {
    if (this.isMobileInfo == 'iOS') {
    } else {
      this.scrollChat();
    }
  }
  checkBlockedWords(input: string): { isValid: boolean; message: string } {
    const blockedWords: string[] = [
      '.COM',
      '.CO',
      'EXCH',
      'EXCHANGE',
      'DIAMOND',
      'KING',
      'LION',
      'BOOK',
      'MAHADEV',
      'GMAIL',
      'YAHOO',
      'HOTMAIL',
      'SULTAN',
      'KHELLO',
      'BONUS',
      'KHAI LAGAI',
      'LAY BET',
      'SITE',
      'Turbo',
      'Cbtf',
    ];

    const normalizedInput = input.trim().replace(/\s+/g, '');

    // console.log('normalizedInput',normalizedInput)

    const phoneRegex =
      /\b(?:\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?[\d\s.-]{7,10}\b/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*|www\.[^\s]+/;

    const foundWord = blockedWords.find((word) =>
      normalizedInput.toLowerCase().includes(word.toLowerCase())
    );

    if (foundWord) {
      return {
        isValid: false,
        message: `Message not sent due to the use of blocked word: "${foundWord}".`,
      };
    } else if (phoneRegex.test(normalizedInput)) {
      return {
        isValid: false,
        message: 'Message contains a phone number, which is not allowed.',
      };
    } else if (emailRegex.test(normalizedInput)) {
      return {
        isValid: false,
        message: 'Message contains an email address, which is not allowed.',
      };
    } else if (urlRegex.test(normalizedInput)) {
      return {
        isValid: false,
        message: 'Message contains a website URL, which is not allowed.',
      };
    } else {
      return {
        isValid: true,
        message: '',
      };
    }
  }
  openChatRulesModal() {
    let obj = {
      show: true,
    };
    this.modalsService.setChatRulesModal(obj);
  }

  toggleLang() {
    this.langList = !this.langList;
  }

  setActive(index: number, title: any, itemImg:any) {
    this.itemImg = itemImg
    this.itemTitle = title;
    this.selectedIndex = index;
    this.langList = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.langList = true;
    }
  }
}
