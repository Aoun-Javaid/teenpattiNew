import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { ChatComponent } from "../chat/chat.component";
@Component({
  selector: 'app-mob-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  templateUrl: './mob-sidebar.component.html',
  styleUrl: './mob-sidebar.component.css',
  animations: [
    trigger('toggleHeight', [
      state(
        'collapsed',
        style({
          height: '0px',
          overflow: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          overflow: 'hidden',
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class MobSidebarComponent implements OnInit {
  mobSidebarState: boolean = false;
  hideSideBar: boolean = false;
  selectedLanguage: string = 'English';
  selectedOption: string = 'xyz';
  viewType = 'Profile';
  timeoutId: any;
  toggleCoolDown: boolean = false;
  languageSelectionState: boolean = false;
  optionSelectionState: boolean = false;
  universeOriginalState: boolean = false;
  constructor(private toggle: ToggleService,private router:Router) {}

  ngOnInit(): void {
    this.hideSideBar = true;
    this.getViewType();
    this.getMobSidebarState();
  }

  toggleUniverseOriginalMenu() {
    this.universeOriginalState = !this.universeOriginalState;
  }

  toggleLanguageMenu() {
    this.languageSelectionState = !this.languageSelectionState;
  }

  toggleOptionMenu() {
    this.optionSelectionState = !this.optionSelectionState;
  }

  getViewType() {
    this.toggle.getMobSideBarContent().subscribe((val: string) => {
      this.viewType = val;
    });
  }
  getMobSidebarState() {
    this.toggle.getMobileSideBarState().subscribe((val: boolean) => {
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
  // getMobSidebarState() {
  //   this.toggle.getMobileSideBarState().subscribe((val: boolean) => {
  //     if (this.toggleCoolDown) return;

  //     this.toggleCoolDown = true;
  //     this.mobSidebarState = val;

  //     if (this.timeoutId) {
  //       clearTimeout(this.timeoutId);
  //     }

  //     if (!this.mobSidebarState) {
  //       this.timeoutId = setTimeout(() => {
  //         this.hideSideBar = true;
  //       }, 700);
  //     } else {
  //       this.hideSideBar = false;
  //     }

  //     setTimeout(() => {
  //       this.toggleCoolDown = false;
  //     }, 710);
  //   });
  // }
  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
  }
  onOptionChange(option: string) {
    this.selectedOption = option;
  }
  gameList = [
    {
      img: '',
      name: 'Slots',
    },
    {
      img: '',
      name: 'Live Casino',
    },
    {
      img: '',
      name: 'Black Jack',
    },
    {
      img: '',
      name: 'Baccarat',
    },
    {
      img: '',
      name: 'Teen Patti',
    },
    {
      img: '',
      name: 'Teen Patti',
    },
    {
      img: '',
      name: 'Teen Patti',
    },
    {
      img: '',
      name: 'Teen Patti',
    },
  ];

  profileList = [
    {
      img: '/images/myBets.svg',
      name: 'My Bets',
    },
    {
      img: '/images/profitLoss.svg',
      name: 'Profit Loss',
    },
    {
      img: '/images/stakeEdit.svg',
      name: 'Stake Edit',
    },
    {
      img: '/images/gameRates.svg',
      name: 'Game Rates',
    },
    {
      img: '/images/rules.svg',
      name: 'Rules',
    },
    {
      img: '/images/blog.svg',
      name: 'Blog',
    },
    {
      img: '/images/gameAdvice.svg',
      name: 'Game Advice',
    },
  ];

  languages = [
    { label: 'English', value: 'English' },
    { label: 'Español', value: 'Espanol' },
    { label: 'Hindi', value: 'Hindi' },
  ];
  navigateTo(item:any){
    if(item.name=='Stake Edit'){
      this.router.navigateByUrl('/stakes');
      this.toggle.setMobSideBarState(false);
    }
  }
}
