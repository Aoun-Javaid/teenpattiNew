import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { ToggleService } from '../../../services/toggle.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
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
    this.toggle.getProfileMobSidebarState().subscribe((val: boolean) => {
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
      img: '/images/transactions.svg',
      name: 'Transactions',
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
    if(item.name=='My Bets'){
      this.router.navigateByUrl('/mybets');
      this.toggle.setMobSideBarState(false);
    }
    if(item.name=='Transactions'){
      this.router.navigateByUrl('/transactions');
      this.toggle.setMobSideBarState(false);
    }
  }
}
