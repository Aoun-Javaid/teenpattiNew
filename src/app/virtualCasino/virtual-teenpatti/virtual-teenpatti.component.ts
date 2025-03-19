import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { first, retry, RetryConfig, Subscription } from 'rxjs';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { CasinoSocketService } from '../../services/casino-socket.service';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { NetworkService } from '../../services/network.service';
import { VideoPlayerComponent } from '../../shared/video-player/video-player.component';
import { QuickStakesEditComponent } from '../../shared/mob-navigation/quick-stakes-edit/quick-stakes-edit.component';
import { ToggleService } from '../../services/toggle.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { ToastrService } from 'ngx-toastr';
import { BetCoinComponent } from '../../shared/bet-coin/bet-coin.component';
import { TopResultsComponent } from '../../newCasino/shared/top-results/top-results.component';
import { BetsChipsComponent } from '../../newCasino/shared/bets-chips/bets-chips.component';
import { TimerComponent } from '../shared/timer/timer.component';
import { ModalService } from '../../services/modal.service';

export let browserRefresh = false;
declare var $: any;
interface Card {
  img: HTMLImageElement;
  // Current drawing properties
  x: number;
  y: number;
  alpha: number;
  scale: number;
  // Starting and target positions for initial animation
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  // Animation phase/state:
  // 'initial' = animating into view,
  // 'displayed' = shown and static,
  // 'upDown' = performing up/down animation,
  // 'disappearing' = fading/moving out,
  // 'completed' = finished and should no longer be drawn.
  phase: 'initial' | 'displayed' | 'upDown' | 'disappearing' | 'completed';
  // For initial animation:
  animationStartTime: number;
  animationDuration: number;
  upDownCycles?: number;
  // For up/down animation:
  upDownStartTime?: number;
  upDownDuration?: number;
  upDownOffset?: number;
  originalY?: number;
  // For disappearing animation:
  disappearTargetX?: number;
  disappearTargetY?: number;
  disappearStartTime?: number;
  disappearDuration?: number;
}

@Component({
  selector: 'app-virtual-teenpatti',
  standalone: true,
  imports: [
    TopResultsComponent,
    ShortNumberPipe,
    CommonModule,
    QuickStakesEditComponent,
    BetCoinComponent,
    BetsChipsComponent,
    TimerComponent,
  ],
  templateUrl: './virtual-teenpatti.component.html',
  styleUrl: './virtual-teenpatti.component.css',
})
export class VirtualTeenpattiComponent implements OnInit, OnDestroy {
  @ViewChild(BetsChipsComponent) betsChipsComponent!: BetsChipsComponent;
  @ViewChild('playVideo') bgVideo!: ElementRef;
  coinAnimationBg = false;
  reverseAnimate: boolean = false;
  coinsState: boolean = false; // Coin bar is hidden by default
  coinStateActive: boolean = false;
  animateIcon: boolean = false;
  coinAnimateState = false;
  animationContainer: boolean = false;
  betState: boolean = false;
  selectedCoin: string = '/NteenPatti/Icons/green-coin.svg.svg';
  @ViewChild('dropdownContainer', { static: true })
  dropdownContainer!: ElementRef;
  @ViewChild(VideoPlayerComponent)
  videoComponent!: VideoPlayerComponent;
  subscription!: Subscription;
  liveData$: any;
  animateCoinVal: any;
  waitRound: any;
  animate = false;
  cards: any = {};
  public message = {
    type: '1',
    id: '',
  };
  selectedBetAmount: any;
  aPlayerChances: any;
  bPlayerChances: any;
  TPlayerChances: any;
  showHamburger: boolean = true;
  btnIcon = false;
  btnCheck = 1;
  BetPlaced: any = {};

  animationClass = '';

  newHeightPx!: string;
  openMobileMinMax: any = [];
  marketCollapsed: any = [];
  public messageResult = {
    type: '3',
    id: '',
  };
  isbetInProcess: boolean = false;

  retryConfig: RetryConfig = {
    count: 1000,
  };

  eventid: any;
  myVideo: any = null;
  placedbet = true;
  runnersName: any = {};
  casinoPl = [];
  marketArray: any;
  isBetsSlipOpened = '';
  rulesBox: any;
  selectedResult: any;
  betplaceObj: any;
  resultArray: any;
  totalMatchedBets: any;
  game: any;
  betSlip: string = 'game';
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  gameroundId: any;
  placeBetValue: any;
  private _roomId: any;
  pageReloading: boolean = false;
  isValueBetsSlip: any;
  marketId: any;
  betType: any;
  updateValue: any;
  counter: number = 0;
  changeValue: any;
  sizeRunner1: any;
  sizeRunner2: any;
  firstBoxWidth: string = '';
  secndBoxWidth: string = '';
  split_arr: any;
  getRoundId: any;
  resultcounter = 0;
  RoundWinner: any;
  betSelectedPlayer: any;
  isDesktop: boolean;
  currentUrl: any;
  isMobile: boolean;
  isMobileInfo: string;
  isShow: boolean = false;
  // isTeNteenPatti:any;
  stackButtonArry: any = STACK_VALUE;

  constructor(
    private route: ActivatedRoute,
    private networkService: NetworkService,
    private encyDecy: EncryptDecryptService,
    private toggleService: ToggleService,
    private deviceService: DeviceDetectorService,
    private indexedDb: IndexedDbService,
    private toaster: ToastrService,
    private socket: CasinoSocketService,
    private modalService: ModalService
  ) {
    // this.eventid = this.route.snapshot.params['id'];
    // this.eventid = '99.0018';
    // localStorage.setItem('eventId', this.eventid)
    // this.eventid = localStorage.getItem('eventId');
    this.eventid = '88.0011';
    this.message.id = this.eventid;
    this.messageResult.id = this.eventid;
    this.isDesktop = this.deviceService.isDesktop();
    this.isMobile = this.deviceService.isMobile();
    this.isMobileInfo = this.deviceService.os;

    // this.sendMsg();

    // this.router.events.subscribe((event: any) => {
    //   if (event?.routerEvent instanceof NavigationEnd) {
    //     this.currentUrl = event?.routerEvent?.url;
    //     this.isTeNteenPatti = this.currentUrl.includes('99.0011');
    //   }
    // });
  }

  ngOnInit(): void {
    this.subscription = this.modalService
      .getCasinoResulttModal()
      .subscribe((value: any) => {
        if (value.show) {
          this.selectedResult = value;
          this.isShow = value.show;
          console.log('selected result', this.selectedResult);
          console.log('isShow: ', this.isShow);
        }
      });

    this.networkService.getBetPlace().subscribe((betObj: any) => {
      // this.getAllMarketProfitLoss();
      this.isbetInProcess = false;
      if (betObj.betSuccess) {
        this.handleIncomingBetObject(betObj);
      }
    });

    this.getStackData();
    this.getWindowSize();

    if (!this.isDesktop) {
      this.setMarketScrollHeight();
      if (this.isMobileInfo !== 'iOS') {
        $('html').css('overflow', 'hidden');
      }
    }
    // if(this.game == undefined || this.game === null){
    this.resultcounter = 0;
    this.socket.connect();
    // this.sendMsg();

    this.encyDecy.generateEncryptionKey('', this.message);

    this.subscription = this.encyDecy
      .getMarketData()
      .pipe(retry(this.retryConfig))
      .subscribe((marketData: any) => {
        this.socket = marketData; // Update the receivedMessage variable with the received message

        if (marketData) {
          // this.getRoundId = localStorage.getItem('roundID')

          let objMarket = JSON.parse(marketData);
          // console.log('market data', objMarket)
          // let objMarket = marketData;
          if (this.eventid == '99.0046') {
            // console.log(objMarket)
          }

          //First time get responce in array
          if (Array.isArray(objMarket?.data)) {
            if (objMarket?.data[0]) {
              if (objMarket?.type == '1') {
                this.marketArray = objMarket?.data[0]?.marketArr;
                this.game = objMarket?.data[0];
                this.game.marketArr = this.marketArray
                  ? this.marketArray
                  : objMarket?.data[0]?.marketArr;
                this.sizeRunner1 =
                  this.marketArray[0].runners[0].price.back[0].size;
                this.sizeRunner2 =
                  this.marketArray[0].runners[1].price.back[0].size;
                this.winnerMarketArray = this.game?.marketArr
                  ? this.game?.marketArr[0]
                  : '';
                this.getRoundId = this.game.roundId;
                this.handleEventResponse(objMarket, 0);
              }
            }
          } else {
            this.handleEventResponse(objMarket, 0);
          }

          if (this.game) {
            this.winnerMarketArray = this.game?.marketArr
              ? this.game?.marketArr[0]
              : '';
            this.marketArray = this.game.marketArr;
            this.gameroundId = this.game.roundId;

            //  get result balance on round Id change
            // console.log('roundId',this.getRoundId)
            // console.log('game ',this.game.roundId)
            if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
              this.getRoundId = this.game.roundId;
              // localStorage.setItem('roundID', this.game.roundId);
              this.getBalance();
              this.casinoPl = [];
              this.getResults();
              this.BetPlaced = {};
              this.betSelectedPlayer = '';
              this.secndBoxWidth = '';
              this.firstBoxWidth = '';
              this.clearRound();
              this.cards = {};
            }

            if (this.game.status == 'SUSPEND') {
              this.isBetsSlipOpened = '';
              this.isValueBetsSlip = 0;
            }
            if (this.game.status == 'ONLINE') {
            }
            this.playerACards = this.game?.cardsArr?.PLAYER_A;
            this.playerBCards = this.game?.cardsArr?.PLAYER_B;

            if (this.playerACards) {
              if (this.playerACards.card_1 != 0 && !this.cards.card_11) {
                this.cards.card_11 = true;
                const targetX =
                  this.cardStartPointX - this.leftCard1EndPositionX;
                this.leftCard1 = this.createCard(
                  this.playerACards.card_1,
                  this.cardStartPointX,
                  this.cardStartPointY,
                  targetX,
                  this.cardEndPointY
                );
              }
              if (this.playerACards.card_2 != 0 && !this.cards.card_12) {
                this.cards.card_12 = true;
                const targetX =
                  this.cardStartPointX - this.leftCard2EndPositionX;
                this.leftCard2 = this.createCard(
                  this.playerACards.card_2,
                  this.cardStartPointX,
                  this.cardStartPointY,
                  targetX,
                  this.cardEndPointY
                );
              }
              if (this.playerACards.card_3 != 0 && !this.cards.card_13) {
                this.cards.card_13 = true;
                const targetX =
                  this.cardStartPointX - this.leftCard3EndPositionX;
                this.leftCard3 = this.createCard(
                  this.playerACards.card_3,
                  this.cardStartPointX,
                  this.cardStartPointY,
                  targetX,
                  this.cardEndPointY
                );
              }
              if (
                this.playerACards?.card_1 == 0 &&
                this.game.status == 'SUSPEND'
              ) {
                this.game.noMoreBets = true;
              } else {
                this.game.noMoreBets = false;
              }
            }
            if (this.playerBCards) {
              if (this.playerBCards.card_1 != 0 && !this.cards.card_21) {
                this.cards.card_21 = true;
                const targetX =
                  this.cardStartPointX + this.rightCard1EndPositionX;
                this.rightCard1 = this.createCard(
                  this.playerBCards.card_1,
                  this.cardStartPointX,
                  this.cardStartPointY,
                  targetX,
                  this.cardEndPointY
                );
              }
              if (this.playerBCards.card_2 != 0 && !this.cards.card_22) {
                this.cards.card_22 = true;
                const targetX =
                  this.cardStartPointX + this.rightCard2EndPositionX;
                this.rightCard2 = this.createCard(
                  this.playerBCards.card_2,
                  this.cardStartPointX,
                  this.cardStartPointY,
                  targetX,
                  this.cardEndPointY
                );
              }
              if (this.playerBCards.card_3 != 0 && !this.cards.card_23) {
                this.cards.card_23 = true;
                const targetX =
                  this.cardStartPointX + this.rightCard3EndPositionX;
                this.rightCard3 = this.createCard(
                  this.playerBCards.card_3,
                  this.cardStartPointX,
                  this.cardStartPointY,
                  targetX,
                  this.cardEndPointY
                );
              }
            }
            this.winnerMarketArray = this.game.marketArr
              ? this.game.marketArr[0]
              : '';
            this.runnersName = this.winnerMarketArray.runnersName;
          }

          this.networkService.updateRoundId(this.game);

          // Get result Array

          // if (objMarket.type == "3") {
          //   this.RoundWinner = null;
          //   //  Check user's bet player
          //   if (this.casinoPl && this.casinoPl[this.winnerMarketArray?.marketId]) {
          //     if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[0].selectionId] > 0) {
          //       this.betSelectedPlayer = this.winnerMarketArray.runners[0].selectionId
          //     }
          //     if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[1].selectionId] > 0) {
          //       this.betSelectedPlayer = this.winnerMarketArray.runners[1].selectionId
          //     }
          //   }

          //   if (this.resultcounter > 0) {
          //     this.RoundWinner = objMarket.data[0].winner;
          //     setTimeout(() => {
          //       this.RoundWinner = null;
          //     }, 5000)

          //     objMarket.data[0].results[0].runners.forEach((runner: any) => {
          //       if (runner.selectionId == this.betSelectedPlayer && runner.result == "WINNER") {

          //         setTimeout(() => {
          //           this.videoComponent.surpriseFireWork();
          //         }, 1000);
          //       }
          //     })

          //   }

          //   this.networkService.updateResultstream(objMarket.data)
          //   this.resultcounter++;
          // }
        }
      });

    this.getAllMarketProfitLoss();
    this.getResults();
    const canvasEl = this.canvas.nativeElement;
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.ctx = canvasEl.getContext('2d')!;

    // Set breakpoints (you can extend this logic as needed)
    this.setBreakPoints();

    // Preload images then start the render loop
    this.preloadImages().then(() => {
      this.render();
    });
  }

  getStackData() {
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {
      if (res?.data?.stake) {
        this.stackButtonArry = res.data.stake;
        this.selectedBetAmount = this.stackButtonArry[0].stakeAmount;
      } else {
        this.stackButtonArry = STACK_VALUE;
        this.selectedBetAmount = STACK_VALUE[0].stakeAmount;
      }
      // console.log('default value', this.selectedBetAmount);

      // console.log('stakc', this.stackButtonArry);
    });
  }
  openQuickStakes() {
    this.toggleService.setQuickStakeEditSidebarState(true);
  }
  handleIncomingBetObject(incomingObj: any) {
    const { marketId, selectionId, stake } = incomingObj;

    if (!this.BetPlaced[marketId]) {
      this.BetPlaced[marketId] = {};
    }
    if (this.BetPlaced[marketId][selectionId] !== undefined) {
      this.BetPlaced[marketId][selectionId] += stake;
    } else {
      this.BetPlaced[marketId][selectionId] = stake;
    }
    console.log('bet placed', this.BetPlaced);
    this.betsChipsComponent?.CalculateIndex();

    this.game.betAccepted = true;
    this.networkService.updateRoundId(this.game);
    setTimeout(() => {
      this.game.betAccepted = false;
      this.networkService.updateRoundId(this.game);
    }, 1500);
  }

  handleEventResponse(objMarket: any, index: any) {
    // console.log(objMarket,'<=============== objMarket with out index')
    if (Array.isArray(objMarket)) {
      objMarket.forEach((objMarketRes: any) => {
        // console.log('loop indesx', objMarketRes)
        // console.log(objMarketRes,'asal data',index,'objMarket?.data[0]===>')
        this.marketObhManager(objMarketRes);
        return;
      });
    } else {
      let objMarketRes = objMarket;
      this.marketObhManager(objMarketRes);
      return;
    }
  }

  marketObhManager(objMarket: any) {
    if (objMarket) {
      if (objMarket.type == '1') {
        if (
          'data' in objMarket &&
          this.counter == 0 &&
          objMarket.data.marketArr &&
          objMarket.data._id
        ) {
          this.marketArray = objMarket.data.marketArr;
          this.sizeRunner1 = this.marketArray[0].runners[0].price.back[0].size;
          this.sizeRunner2 = this.marketArray[0].runners[1].price.back[0].size;
          this.game = this.marketArray ? this.marketArray : objMarket.data;
          this.game = objMarket.data;
          this.counter = 1;
        } else {
          if ('roundId' in objMarket) {
            this.game.roundId = objMarket?.roundId;
          }
          if ('marketArr' in objMarket?.data) {
            if (Array.isArray(objMarket?.data?.marketArr)) {
              // this.marketArray = objMarket.updatedData.marketArr;
              this.game.marketArr = objMarket?.data?.marketArr;
            }
          }
          // for single market change

          if ('cardsArr' in objMarket?.data) {
            if (!Array.isArray(objMarket?.data?.cardsArr)) {
              this.game.cardsArr = objMarket?.data?.cardsArr;
              this.game.roundId = objMarket?.roundId;
            }
          }
          if ('roundId' in objMarket?.data) {
            this.game.roundId = objMarket?.data?.roundId;
          }
          if ('status' in objMarket?.data) {
            this.game.status = objMarket?.data?.status;
          }
          if ('leftSec' in objMarket?.data) {
            this.game.leftSec = objMarket?.data?.leftSec;
            // console.log('this',objMarket?.data?.leftSec)
          }
          if ('resultsArr' in objMarket?.data) {
            // if (objMarket?.data?.roundStatus == 'RESULT_DECLARED') {

            if (
              this.casinoPl &&
              this.casinoPl[this.winnerMarketArray?.marketId]
            ) {
              if (
                this.casinoPl[this.winnerMarketArray?.marketId][
                  this.winnerMarketArray.runners[0].selectionId
                ] > 0
              ) {
                this.betSelectedPlayer =
                  this.winnerMarketArray.runners[0].selectionId;
              }
              if (
                this.casinoPl[this.winnerMarketArray?.marketId][
                  this.winnerMarketArray.runners[1].selectionId
                ] > 0
              ) {
                this.betSelectedPlayer =
                  this.winnerMarketArray.runners[1].selectionId;
              }
            }
            // for video results
            for (let key in objMarket.data.resultsArr[0].runners) {
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                this.RoundWinner =
                  objMarket.data.resultsArr[0]?.runnersName[key];
                setTimeout(() => {
                  if (this.RoundWinner === 'PLAYER A') {
                    if (this.leftCard1) this.animateUpDown(this.leftCard1);
                    if (this.leftCard2) this.animateUpDown(this.leftCard2);
                    if (this.leftCard3) this.animateUpDown(this.leftCard3);
                  } else if (this.RoundWinner === 'PLAYER B') {
                    if (this.rightCard1) this.animateUpDown(this.rightCard1);
                    if (this.rightCard2) this.animateUpDown(this.rightCard2);
                    if (this.rightCard3) this.animateUpDown(this.rightCard3);
                  }
                }, 500);
                this.BetPlaced = [];
              }
              if (
                key == this.betSelectedPlayer &&
                objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER'
              ) {
                setTimeout(() => {
                  // console.log(this.RoundWinner,'fireworksd')
                  this.videoComponent.surpriseFireWork();
                }, 1000);
              }
            }
            setTimeout(() => {
              this.RoundWinner = null;
            }, 5000);
            // }
          }
          //One linner change from socket

          var key_str = Object.keys(objMarket?.data)[0];
          var key_str = Object.keys(objMarket?.data)[0];
          if (key_str.includes('.')) {
            this.split_arr = key_str.split('.');
            // console.log(this.split_arr);
            Object.entries(objMarket.data).forEach(
              ([, value]) => (this.changeValue = value)
            );

            let marketIndex = parseInt(this.split_arr[1]);
            let runnersIndex = this.split_arr[3];
            let backIndex = this.split_arr[6];

            // this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price  = this.changeValue;

            if (this.split_arr[7] == 'size') {
              if (runnersIndex == 0 && marketIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt1 = (this.changeValue / this.sizeRunner1) * 100;
                this.firstBoxWidth = -1 * (percnt1 - 100) + '';
                // console.log('player A', this.firstBoxWidth)
              }
              if (runnersIndex == 1 && marketIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = (this.changeValue / this.sizeRunner2) * 100;
                this.secndBoxWidth = -1 * (percnt - 100) + '';
                // console.log('player B', this.secndBoxWidth)
              }

              this.marketArray[marketIndex].runners[runnersIndex].price.back[
                backIndex
              ].size = this.changeValue;
            }
            if (this.split_arr[7] == 'price') {
              this.marketArray[marketIndex].runners[runnersIndex].price.back[
                backIndex
              ].price = this.changeValue;
            }
            if (this.split_arr[4] === 'status') {
              this.marketArray[marketIndex].runners[runnersIndex].status =
                this.changeValue;
            }
          }
        }
      }
    }
  }

  setMarketScrollHeight() {
    const marketScrollElement = document.getElementById('marketScroll');
    const windowHeight = window.innerHeight;
    // Adjust the percentage or calculation based on your specific needs.

    if (this.isMobile) {
      // document.body.style.overflowY = 'hidden';
    }
    let targetHeight;
    if (this.isMobileInfo == 'iOS') {
      //  targetHeight = Math.floor(windowHeight * 0.52); //done
      targetHeight = Math.floor(windowHeight * 0.62);
    } else {
      targetHeight = Math.floor(windowHeight * 0.63);
    }

    if (marketScrollElement) {
      marketScrollElement.style.height = `${targetHeight}px`;
      // marketScrollElement.style.marginTop = `${margintop}px`;
    }
  }

  openBetslip(
    marketId: any,
    selectionId: any,
    betType: any,
    price: any,
    min: any,
    max: any
  ) {
    if (this.game.status == 'SUSPEND') {
      this.waitRound = true;
      setTimeout(() => {
        this.waitRound = false;
      }, 1000);
    }

    if (this.game.status != 'SUSPEND' && !this.isbetInProcess) {
      if (this.selectedBetAmount > 0) {
        this.isBetsSlipOpened = selectionId;
        this.marketId = marketId;
        this.betType = betType;
        this.isValueBetsSlip = 0;

        this.betplaceObj = {
          marketId: marketId,
          selectionId: selectionId,
          betType: betType,
          price: price,
          eventId: this.eventid,
          roomId: this._roomId,
          minValue: min,
          maxValue: max,
          stake: this.selectedBetAmount,
        };

        // this.placeCasinoBet();
        this.isbetInProcess = true;
        this.networkService.placeBet(this.betplaceObj);
      } else {
        this.toaster.error('please select chips for Bet', '', {
          positionClass: 'toast-top-right',
        });
      }
    } else {
      return;
    }
  }

  placeCasinoBet() {
    this.isbetInProcess = true;

    let data = {
      marketId: this.betplaceObj.marketId,
      selectionId: this.betplaceObj.selectionId,
      stake: this.selectedBetAmount,
      eventId: this.betplaceObj.eventId,
      flag: this.betplaceObj.betType,
    };

    $('.btn-placebet').prop('disabled', true);
    let apiURL;

    apiURL = CONFIG.asianCasinoPlacebetURL;

    // if (this.item.roomId == 'eu') {
    //   apiURL = CONFIG.eUCasinoPlacebetURL;
    // } else {
    //   apiURL = CONFIG.asianCasinoPlacebetURL;
    // }

    this.networkService
      .getAllRecordsByPost(apiURL, data)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res , "betslip")
          if (res?.meta?.status == true) {
            //this.toastr.successToastr(data.meta.message);
            // $('.btn-placebet').prop('disabled', false);
            // this.afterPlaceBet();
            this.getBalance();
            this.getAllMarketProfitLoss();
            this.isbetInProcess = false;
            let placeBetObj = {
              profitlossCall: true,
              loader: false,
            };
            this.networkService.setBetPlace(placeBetObj);
            this.game.betAccepted = true;
            this.networkService.updateRoundId(this.game);
            setTimeout(() => {
              this.game.betAccepted = false;
              this.networkService.updateRoundId(this.game);
            }, 1500);
            this.handleIncomingBetObject(res.data);
          } else {
            // $('.btn-placebet').prop('disabled', false);
            // this.afterPlaceBet();
            if (res?.meta.status == false) {
              this.toaster.error(res.meta.message, '', {
                positionClass: 'toast-top-right',
              });
              // this.cancelBet();
            } else {
              this.toaster.error('Something went wrong please try again.', '', {
                positionClass: 'toast-top-right',
              });
            }
            this.isbetInProcess = false;
          }

          var pl = res.pl;
        },
        (error) => {
          //let statusError = error;
          $('.btn-placebet').prop('disabled', false);
          //this.afterPlaceBet();
          if (error?.error.meta.status == false) {
            this.toaster.error(error.error.meta.message, '', {
              positionClass: 'toast-top-right',
            });
            // this.cancelBet();
          } else {
            this.toaster.error('Something went wrong please try again.', '', {
              positionClass: 'toast-top-right',
            });
          }
          this.isbetInProcess = false;
        }
      );
  }
  callFunctionOnClickNearBottom(
    thresholdFromBottom: number,
    callback: () => void
  ) {
    window.addEventListener('click', (event) => {
      const viewportHeight = window.innerHeight;
      const clickY = event.clientY;

      if (viewportHeight - clickY <= thresholdFromBottom) {
        callback();
      }
    });
  }

  scrollToBetslip() {
    const element = document.getElementById('betslip');
    if (element) {
      // element.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      //   inline: "end"
      // });
      // this.centerScrollableDiv('betslip')

      const container = document.getElementById('marketScroll');
      const listItem = document.getElementById('betslip');
      if (container && listItem) {
        const containerRect = container.getBoundingClientRect();
        const listItemRect = listItem.getBoundingClientRect();

        const listItemTop = listItemRect.top - containerRect.top;
        const listItemBottom = listItemRect.bottom - containerRect.top;
        const containerHeight = containerRect.height;

        if (listItemTop < containerHeight / 3) {
          // ListItem is in the top third of the container
          // console.log('ListItem is at the top');
          container.scrollTo({
            behavior: 'smooth',
            top: container.scrollTop + listItemTop - containerHeight / 3, // Scroll to the top
          });
        } else if (listItemBottom > (2 * containerHeight) / 3) {
          // ListItem is in the bottom third of the container
          // console.log('ListItem is at the bottom');
          container.scrollTo({
            behavior: 'smooth',
            top:
              container.scrollTop + listItemBottom - (2 * containerHeight) / 3, // Scroll to the bottom
          });
        } else {
          // ListItem is in the middle third of the container
          // console.log('ListItem is in the middle');
          container.scrollTo({
            behavior: 'smooth',
            top:
              container.scrollTop +
              listItemTop -
              containerHeight / 2 +
              listItemRect.height / 2, // Scroll to the middle
          });
        }
      }
    }
  }

  // centerScrollableDiv(betslip: any) {
  //   const centeredDiv = document.getElementById(betslip);
  //   const container = document.getElementById('marketScroll');

  //   // if (centeredDiv && container) {
  //   //   const containerRect = container.getBoundingClientRect();
  //   //   const centeredDivRect = centeredDiv.getBoundingClientRect();
  //   //   console.log(centeredDivRect ,'center Div')
  //   //   console.log(centeredDivRect ,'containerRect')
  //   //   let centerY;
  //   //   if (centeredDivRect.top > 854) {
  //   //     centerY = centeredDivRect.top - containerRect.top + centeredDivRect.height / 2;

  //   //   }
  //   //   if (centeredDivRect.top < 816) {
  //   //     centerY = centeredDivRect.top - containerRect.top + centeredDivRect.height + 100;

  //   //   }
  //   //   else {
  //   //     centerY = centeredDivRect.top - containerRect.top + centeredDivRect.height / 1;

  //   //   }

  //   //   // Calculate the center position of the centeredDiv vertically within the container

  //   //   // Calculate the scroll position to center the div vertically
  //   //   const scrollTopValue = centerY - container.offsetHeight / 2;

  //   //   // Scroll the marketScroll container to the calculated position
  //   //   container.scrollTop = scrollTopValue;
  //   // }

  //   if (centeredDiv && container) {
  //     const containerRect = container.getBoundingClientRect();
  //     const centeredDivRect = centeredDiv.getBoundingClientRect();

  //     // Calculate the center position of the centeredDiv vertically within the container
  //     const centerY = centeredDivRect.top - containerRect.top + centeredDivRect.height / 2;

  //     // Check if the centeredDiv is at the bottom of the container
  //     const isAtBottom = centeredDivRect.bottom >= containerRect.bottom;

  //     // Adjust the centerY if the button is at the bottom
  //     const adjustedCenterY = isAtBottom
  //       ? centerY - container.offsetHeight / 2 + centeredDivRect.height / 2
  //       : centerY;

  //     // Calculate the scroll position to center the div vertically
  //     const scrollTopValue = adjustedCenterY - container.offsetHeight / 2;
  //     console.log(adjustedCenterY + 200, 'adjustedCenterY')

  //     console.log(scrollTopValue + 200, 'scroll')
  //     // Scroll the marketScroll container to the calculated position
  //     container.scrollTop = scrollTopValue + 200;
  //   }

  // }

  getResults() {
    this.networkService
      .getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.networkService.updateResultstream(data.data);
          let playerAWins = 0;
          let playerBWins = 0;
          // debugger
          data.data.forEach((round: any) => {
            if (round.winner === 'A') {
              playerAWins++;
            } else if (round.winner === 'B') {
              playerBWins++;
            }
          });
          this.aPlayerChances = (playerAWins / data?.data?.length) * 100;
          this.bPlayerChances = (playerBWins / data?.data?.length) * 100;
          this.TPlayerChances = 100 - this.aPlayerChances - this.bPlayerChances;
        },
        (error) => {
          let responseData = error;
        }
      );
  }

  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip;
  }

  sendMsg() {
    //  this.socketservice.sendMessage(this.message);
    this.socket.send(this.message);
    // this.casinoService.messages.next(this.message);
  }

  ProfitLossBalance() {
    this.getAllMarketProfitLoss();
    this.getBalance();
  }

  getAllMarketProfitLoss() {
    this.isValueBetsSlip = 0;
    this.networkService.getCasinoPLURL(this.eventid).subscribe((res: any) => {
      if (res.meta.status == true) {
        this.casinoPl = res.pl;
      }
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  getBalance() {
    this.networkService
      .getAllRecordsByPost(CONFIG.getUserBalanceURL, {})
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.meta.status == true) {
            let availBalance = (data.data.balance - data.data.exposure).toFixed(
              2
            );
            $('.userTotalBalance').text(availBalance);
            $('.userTotalExposure').text(data.data.exposure);
            let ex = data.data.exposure.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              symbol: '',
            });
            ex = ex.substring(1);
            $('.userTotalExposure').text(ex);
          }
        },
        (error) => {
          let responseData = error;
        }
      );
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    let message = {
      type: '2',
      id: '',
    };
    this.encyDecy.sendMessageToSocket(message);
    this.subscription.unsubscribe();
    $('html').css('overflow', 'auto');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const elements = document.querySelectorAll('.minMaxMobile');
    let clickedInside = false;

    elements.forEach((element: any) => {
      if (element) {
        if (element.contains(event.target)) {
          clickedInside = true;
        }
      }
    });

    if (!clickedInside) {
      this.openMobileMinMax = [];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    window.location.reload();
    this.getWindowSize();
  }

  getWindowSize() {
    const baseWidth = 352; // Base resolution width
    const scale = window.innerWidth / baseWidth;
    document.documentElement.style.setProperty(
      '--boardScale',
      scale.toString()
    );

    const baseHeight = 716; // Base resolution height
    const scaleY = window.innerHeight / baseWidth;
    document.documentElement.style.setProperty(
      '--boardScaleY',
      scaleY.toString()
    );
  }

  getCoinValue(event: any) {
    this.selectedBetAmount = event;
  }

  replaceHamburgerImage(coinSrc: string) {
    let timer = 0;
    if (this.animationContainer === true) {
      timer = 1000;
    } else {
      timer = 0;
    }
    setTimeout(() => {
      this.animationContainer = !this.animationContainer;
    }, timer);
    this.selectedCoin = coinSrc;
    this.betState = false;
    this.animateIcon = false;
    this.coinsState = false;
    setTimeout(() => {
      this.coinStateActive = false;
    }, 900);
  }

  toggleCoinState() {
    if (!this.coinStateActive) {
      this.coinStateActive = true;
      this.animateIcon = true;
      let timer = 0;
      if (this.animationContainer === true) {
        timer = 1000;
      } else {
        timer = 0;
      }
      setTimeout(() => {
        this.animationContainer = !this.animationContainer;
      }, timer);

      setTimeout(() => {
        this.selectedCoin = '/NteenPatti/Icons/Group 237787.svg';
        this.coinsState = true;
      }, 500);
    } else {
      this.selectedCoin = '/NteenPatti/Icons/green-coin.svg.svg';
      this.betState = false;
      this.coinsState = false;

      setTimeout(() => {
        this.animateIcon = false;
      }, 400);

      setTimeout(() => {
        this.coinStateActive = false;
      }, 1500);
    }
  }

  animatecoinValue(value: any) {
    this.animateCoinVal = value;
    this.btnCheck = value;
  }

  showAnimateCoinBar() {
    this.coinAnimationBg = !this.coinAnimationBg;

    setTimeout(() => {
      this.reverseAnimate = false;
    }, 500);
    this.btnIcon = false;
    if (!this.coinAnimateState) {
      this.coinAnimateState = true;
      this.reverseAnimate = true;
      if (this.animateCoinVal) {
        this.animate = true;
      }
    } else {
      if (this.coinAnimateState) {
        this.animate = true;
      }
      setTimeout(() => {
        this.animate = false;
        this.animateCoinVal = null;
        this.btnIcon = true;
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
    document.documentElement.style.setProperty(
      '--translateXReverse',
      translateXRevers
    );
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
    // console.log('onclick', this.selectedBetAmount);
  }

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;

  // Canvas dimensions
  width = window.innerWidth;
  height = window.innerHeight;

  // Game parameters (simplified; adjust as needed)
  cardSize = 15;
  hiddenCardSize = 15;
  cardStartPointX = this.width * 0.5;
  cardStartPointY = this.height * 0.3;
  cardEndPointY = this.cardStartPointY + 70;
  // End positions for left/right animations (using sample offsets)
  leftCard1EndPositionX = 105;
  leftCard2EndPositionX = 65;
  leftCard3EndPositionX = 27;
  rightCard1EndPositionX = 27;
  rightCard2EndPositionX = 65;
  rightCard3EndPositionX = 105;
  hiddenCardEndPointX = this.width * 0.22;
  hiddenCardEndPointY = this.height * 0.43;

  // Store active cards (only one per slot for demo)
  private leftCard1: Card | null = null;
  private leftCard2: Card | null = null;
  private leftCard3: Card | null = null;
  private rightCard1: Card | null = null;
  private rightCard2: Card | null = null;
  private rightCard3: Card | null = null;
  private hiddenCard: Card | null = null;

  // Dictionary for loaded images
  private images: { [key: string]: HTMLImageElement } = {};

  // Adjust game parameters based on canvas size
  private setBreakPoints() {
    switch (true) {
      case this.width >= 850:
        this.cardSize = 15;
        this.hiddenCardSize = 65;
        this.cardStartPointX = this.width * 0.45;
        this.cardStartPointY = this.height * 0.45;
        this.cardEndPointY = this.cardStartPointY + 80;
        this.leftCard1EndPositionX = 210;
        this.leftCard2EndPositionX = 120;
        this.leftCard3EndPositionX = 30;
        this.rightCard1EndPositionX = 80;
        this.rightCard2EndPositionX = 170;
        this.rightCard3EndPositionX = 260;
        this.hiddenCardEndPointX = this.width * 0.27;
        this.hiddenCardEndPointY = this.height * 0.41;

        break;

      case this.width >= 820:
        this.cardSize = 15;
        this.hiddenCardSize = 65;
        this.cardStartPointX = this.width * 0.45;
        this.cardStartPointY = this.height * 0.45;
        this.cardEndPointY = this.cardStartPointY + 80;
        this.leftCard1EndPositionX = 210;
        this.leftCard2EndPositionX = 120;
        this.leftCard3EndPositionX = 30;
        this.rightCard1EndPositionX = 80;
        this.rightCard2EndPositionX = 170;
        this.rightCard3EndPositionX = 260;
        this.hiddenCardEndPointX = this.width * 0.16;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;

      case this.width >= 768:
        this.cardSize = 15;
        this.hiddenCardSize = 60;
        this.cardStartPointX = this.width * 0.45;
        this.cardStartPointY = this.height * 0.45;
        this.cardEndPointY = this.cardStartPointY + 80;
        this.leftCard1EndPositionX = 210;
        this.leftCard2EndPositionX = 125;
        this.leftCard3EndPositionX = 40;
        this.rightCard1EndPositionX = 60;
        this.rightCard2EndPositionX = 145;
        this.rightCard3EndPositionX = 230;
        this.hiddenCardEndPointX = this.width * 0.11;
        this.hiddenCardEndPointY = this.height * 0.41;

        break;

      case this.width >= 390:
        this.cardSize = 50;
        this.hiddenCardSize = 39;
        this.cardStartPointX = this.width * 0.48;
        this.cardStartPointY = this.height * 0.48;
        this.cardEndPointY = this.cardStartPointY + 60;
        this.leftCard1EndPositionX = 140;
        this.leftCard2EndPositionX = 80;
        this.leftCard3EndPositionX = 20;
        this.rightCard1EndPositionX = 40;
        this.rightCard2EndPositionX = 100;
        this.rightCard3EndPositionX = 160;
        this.hiddenCardEndPointX = this.width * 0.13;
        this.hiddenCardEndPointY = this.height * 0.45;
        break;

      case this.width >= 320:
        this.cardSize = 15;
        this.hiddenCardSize = 37;
        this.cardStartPointX = this.width * 0.47;
        this.cardStartPointY = this.height * 0.49;
        this.cardEndPointY = this.cardStartPointY + 34;
        this.leftCard1EndPositionX = 113;
        this.leftCard2EndPositionX = 70;
        this.leftCard3EndPositionX = 27;
        this.rightCard1EndPositionX = 27;
        this.rightCard2EndPositionX = 70;
        this.rightCard3EndPositionX = 113;
        this.hiddenCardEndPointX = this.width * 0.1;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;

      default:
        this.cardSize = 15;
        this.hiddenCardSize = 80;
        this.cardStartPointX = this.width * 0.49;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 180;
        this.leftCard1EndPositionX = 260;
        this.leftCard2EndPositionX = 160;
        this.leftCard3EndPositionX = 60;
        this.rightCard1EndPositionX = 60;
        this.rightCard2EndPositionX = 160;
        this.rightCard3EndPositionX = 260;
        this.hiddenCardEndPointX = this.width * 0.25;
        this.hiddenCardEndPointY = this.height * 0.1;

        break;
    }
  }

  // Preload a set of card images (adjust or add more as needed)
  private preloadImages(): Promise<void> {
    const cardNames = [
      'Broder',
      'C2_',
      'C3_',
      'C4_',
      'C5_',
      'C6_',
      'C7_',
      'C8_',
      'C9_',
      'C10_',
      'CA_',
      'CJ_',
      'CQ_',
      'CK_',
      'D2_',
      'D3_',
      'D4_',
      'D5_',
      'D6_',
      'D7_',
      'D8_',
      'D9_',
      'D10_',
      'DA_',
      'DJ_',
      'DQ_',
      'DK_',
      'H2_',
      'H3_',
      'H4_',
      'H5_',
      'H6_',
      'H7_',
      'H8_',
      'H9_',
      'H10_',
      'HA_',
      'HJ_',
      'HQ_',
      'HK_',
      'S2_',
      'S3_',
      'S4_',
      'S5_',
      'S6_',
      'S7_',
      'S8_',
      'S9_',
      'S10_',
      'SA_',
      'SJ_',
      'SQ_',
      'SK_',
    ];
    const promises = cardNames.map((name) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = `/assets/52 Cards skew/${name}.svg`;
        img.onload = () => {
          this.images[name] = img;
          resolve();
        };
        img.onerror = () => reject(`Error loading image: ${name}`);
      });
    });
    return Promise.all(promises).then(() => {});
  }

  // Create a new card with initial animation properties.
  private createCard(
    cardName: string,
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    duration = 600
  ): Card {
    const img = this.images[cardName];
    return {
      img,
      x: startX,
      y: startY,
      initialX: startX,
      initialY: startY,
      targetX,
      targetY,
      alpha: 0,
      scale: this.cardSize / img.width,
      phase: 'initial',
      animationStartTime: performance.now(),
      animationDuration: duration,
    };
  }

  // Listen for key presses to trigger card animations.
  // Keys '1'-'6' create cards.
  // 'L' or 'l' animate left cards up/down.
  // 'R' or 'r' animate right cards up/down.
  // 'D' or 'd' trigger the disappearing animation.
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case '1': {
        const targetX = this.cardStartPointX - this.leftCard1EndPositionX;
        this.leftCard1 = this.createCard(
          'C5_',
          this.cardStartPointX,
          this.cardStartPointY,
          targetX,
          this.cardEndPointY
        );
        break;
      }
      case '2': {
        const targetX = this.cardStartPointX - this.leftCard2EndPositionX;
        this.leftCard2 = this.createCard(
          'C6_',
          this.cardStartPointX,
          this.cardStartPointY,
          targetX,
          this.cardEndPointY
        );
        break;
      }
      case '3': {
        const targetX = this.cardStartPointX - this.leftCard3EndPositionX;
        this.leftCard3 = this.createCard(
          'C7_',
          this.cardStartPointX,
          this.cardStartPointY,
          targetX,
          this.cardEndPointY
        );
        break;
      }
      case '4': {
        const targetX = this.cardStartPointX + this.rightCard1EndPositionX;
        this.rightCard1 = this.createCard(
          'H4_',
          this.cardStartPointX,
          this.cardStartPointY,
          targetX,
          this.cardEndPointY
        );
        break;
      }
      case '5': {
        const targetX = this.cardStartPointX + this.rightCard2EndPositionX;
        this.rightCard2 = this.createCard(
          'H5_',
          this.cardStartPointX,
          this.cardStartPointY,
          targetX,
          this.cardEndPointY
        );
        break;
      }
      case '6': {
        const targetX = this.cardStartPointX + this.rightCard3EndPositionX;
        this.rightCard3 = this.createCard(
          'H6_',
          this.cardStartPointX,
          this.cardStartPointY,
          targetX,
          this.cardEndPointY
        );
        break;
      }
      case 'l':
      case 'L': {
        if (this.leftCard1) this.animateUpDown(this.leftCard1);
        if (this.leftCard2) this.animateUpDown(this.leftCard2);
        if (this.leftCard3) this.animateUpDown(this.leftCard3);
        break;
      }
      case 'r':
      case 'R': {
        if (this.rightCard1) this.animateUpDown(this.rightCard1);
        if (this.rightCard2) this.animateUpDown(this.rightCard2);
        if (this.rightCard3) this.animateUpDown(this.rightCard3);
        break;
      }
      case 'd':
      case 'D': {
        if (this.leftCard1)
          this.moveAndRemoveCard(
            this.leftCard1,
            this.cardStartPointX,
            this.leftCard1.y
          );
        if (this.leftCard2)
          this.moveAndRemoveCard(
            this.leftCard2,
            this.cardStartPointX,
            this.leftCard2.y
          );
        if (this.leftCard3)
          this.moveAndRemoveCard(
            this.leftCard3,
            this.cardStartPointX,
            this.leftCard3.y
          );
        if (this.rightCard1)
          this.moveAndRemoveCard(
            this.rightCard1,
            this.cardStartPointX,
            this.rightCard1.y
          );
        if (this.rightCard2)
          this.moveAndRemoveCard(
            this.rightCard2,
            this.cardStartPointX,
            this.rightCard2.y
          );
        if (this.rightCard3)
          this.moveAndRemoveCard(
            this.rightCard3,
            this.cardStartPointX,
            this.rightCard3.y
          );
        setTimeout(() => {
          this.createHiddenCard();
        }, 700);
        break;
      }
      default:
        break;
    }
  }

  // Initiate an up/down (yoyo) animation on the given card.
  private animateUpDown(card: Card): void {
    if (card.phase === 'displayed') {
      card.phase = 'upDown';
      card.upDownStartTime = performance.now();
      card.upDownDuration = 600; // total duration (up + down)
      card.upDownOffset = 15; // move 15 pixels up
      card.originalY = card.y;
      card.upDownCycles = 0;
    }
  }

  // Initiate a disappearing animation on the card (moves it to target X and fades out).
  private moveAndRemoveCard(
    card: Card,
    endX: number,
    endY: number,
    duration = 1000
  ): void {
    card.phase = 'disappearing';
    card.disappearStartTime = performance.now();
    card.disappearDuration = duration;
    card.disappearTargetX = endX;
    card.disappearTargetY = endY;
    // Save starting position for interpolation.
    card.initialX = card.x;
    card.initialY = card.y;
  }

  // Main render loop.
  private render = (): void => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const now = performance.now();

    // Update & draw each card if present.
    this.updateAndDrawCard(this.leftCard1, now);
    this.updateAndDrawCard(this.leftCard2, now);
    this.updateAndDrawCard(this.leftCard3, now);
    this.updateAndDrawCard(this.rightCard1, now);
    this.updateAndDrawCard(this.rightCard2, now);
    this.updateAndDrawCard(this.rightCard3, now);
    this.updateAndDrawCard(this.hiddenCard, now);
    this.animationFrameId = requestAnimationFrame(this.render);
  };

  // Update each card’s state based on its current phase and then draw it.
  private updateAndDrawCard(card: Card | null, now: number): void {
    if (!card || card.phase === 'completed') {
      return;
    }
    switch (card.phase) {
      case 'initial': {
        const elapsed = now - card.animationStartTime;
        const progress = Math.min(elapsed / card.animationDuration, 1);
        card.x = card.initialX + (card.targetX - card.initialX) * progress;
        card.y = card.initialY + (card.targetY - card.initialY) * progress;
        card.alpha = progress;
        if (progress >= 1) {
          card.phase = 'displayed';
          card.x = card.targetX;
          card.y = card.targetY;
          card.alpha = 1;
        }
        break;
      }
      case 'upDown': {
        const elapsed = now - (card.upDownStartTime || now);
        const progress = Math.min(elapsed / (card.upDownDuration || 600), 1);
        if (progress < 0.5) {
          // Move upward.
          card.y =
            (card.originalY || card.y) -
            (card.upDownOffset || 15) * (progress / 0.5);
        } else {
          // Move back downward.
          card.y =
            (card.originalY || card.y) -
            (card.upDownOffset || 15) * (1 - (progress - 0.5) / 0.5);
        }
        if (progress >= 1) {
          // Increase the cycle count.
          card.upDownCycles = (card.upDownCycles || 0) + 1;
          if (card.upDownCycles < 2) {
            // Start another cycle: reset start time.
            card.upDownStartTime = now;
          } else {
            // Completed two cycles – return to 'displayed' state.
            card.phase = 'displayed';
            card.y = card.originalY || card.y;
          }
        }
        break;
      }

      case 'disappearing': {
        const elapsed = now - (card.disappearStartTime || now);
        const progress = Math.min(
          elapsed / (card.disappearDuration || 1000),
          1
        );
        card.x =
          card.initialX +
          ((card.disappearTargetX || card.x) - card.initialX) * progress;
        card.y =
          card.initialY +
          ((card.disappearTargetY || card.y) - card.initialY) * progress;
        card.alpha = 1 - progress;
        if (progress >= 1) {
          card.phase = 'completed';
          return; // Do not draw if completed.
        }
        break;
      }
      // 'displayed' means no further changes.
    }
    // Draw the card on the canvas.
    this.ctx.save();
    this.ctx.globalAlpha = card.alpha;
    this.ctx.translate(card.x, card.y);
    this.ctx.scale(card.scale, card.scale);
    this.ctx.drawImage(card.img, -card.img.width / 2, -card.img.height / 2);
    this.ctx.restore();
  }

  // Function to create a C5 card and animate it disappearing to the target coordinates.
  public createHiddenCard(): void {
    const startX = this.cardStartPointX;
    const startY = this.cardEndPointY;
    // Create the C5 card using the existing createCard function.
    // Here we pass startX and startY as both the initial and target positions,
    // and a duration of 0 so that it appears immediately.
    this.hiddenCard = this.createCard(
      'Broder',
      startX,
      startY,
      startX,
      startY,
      0
    );

    // Immediately set its phase to 'displayed'
    if (this.hiddenCard) {
      this.hiddenCard.phase = 'displayed';
      this.hiddenCard.scale = this.hiddenCardSize / this.images['Broder'].width;
      // Now trigger the disappearing animation:
      // This will move the card from its current position to x = this.width*0.22, y = this.height*0.43 over 1000 ms.
      this.moveAndRemoveCard(
        this.hiddenCard,
        this.hiddenCardEndPointX,
        this.hiddenCardEndPointY,
        1000
      );
    }
  }
  clearRound() {
    if (this.leftCard1)
      this.moveAndRemoveCard(
        this.leftCard1,
        this.cardStartPointX,
        this.leftCard1.y
      );
    if (this.leftCard2)
      this.moveAndRemoveCard(
        this.leftCard2,
        this.cardStartPointX,
        this.leftCard2.y
      );
    if (this.leftCard3)
      this.moveAndRemoveCard(
        this.leftCard3,
        this.cardStartPointX,
        this.leftCard3.y
      );
    if (this.rightCard1)
      this.moveAndRemoveCard(
        this.rightCard1,
        this.cardStartPointX,
        this.rightCard1.y
      );
    if (this.rightCard2)
      this.moveAndRemoveCard(
        this.rightCard2,
        this.cardStartPointX,
        this.rightCard2.y
      );
    if (this.rightCard3)
      this.moveAndRemoveCard(
        this.rightCard3,
        this.cardStartPointX,
        this.rightCard3.y
      );
    setTimeout(() => {
      this.createHiddenCard();
    }, 600);
  }
}
