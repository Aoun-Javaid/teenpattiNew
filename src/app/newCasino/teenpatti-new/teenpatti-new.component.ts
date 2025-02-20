import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { first, retry, RetryConfig, Subscription } from 'rxjs';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { CasinoSocketService } from '../../services/casino-socket.service';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { NetworkService } from '../../services/network.service';
import { VideoPlayerComponent } from '../../shared/video-player/video-player.component';
import { VideoPlayerUnrealComponent } from "../../shared/video-player-unreal/video-player-unreal.component";
import { TopResultsComponent } from '../shared/top-results/top-results.component';
import { QuickStakesEditComponent } from "../../shared/mob-navigation/quick-stakes-edit/quick-stakes-edit.component";
import { ToggleService } from '../../services/toggle.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { ToastrService } from 'ngx-toastr';
import { BetCoinComponent } from '../../shared/bet-coin/bet-coin.component';
import { BetsChipsComponent } from '../shared/bets-chips/bets-chips.component';

export let browserRefresh = false;
declare var $: any;

@Component({
  selector: 'app-teenpatti-new',

  standalone: true,
  imports: [TopResultsComponent, ShortNumberPipe, CommonModule, VideoPlayerComponent, VideoPlayerUnrealComponent, QuickStakesEditComponent, BetCoinComponent, BetsChipsComponent],
  templateUrl: './teenpatti-new.component.html',
  styleUrl: './teenpatti-new.component.css'
})
export class TeenpattiNewComponent implements OnInit, OnDestroy {
  reverseAnimate: boolean = false
  coinsState: boolean = false; // Coin bar is hidden by default
  coinStateActive: boolean = false;
  animateIcon: boolean = false;
  coinAnimateState = false;
  animationContainer: boolean = false
  betState: boolean = false;
  selectedCoin: string = '/NteenPatti/Icons/green-coin.svg.svg';
  @ViewChild('dropdownContainer', { static: true }) dropdownContainer!: ElementRef;
  @ViewChild(VideoPlayerComponent)
  videoComponent!: VideoPlayerComponent;
  subscription!: Subscription;
  liveData$: any;
  animateCoinVal: any
  waitRound: any
  animate = false
  public message = {
    type: "1",
    id: ""
  };
  selectedBetAmount: any;
  aPlayerChances: any;
  bPlayerChances: any;
  TPlayerChances: any;
  showHamburger: boolean = true;
  btnIcon = false
  btnCheck = 1

  animationClass = '';

  newHeightPx!: string;
  openMobileMinMax: any = [];
  marketCollapsed: any = [];
  public messageResult = {
    type: "3",
    id: ""
  };
  isbetInProcess: boolean = false;




  retryConfig: RetryConfig = {
    count: 1000

  };

  eventid: any;
  myVideo: any = null;
  placedbet = true;
  runnersName: any = {};
  casinoPl = [];
  marketArray: any;
  isBetsSlipOpened = "";
  rulesBox: any;
  selectedResult: any;
  betplaceObj: any;
  resultArray: any;
  totalMatchedBets: any;
  game: any;
  betSlip: string = "game";
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
  // isTeNteenPatti:any;
  stackButtonArry: any = STACK_VALUE;

  constructor(private route: ActivatedRoute,
    private networkService: NetworkService,
    private encyDecy: EncryptDecryptService,
    private toggleService: ToggleService,
    private deviceService: DeviceDetectorService,
    private indexedDb: IndexedDbService,
    private toaster: ToastrService,
    private socket: CasinoSocketService) {

    this.eventid = this.route.snapshot.params['id'];
    localStorage.setItem('eventId', this.eventid)
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


    this.getStackData();
    this.getWindowSize()

    if (!this.isDesktop) {

      this.setMarketScrollHeight();
      if (this.isMobileInfo !== 'iOS') {
        $('html').css('overflow', 'hidden');
      }
    }
    // if(this.game == undefined || this.game === null){
    this.resultcounter = 0;
    // this.socket.connect();
    // this.sendMsg();

    this.encyDecy.generateEncryptionKey('', this.message);

    this.subscription = this.encyDecy.getMarketData().pipe(retry(this.retryConfig)).subscribe((marketData: any) => {
      this.socket = marketData; // Update the receivedMessage variable with the received message

      if (marketData) {
        // this.getRoundId = localStorage.getItem('roundID')

        let objMarket = JSON.parse(marketData);
        console.log('market data', objMarket)
        // let objMarket = marketData;
        if (this.eventid == '99.0046') {
          // console.log(objMarket)
        }

        //First time get responce in array
        if (Array.isArray(objMarket?.data)) {
          if (objMarket?.data[0]) {
            if (objMarket?.type == "1") {
              this.marketArray = objMarket?.data[0]?.marketArr;
              this.game = objMarket?.data[0];
              this.game.marketArr = this.marketArray ? this.marketArray : objMarket?.data[0]?.marketArr;
              this.sizeRunner1 = this.marketArray[0].runners[0].price.back[0].size;
              this.sizeRunner2 = this.marketArray[0].runners[1].price.back[0].size;
              this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
              this.getRoundId = this.game.roundId
              this.handleEventResponse(objMarket, 0)

            }
          }

        }
        else {
          this.handleEventResponse(objMarket, 0)

        }


        if (this.game) {
          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          this.marketArray = this.game.marketArr
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
            this.betSelectedPlayer = '';
            this.secndBoxWidth = '';
            this.firstBoxWidth = '';

          }

          // this.networkService.updateRoundId(this.game);

          if (this.game.status == 'SUSPEND') {
            this.isBetsSlipOpened = '';
            this.isValueBetsSlip = 0;
          }
          if (this.game.status == 'ONLINE') {

          }
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;

          if (this.playerACards) {
            if (this.playerACards?.card_1 == 0 && this.game.status == 'SUSPEND') {
              this.game.noMoreBets = true;
            }
            else {
              this.game.noMoreBets = false;
            }
          }
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
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
  openQuickStakes() {
    this.toggleService.setQuickStakeEditSidebarState(true)
  }
  handleEventResponse(objMarket: any, index: any) {
    // console.log(objMarket,'<=============== objMarket with out index')
    if (Array.isArray(objMarket)) {
      objMarket.forEach((objMarketRes: any) => {
        // console.log('loop indesx', objMarketRes)
        // console.log(objMarketRes,'asal data',index,'objMarket?.data[0]===>')
        this.marketObhManager(objMarketRes);
        return

      })
    } else {
      let objMarketRes = objMarket;
      this.marketObhManager(objMarketRes)
      return

    }
  }

  marketObhManager(objMarket: any) {
    if (objMarket) {

      if (objMarket.type == "1") {
        if ('data' in objMarket && this.counter == 0 && objMarket.data.marketArr && objMarket.data._id) {
          this.marketArray = objMarket.data.marketArr;
          this.sizeRunner1 = this.marketArray[0].runners[0].price.back[0].size;
          this.sizeRunner2 = this.marketArray[0].runners[1].price.back[0].size;
          this.game = this.marketArray ? this.marketArray : objMarket.data;
          this.game = objMarket.data;
          this.counter = 1;
        }
        else {
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
          if ('resultsArr' in objMarket?.data) {

            // if (objMarket?.data?.roundStatus == 'RESULT_DECLARED') {

            if (this.casinoPl && this.casinoPl[this.winnerMarketArray?.marketId]) {
              if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[0].selectionId] > 0) {
                this.betSelectedPlayer = this.winnerMarketArray.runners[0].selectionId
              }
              if (this.casinoPl[this.winnerMarketArray?.marketId][this.winnerMarketArray.runners[1].selectionId] > 0) {
                this.betSelectedPlayer = this.winnerMarketArray.runners[1].selectionId
              }
            }
            // for video results
            for (let key in objMarket.data.resultsArr[0].runners) {
              if (objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {

                this.RoundWinner = objMarket.data.resultsArr[0]?.runnersName[key];
                // console.log(this.RoundWinner)
              }
              if (key == this.betSelectedPlayer && objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') {
                setTimeout(() => {
                  // console.log(this.RoundWinner,'fireworksd')
                  this.videoComponent.surpriseFireWork();
                }, 1000);
              }
            }
            setTimeout(() => {
              this.RoundWinner = null;
            }, 5000)
            // }
          }
          //One linner change from socket

          var key_str = Object.keys(objMarket?.data)[0];
          var key_str = Object.keys(objMarket?.data)[0];
          if (key_str.includes('.')) {
            this.split_arr = key_str.split('.');
            // console.log(this.split_arr);
            Object.entries(objMarket.data).forEach(
              ([, value]) => (this.changeValue = value),
            );

            let marketIndex = parseInt(this.split_arr[1]);
            let runnersIndex = this.split_arr[3];
            let backIndex = this.split_arr[6];

            // this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price  = this.changeValue;

            if (this.split_arr[7] == 'size') {

              if (runnersIndex == 0 && marketIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt1 = ((this.changeValue / this.sizeRunner1) * 100);
                this.firstBoxWidth = -1 * (percnt1 - 100) + '';
                // console.log('player A', this.firstBoxWidth)
              }
              if (runnersIndex == 1 && marketIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = ((this.changeValue / this.sizeRunner2) * 100);
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
    }
    else {
      targetHeight = Math.floor(windowHeight * 0.63);
    }

    if (marketScrollElement) {
      marketScrollElement.style.height = `${targetHeight}px`;
      // marketScrollElement.style.marginTop = `${margintop}px`;
    }
  }


  openBetslip(marketId: any, selectionId: any, betType: any, price: any, min: any, max: any) {

    if(this.game.status=='SUSPEND'){
      this.waitRound = true
      setTimeout(() => {
        this.waitRound = false
      }, 1000);
    }

    if (this.game.status != 'SUSPEND' && !this.isbetInProcess) {
      if (this.selectedBetAmount > 0) {
        this.isBetsSlipOpened = selectionId;
        this.marketId = marketId;
        this.betType = betType
        this.isValueBetsSlip = 0;

        this.betplaceObj = {
          marketId: marketId,
          selectionId: selectionId,
          betType: betType,
          price: price,
          eventId: this.eventid,
          roomId: this._roomId,
          minValue: min,
          maxValue: max

        }
        this.placeCasinoBet();
      }
      else {
        this.toaster.error("please select chips for Bet", '', {
          positionClass: 'toast-top-right',
        })
      }
    }
    else {
      return
    }

  }

  placeCasinoBet() {
    this.isbetInProcess = true;

    let data = {
      marketId: this.betplaceObj.marketId,
      selectionId: this.betplaceObj.selectionId,
      stake: this.selectedBetAmount,
      eventId: this.betplaceObj.eventId,
      flag: this.betplaceObj.betType
    };

    $('.btn-placebet').prop('disabled', true);
    let apiURL;

    apiURL = CONFIG.asianCasinoPlacebetURL;

    // if (this.item.roomId == 'eu') {
    //   apiURL = CONFIG.eUCasinoPlacebetURL;
    // } else {
    //   apiURL = CONFIG.asianCasinoPlacebetURL;
    // }

    this.networkService.getAllRecordsByPost(apiURL, data)
      .pipe(first())
      .subscribe(
        res => {
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
            }
            this.networkService.setBetPlace(placeBetObj);
            this.game.betAccepted = true;
            this.networkService.updateRoundId(this.game);
            setTimeout(() => {
              this.game.betAccepted = false;
              this.networkService.updateRoundId(this.game);
            }, 1500);

          }
          else {
            // $('.btn-placebet').prop('disabled', false);
            // this.afterPlaceBet();
            if (res?.meta.status == false) {
              this.toaster.error(res.meta.message, '', {
                positionClass: 'toast-top-right',
              });
              // this.cancelBet();
            } else {
              this.toaster.error("Something went wrong please try again.", '', {
                positionClass: 'toast-top-right',
              });
            }
            this.isbetInProcess = false;
          }

          var pl = res.pl;


        },
        error => {
          //let statusError = error;
          $('.btn-placebet').prop('disabled', false);
          //this.afterPlaceBet();
          if (error?.error.meta.status == false) {
            this.toaster.error(error.error.meta.message, '', {
              positionClass: 'toast-top-right',
            });
            // this.cancelBet();
          } else {
            this.toaster.error("Something went wrong please try again.", '', {
              positionClass: 'toast-top-right',
            });
          }
          this.isbetInProcess = false;
        });
  }
  callFunctionOnClickNearBottom(thresholdFromBottom: number, callback: () => void) {
    window.addEventListener("click", (event) => {
      const viewportHeight = window.innerHeight;
      const clickY = event.clientY;

      if (viewportHeight - clickY <= thresholdFromBottom) {
        callback();
      }
    });
  }

  scrollToBetslip() {
    const element = document.getElementById("betslip");
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
            top: container.scrollTop + listItemTop - (containerHeight / 3), // Scroll to the top
          });
        } else if (listItemBottom > (2 * containerHeight) / 3) {
          // ListItem is in the bottom third of the container
          // console.log('ListItem is at the bottom');
          container.scrollTo({
            behavior: 'smooth',
            top: container.scrollTop + listItemBottom - (2 * containerHeight / 3), // Scroll to the bottom
          });
        } else {
          // ListItem is in the middle third of the container
          // console.log('ListItem is in the middle');
          container.scrollTo({
            behavior: 'smooth',
            top: container.scrollTop + listItemTop - (containerHeight / 2) + (listItemRect.height / 2), // Scroll to the middle
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

    this.networkService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.networkService.updateResultstream(data.data)
          let playerAWins = 0
          let playerBWins = 0
          // debugger
          data.data.forEach((round: any) => {
            if (round.winner === 'A') {
              playerAWins++;
            } else if (round.winner === 'B') {
              playerBWins++;
            }
          });
          this.aPlayerChances = (playerAWins / data?.data?.length) * 100
          this.bPlayerChances = (playerBWins / data?.data?.length) * 100
          this.TPlayerChances = (100 - this.aPlayerChances - this.bPlayerChances);
        },
        error => {
          let responseData = error;
        });
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
    this.getAllMarketProfitLoss()
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
    this.networkService.getAllRecordsByPost(CONFIG.getUserBalanceURL, {})
      .pipe(first())
      .subscribe(
        data => {

          if (data.meta.status == true) {
            let availBalance = (data.data.bankBalance - data.data.exposure).toFixed(2)
            $('.userTotalBalance').text(availBalance);
            $('.userTotalExposure').text(data.data.exposure);
            let ex = data.data.exposure.toLocaleString('en-US', { style: 'currency', currency: 'USD', symbol: '' });
            ex = ex.substring(1)
            $('.userTotalExposure').text(ex);
          }
        },
        error => {
          let responseData = error;
        });
  }

  ngOnDestroy(): void {
    let message = {
      type: "2",
      id: ""
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
    this.getWindowSize()
  }

  getWindowSize() {
    const baseWidth = 352; // Base resolution width
    const scale = window.innerWidth / baseWidth
    document.documentElement.style.setProperty('--boardScale', scale.toString());


    const baseHeight = 716; // Base resolution height
    const scaleY = window.innerHeight / baseWidth
    document.documentElement.style.setProperty('--boardScaleY', scaleY.toString());
  }


  getCoinValue(event: any) {
    console.log('event', event);
  }




  replaceHamburgerImage(coinSrc: string) {
    let timer = 0
    if (this.animationContainer === true) {
      timer = 1000
    }
    else {
      timer = 0
    }
    setTimeout(() => {
      this.animationContainer = !this.animationContainer
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
      let timer = 0
      if (this.animationContainer === true) {
        timer = 1000
      }
      else {
        timer = 0
      }
      setTimeout(() => {
        this.animationContainer = !this.animationContainer
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
    this.animateCoinVal = value
    this.btnCheck = value
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




