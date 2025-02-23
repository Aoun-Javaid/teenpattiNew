import { Component } from '@angular/core';
import { VideoPlayerComponent } from "../../shared/video-player/video-player.component";
import { TopResultsComponent } from '../shared/top-results/top-results.component';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { ToggleService } from '../../services/toggle.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sic-bo',
  standalone: true,
  imports: [VideoPlayerComponent, TopResultsComponent, ShortNumberPipe, CommonModule],
  templateUrl: './sic-bo.component.html',
  styleUrl: './sic-bo.component.css'
})
export class SicBoComponent {
  RoundWinner: any;

  coinAnimateState = false;
  animateCoinVal: any
  btnCheck = 1
  reverseAnimate: boolean = false
  btnIcon = false
  animate = false
  selectedBetAmount: any
  stackButtonArry: any = [];
  openCoinBarState = false;
  coinAnimateCheck = false


  constructor(private toggleService: ToggleService, private indexedDb: IndexedDbService) { }

  ngOnInit(): void {
    this.getStackData();
  }

  getStackData() {
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {
      if (res?.data?.stake) {
        this.stackButtonArry = res.data.stake;
        this.selectedBetAmount = this.stackButtonArry[0]?.stakeAmount
      } else {
        this.stackButtonArry = STACK_VALUE;
        this.selectedBetAmount = STACK_VALUE[0]?.stakeAmount
      }
    })
  }

  openBetCoin() {
    this.openCoinBarState = true;
  }

  closeBetCoin(event: any) {
    event.stopPropagation();
    setTimeout(() => {
      this.openCoinBarState = false;
    }, 500);
    this.coinAnimateCheck = true
    setTimeout(() => {
      this.coinAnimateCheck = false
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

    document.documentElement.style.setProperty('--translateY', translateYRevers);
  }


  animatecoinValue(value: any) {
    this.animateCoinVal = value
    this.btnCheck = value;
    this.coinAnimateCheck = false;


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
  }


  


}
