import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { ToggleService } from '../../services/toggle.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { BetCoinComponent } from '../../shared/bet-coin/bet-coin.component';

@Component({
  selector: 'app-live-roulette',
  standalone: true,
  imports: [CommonModule, ShortNumberPipe, BetCoinComponent],
  templateUrl: './live-roulette.component.html',
  styleUrl: './live-roulette.component.css',
})
export class LiveRouletteComponent {
  RoundWinner: any;

  coinAnimateState = false;
  animateCoinVal: any;
  btnCheck = 1;
  reverseAnimate: boolean = false;
  btnIcon = false;
  animate = false;
  selectedBetAmount: any;
  stackButtonArry: any = [];
  openCoinBarState = false;
  coinAnimateCheck = false;
  game: any;

  constructor(
    private toggleService: ToggleService,
    private indexedDb: IndexedDbService
  ) {}

  ngOnInit(): void {
    this.getStackData();
  }

  getStackData() {
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {
      if (res?.data?.stake) {
        this.stackButtonArry = res.data.stake;
        this.selectedBetAmount = this.stackButtonArry[0]?.stakeAmount;
      } else {
        this.stackButtonArry = STACK_VALUE;
        this.selectedBetAmount = STACK_VALUE[0]?.stakeAmount;
      }
    });
  }

  openBetCoin() {
    this.openCoinBarState = true;
  }

  closeBetCoin(event: any) {
    event.stopPropagation();
    setTimeout(() => {
      this.openCoinBarState = false;
    }, 500);
    this.coinAnimateCheck = true;
    setTimeout(() => {
      this.coinAnimateCheck = false;
    }, 500);

    let translateYRevers = ''; // Change `const` to `let`

    switch (this.btnCheck) {
      case 1:
        translateYRevers = '-40';
        break;
      case 2:
        translateYRevers = '-20px';
        break;
      case 3:
        translateYRevers = '-10px';
        break;
      case 4:
        translateYRevers = '10px';
        break;
      case 5:
        translateYRevers = '20px';
        break;
      case 6:
        translateYRevers = '40px';
        break;
    }

    document.documentElement.style.setProperty(
      '--translateY',
      translateYRevers
    );
  }

  animatecoinValue(value: any) {
    this.animateCoinVal = value;
    this.btnCheck = value;
    this.coinAnimateCheck = false;

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
  }

  getCoinValue(event: any) {
    this.selectedBetAmount = event;
  }
}
