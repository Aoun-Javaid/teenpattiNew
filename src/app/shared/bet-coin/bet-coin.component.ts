import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
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
  coinAnimationBg = false
  coinAnimateState = false;
  overflowRemove: boolean = false
  animateCoinVal: any
  btnCheck = 1
  downCoinAnimationValue: string = '10px'
  coinParentBtn = false
  reverseAnimate: boolean = false
  btnIcon = false
  animate = false;
  screenWith: any
  localCoinValue: any
  selectedBetAmount: any
  stackButtonArry: any = [];
  @Output() eventBetValue = new EventEmitter<string>();
  @Input() status: any;
  constructor(private toggleService: ToggleService, private indexedDb: IndexedDbService) { }


  openQuickStakes() {
    this.toggleService.setQuickStakeEditSidebarState(true)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.screenWith = window.innerWidth

    if (this.screenWith >= 1024) {
      this.downCoinAnimationValue = '55px'
    }
    if (this.screenWith >= 820 && this.screenWith < 1024) {
      this.downCoinAnimationValue = '30px'
    }
    else {
      this.downCoinAnimationValue = '10px'
    }

    document.documentElement.style.setProperty('--downValue', this.downCoinAnimationValue);
  }


  ngOnInit(): void {
    this.getStackData();
    this.toggleService.getStakeChanged().subscribe((res: any) => {
      if (res) {
        // console.log('socins')
        this.getStackData();
        this.toggleService.setStakeChanged(false);
      }
    })
    this.localCoinValue = localStorage.setItem('coinIndex', '')
    this.screenWith = window.innerWidth

    if (this.screenWith >= 1024) {
      this.downCoinAnimationValue = '55px'
    }
    if (this.screenWith >= 820 && this.screenWith < 1024) {
      this.downCoinAnimationValue = '30px'
    }
    else {
      this.downCoinAnimationValue = '10px'
    }

    document.documentElement.style.setProperty('--downValue', this.downCoinAnimationValue);
  }


  animatecoinValue(value: any) {
    this.animateCoinVal = value
    this.btnCheck = value
    this.localCoinValue = localStorage.setItem('coinIndex', this.animateCoinVal.toString())
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
      this.eventBetValue.emit(this.selectedBetAmount);
    })
  }


  showAnimateCoinBar() {


    this.coinAnimationBg = !this.coinAnimationBg;

    if (!this.coinAnimateState) {
      this.coinAnimateState = true;
      this.overflowRemove = true
      this.reverseAnimate = true;

      if (this.animateCoinVal) {
        this.animate = true;
      }

      setTimeout(() => {
        this.reverseAnimate = false;
      }, 400);

    } else {
      this.coinParentBtn = true;
      this.animate = true;

      setTimeout(() => {
        this.animate = false;
        this.animateCoinVal = null;
        this.btnIcon = true;
        this.coinAnimateState = false;
        this.coinParentBtn = false;
        this.overflowRemove = false
        this.overflowRemove = false
      }, 400);
    }

    this.btnIcon = false;

    let translateX = '212px';
    if (this.screenWith > 390) {

      switch (this.btnCheck) {
        case 1:
          translateX = '212px';
          break;
        case 2:
          translateX = '148px';
          break;
        case 3:
          translateX = '83px';
          break;
        case 4:
          translateX = '17px';
          break;
        case 5:
          translateX = '-47.2px';
          break;
        case 6:
          translateX = '-112px';
          break;
      }
    } if (this.screenWith <= 390 && this.screenWith > 375) {
      switch (this.btnCheck) {
        case 1:
          translateX = '195px';
          break;
        case 2:
          translateX = '137px';
          break;
        case 3:
          translateX = '77px';
          break;
        case 4:
          translateX = '17px';
          break;
        case 5:
          translateX = '-40.2px';
          break;
        case 6:
          translateX = '-100px';
          break;
      }
    } if (this.screenWith <= 375) {
      switch (this.btnCheck) {
        case 1:
          translateX = '185px';
          break;
        case 2:
          translateX = '132px';
          break;
        case 3:
          translateX = '74px';
          break;
        case 4:
          translateX = '17px';
          break;
        case 5:
          translateX = '-37.2px';
          break;
        case 6:
          translateX = '-95px';
          break;
      }
    }
    if (this.screenWith >= 820 && this.screenWith < 1024) {
      switch (this.btnCheck) {
        case 1:
          translateX = '305px';
          break;
        case 2:
          translateX = '207px';
          break;
        case 3:
          translateX = '116px';
          break;
        case 4:
          translateX = '17px';
          break;
        case 5:
          translateX = '-72.2px';
          break;
        case 6:
          translateX = '-175px';
          break;
      }
    }

    if (this.screenWith >= 1024 && this.screenWith < 1280) {
      switch (this.btnCheck) {
        case 1:
          translateX = '337px';
          break;
        case 2:
          translateX = '233px';
          break;
        case 3:
          translateX = '127px';
          break;
        case 4:
          translateX = '17px';
          break;
        case 5:
          translateX = '-85.2px';
          break;
        case 6:
          translateX = '-195px';
          break;
      }
    }

    document.documentElement.style.setProperty('--translateX', translateX);

    let translateXRevers = '212px';
    if (this.screenWith >= 820 && this.screenWith < 1280) {
      switch (this.btnCheck) {
        case 1:
          translateXRevers = '310px';
          break;
        case 2:
          translateXRevers = '210px';
          break;
        case 3:
          translateXRevers = '120px';
          break;
        case 4:
          translateXRevers = '17px';
          break;
        case 5:
          translateXRevers = '-75.2px';
          break;
        case 6:
          translateXRevers = '-180px';
          break;
      }
    }
    else {
      switch (this.btnCheck) {
        case 1:
          translateXRevers = '212px';
          break;
        case 2:
          translateXRevers = '148px';
          break;
        case 3:
          translateXRevers = '83px';
          break;
        case 4:
          translateXRevers = '17px';
          break;
        case 5:
          translateXRevers = '-47.2px';
          break;
        case 6:
          translateXRevers = '-112px';
          break;
      }
    }


    document.documentElement.style.setProperty('--translateXReverse', translateXRevers);

    switch (this.btnCheck) {
      case 1:
        this.selectedBetAmount = this.stackButtonArry[0].stakeAmount;
        break;
      case 2:
        this.selectedBetAmount = this.stackButtonArry[1].stakeAmount;
        break;
      case 3:
        this.selectedBetAmount = this.stackButtonArry[2].stakeAmount;
        break;
      case 4:
        this.selectedBetAmount = this.stackButtonArry[3].stakeAmount;
        break;
      case 5:
        this.selectedBetAmount = this.stackButtonArry[4].stakeAmount;
        break;
      case 6:
        this.selectedBetAmount = this.stackButtonArry[5].stakeAmount;
        break;
      default:
        this.selectedBetAmount = this.stackButtonArry[5].stakeAmount;
        break;
    }
    this.eventBetValue.emit(this.selectedBetAmount);
  }


}
