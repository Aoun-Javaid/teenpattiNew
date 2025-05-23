import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { ToggleService } from '../../services/toggle.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { BetCoinComponent } from '../../shared/bet-coin/bet-coin.component';
import { TopResultsComponent } from '../shared/top-results/top-results.component';
import { VideoPlayerComponent } from '../../shared/video-player/video-player.component';
import { RouletteResultsComponent } from '../../components/roulette-results/roulette-results.component';

@Component({
  selector: 'app-live-roulette',
  standalone: true,
  imports: [
    CommonModule,
    ShortNumberPipe,
    BetCoinComponent,
    TopResultsComponent,
    VideoPlayerComponent,
    RouletteResultsComponent,
  ],
  templateUrl: './live-roulette.component.html',
  styleUrl: './live-roulette.component.css',
})
export class LiveRouletteComponent {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef<HTMLDivElement>;
  RoundWinner: any;
  btnAnimation: any;
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
  screenWith: any;
  btnYValue: any = '-100vh + 650px';
  move_center_back_1: any = '168px';
  move_center_back_2: any = '112px';
  move_center_back_3: any = '56px';
  move_center_back_5: any = '-56px';
  move_center_back_6: any = '-112px';
  btnAnimationValue: any = '168px';
  game: any;
  resultMode: boolean = false;
  markTransform: boolean = false;

  constructor(
    private toggleService: ToggleService,
    private indexedDb: IndexedDbService
  ) {}

  ngOnInit(): void {
    this.getStackData();
    this.setAnimationsValues();
  }

  setAnimationsValues() {
    this.screenWith = window.innerWidth;
    if (this.screenWith >= 1024) {
      this.btnYValue = '-100vh + 1100px';
      this.move_center_back_1 = '322px';
      this.move_center_back_2 = '215px';
      this.move_center_back_3 = '109px';
      this.move_center_back_5 = '-106px';
      this.move_center_back_6 = '-213px';
      this.btnAnimationValue = '322px';
    } else if (this.screenWith >= 820 && this.screenWith < 1024) {
      this.btnYValue = '-100vh + 1000px';
      this.move_center_back_1 = '285px';
      this.move_center_back_2 = '190px';
      this.move_center_back_3 = '95px';
      this.move_center_back_5 = '-95px';
      this.move_center_back_6 = '-190px';
      this.btnAnimationValue = '285px';
    } else if (this.screenWith >= 768 && this.screenWith < 820) {
      this.btnYValue = '-100vh + 880px';
      this.move_center_back_1 = '249px';
      this.move_center_back_2 = '166px';
      this.move_center_back_3 = '83px';
      this.move_center_back_5 = '-83px';
      this.move_center_back_6 = '-166px';
      this.btnAnimationValue = '249px';
    } else if (this.screenWith >= 430 && this.screenWith > 414) {
      this.btnYValue = '-100vh + 730px';
      this.move_center_back_1 = '195px';
      this.move_center_back_2 = '129px';
      this.move_center_back_3 = '65px';
      this.move_center_back_5 = '-65px';
      this.move_center_back_6 = '-129px';
      this.btnAnimationValue = '195px';
    } else if (this.screenWith >= 414 && this.screenWith < 430) {
      this.btnYValue = '-100vh + 700px';
      this.move_center_back_1 = '186px';
      this.move_center_back_2 = '124px';
      this.move_center_back_3 = '62px';
      this.move_center_back_5 = '-62x';
      this.move_center_back_6 = '-124px';
      this.btnAnimationValue = '186px';
    }

    document.documentElement.style.setProperty('--btnYValue', this.btnYValue);
    document.documentElement.style.setProperty(
      '--btnMatchValue',
      this.btnAnimationValue
    );

    document.documentElement.style.setProperty(
      '--coin-1',
      this.move_center_back_1
    );
    document.documentElement.style.setProperty(
      '--coin-2',
      this.move_center_back_2
    );
    document.documentElement.style.setProperty(
      '--coin-3',
      this.move_center_back_3
    );
    document.documentElement.style.setProperty(
      '--coin-5',
      this.move_center_back_5
    );
    document.documentElement.style.setProperty(
      '--coin-6',
      this.move_center_back_6
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.setAnimationsValues();
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
    this.btnAnimation = true;
  }

  closeBetCoin(event: any) {
    event.stopPropagation();
    setTimeout(() => {
      this.openCoinBarState = false;
    }, 300);
    this.coinAnimateCheck = true;
    setTimeout(() => {
      this.coinAnimateCheck = false;
    }, 300);

    this.btnAnimation = false;

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

  toggleResultMode() {
    this.resultMode = !this.resultMode;
  }

  counter = signal(9);
  animationClass = signal('');

  increment() {
    if (this.counter() < 9) {
      this.animationClass.set('slide-right');
      this.counter.set(this.counter() + 1);
      this.resetAnimation();
    }
  }

  decrement() {
    if (this.counter() > 0) {
      this.animationClass.set('slide-left');
      this.counter.set(this.counter() - 1);
      this.resetAnimation();
    }
  }

  private resetAnimation() {
    setTimeout(() => this.animationClass.set(''), 300);
  }

  scaleMarket() {
    this.markTransform = !this.markTransform;
    const width = window.innerWidth;
    if (this.tableWrapper) {
      if (width <= 360 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.67)';
      } else if (width > 360 && width <= 375 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.52)';
      } else if (width > 375 && width <= 390 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.84)';
      } else if (width > 390 && width <= 393 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.92)';
      } else if (width > 393 && width <= 414 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.95)';
      } else if (width > 414 && width <= 539 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.98)';
      } else if (width > 540 && width <= 673 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(1)';
      } else if (width > 673 && width <= 768 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.8)';
      } else if (width > 768 && width <= 820 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(1)';
      } else if (width > 820 && width <= 912 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(1.14)';
      } else if (width > 912 && width <= 1152 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(1.12)';
      } else if (width > 1152 && width <= 1280 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(1.3)';
      } else if (width >= 540 && width <= 550 && this.markTransform) {
        this.tableWrapper.nativeElement.style.transform = 'scale(0.66)';
      } else {
        this.tableWrapper.nativeElement.style.transform = '';
      }
      console.log(this.markTransform, 'Transform applied!');
    }
  }
}
