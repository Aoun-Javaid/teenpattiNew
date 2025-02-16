import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { ToggleService } from '../../services/toggle.service';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { IndexedDbService } from '../../services/indexed-db.service';

@Component({
  selector: 'app-bet-coin',
  standalone: true,
  imports: [CommonModule, ShortNumberPipe],
  templateUrl: './bet-coin.component.html',
  styleUrl: './bet-coin.component.css'
})
export class BetCoinComponent implements OnInit {
  coinAnimateState = false;
  animateCoinVal: any
  btnCheck = 1
  reverseAnimate: boolean = false
  btnIcon = false
  animate = false
  selectedBetAmount: any
  stackButtonArry: any = []


  constructor(private toggleService:ToggleService,  private indexedDb: IndexedDbService){}

  openQuickStakes() {
    this.toggleService.setQuickStakeEditSidebarState(true)
  }


  animatecoinValue(value: any) {
    this.animateCoinVal = value
    this.btnCheck = value

  }

  ngOnInit(): void {
    this.getStackData()
  }

   getStackData() {
      const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
      this.indexedDb.getRecord(path).subscribe((res: any) => {
        if (res?.data?.stake) {
          this.stackButtonArry = res.data.stake;
          this.selectedBetAmount = this.stackButtonArry[0].stakeAmount
        } else {
          this.stackButtonArry = STACK_VALUE;
          this.selectedBetAmount = STACK_VALUE[0].stakeAmount
        }
        // console.log('default value', this.selectedBetAmount);
  
        // console.log('stakc', this.stackButtonArry);
      })
    }


  showAnimateCoinBar() {
    setTimeout(() => {
      this.reverseAnimate = false
    }, 500);
    this.btnIcon = false
    if (!this.coinAnimateState) {
      this.coinAnimateState = true;
      this.reverseAnimate = true
      if (this.animateCoinVal) {
        this.animate = true;

      }
    } else {
      if (this.coinAnimateState) {
        this.animate = true;
      }
      setTimeout(() => {
        this.animate = false
        this.animateCoinVal = null;
        this.btnIcon = true
        this.coinAnimateState = false;
      }, 500);
    }

    let translateX = '187px';
    switch (this.animateCoinVal) {
      case 1:
        translateX = '187px';
        break;
      case 2:
        translateX = '130px';
        break;
      case 3:
        translateX = '70px';
        break;
      case 4:
        translateX = '17px';
        break;
      case 5:
        translateX = '-40.2px';
        break;
      case 6:
        translateX = '-97.8px';
        break;
    }
    document.documentElement.style.setProperty('--translateX', translateX);


    let translateXRevers = '187px';
    switch (this.btnCheck) {
      case 1:
        translateXRevers = '187px';
        break;
      case 2:
        translateXRevers = '130px';
        break;
      case 3:
        translateXRevers = '70px';
        break;
      case 4:
        translateXRevers = '17px';
        break;
      case 5:
        translateXRevers = '-40.2px';
        break;
      case 6:
        translateXRevers = '-97.8px';
        break;
    }
    document.documentElement.style.setProperty('--translateXReverse', translateXRevers);
    switch (this.btnCheck) {
      case 1:
        this.selectedBetAmount = this.stackButtonArry[0].stakeAmount
        break;
      case 2:
        this.selectedBetAmount = this.stackButtonArry[1].stakeAmount
        break;
      case 3:
        this.selectedBetAmount = this.stackButtonArry[2].stakeAmount
        break;
      case 4:
        this.selectedBetAmount = this.stackButtonArry[3].stakeAmount
        break;
      case 5:
        this.selectedBetAmount = this.stackButtonArry[4].stakeAmount
        break;
      case 6:
        this.selectedBetAmount = this.stackButtonArry[5].stakeAmount
        break;
      default:
        this.selectedBetAmount = this.stackButtonArry[5].stakeAmount
        break
    }
    // console.log('onclick', this.selectedBetAmount);
  }
}
