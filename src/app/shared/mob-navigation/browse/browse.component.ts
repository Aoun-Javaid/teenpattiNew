import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ToggleService } from '../../../services/toggle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
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
export class BrowseComponent implements OnInit{
  mobSidebarState: boolean = false;
  hideSideBar: boolean = false;
  selectedLanguage: string = 'English';
  selectedOption: string = 'xyz';
  viewType = 'Profile';
  timeoutId: any;
  profileState = false
  chatState = false
  toggleCoolDown: boolean = false;
  languageSelectionState: boolean = false;
  optionSelectionState: boolean = false;
  universeOriginalState: boolean = false;
  constructor(private toggle: ToggleService,private router:Router) {}

  ngOnInit(): void {
    this.hideSideBar = true;
    this.getMobSidebarState();
    this.toggle.getProfileMobSidebarState().subscribe((val: boolean) => {
      this.profileState = val
    });
    this.toggle.getChatMobSidebarState().subscribe((val: boolean) => {
      this.chatState = val
    })
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

  getMobSidebarState() {
    this.toggle.getBrowseMobSidebarState().subscribe((val: boolean) => {
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

  languages = [
    { label: 'English', value: 'English' },
    { label: 'Español', value: 'Espanol' },
    { label: 'Hindi', value: 'Hindi' },
  ];

}
