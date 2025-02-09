import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { ToggleService } from '../../../services/toggle.service';
import { BetStakesComponent } from "../../../pages/bet-stakes/bet-stakes.component";

@Component({
  selector: 'app-quick-stakes-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, BetStakesComponent],
  templateUrl: './quick-stakes-edit.component.html',
  styleUrl: './quick-stakes-edit.component.css'
})
export class QuickStakesEditComponent implements OnInit{
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
  closeModal(){
    this.toggle.setQuickStakeEditSidebarState(false);
  }
  getMobSidebarState() {
    this.toggle.getQuickStakeEditSidebarState().subscribe((val: boolean) => {
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

}
