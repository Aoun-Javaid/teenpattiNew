import { Component, Input } from '@angular/core';
import { CONFIG, STACK_VALUE } from '../../../../../config';
import { IndexedDbService } from '../../../services/indexed-db.service';
import { ShortNumberPipe } from '../../../pipes/short-number.pipe';

@Component({
  selector: 'app-bets-chips',
  standalone: true,
  imports: [ShortNumberPipe],
  templateUrl: './bets-chips.component.html',
  styleUrl: './bets-chips.component.css'
})
export class BetsChipsComponent {
  betStakes: any;
  stakeIndex: any = 1;
  stackButtonArry:any
  selectedBetAmount:any
  constructor(private indexedDb: IndexedDbService) {

  }
  ngOnInit(): void {

  }
  @Input() BetPlaced: any = {};
  @Input() marketId: any;
  @Input() runnerId: any;

  absValue(x: any) {
    return Math.abs(x)
  }
  ngOnChanges() {
    // Check if the current value is different from the previous value using deep comparison
    this.getStakes(this.BetPlaced[this.marketId][this.runnerId]);

  }
  CalculateIndex() {
    // console.log('calculating index')
    this.getStakes(this.BetPlaced[this.marketId][this.runnerId]);
  }
  getStakes(stake: any) {

    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {
      if (res?.data && res?.data !== null) {
        this.betStakes = res?.data?.stake;
        this.findStakeIndex(stake)
        // console.warn("stake Index",this.stakeIndex)
      }
    })
  }
  findStakeIndex(stake: any) {
    for (let i = 0; i < this.betStakes.length; i++) {
      if (this.betStakes[i].stakeAmount >= stake) {
        this.stakeIndex = i + 1;
        return
      }
    }
    this.stakeIndex = 1;
    return

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
      })
    }
}
