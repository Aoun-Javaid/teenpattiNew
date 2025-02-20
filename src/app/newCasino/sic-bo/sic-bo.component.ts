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

  openBetCoin(){
    this.openCoinBarState = true;
  }

  closeBetCoin(){
    this.openCoinBarState = false;
    console.log('openCoinBarState', this.openCoinBarState);
  }
}
