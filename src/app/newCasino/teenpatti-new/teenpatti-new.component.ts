import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { first, retry, RetryConfig, Subscription } from 'rxjs';
import { CONFIG } from '../../../../config';
import { CasinoSocketService } from '../../services/casino-socket.service';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { NetworkService } from '../../services/network.service';
import { VideoPlayerComponent } from '../../shared/video-player/video-player.component';
import { VideoPlayerUnrealComponent } from "../../shared/video-player-unreal/video-player-unreal.component";
import { TopResultsComponent } from '../shared/top-results/top-results.component';
import { QuickStakesEditComponent } from "../../shared/mob-navigation/quick-stakes-edit/quick-stakes-edit.component";
import { ToggleService } from '../../services/toggle.service';

export let browserRefresh = false;
declare var $: any;

@Component({
  selector: 'app-teenpatti-new',

  standalone: true,
  imports: [TopResultsComponent, CommonModule, VideoPlayerComponent, VideoPlayerUnrealComponent, QuickStakesEditComponent],
  templateUrl: './teenpatti-new.component.html',
  styleUrl: './teenpatti-new.component.css'
})
export class TeenpattiNewComponent {
  reverseAnimate: boolean = false
  coinsState: boolean = false; // Coin bar is hidden by default
  coinStateActive: boolean = false;
  animateIcon: boolean = false;
  coinAnimateState = false
  animationContainer: boolean = false
  betState: boolean = false;
  selectedCoin: string = '/NteenPatti/Icons/green-coin.svg.svg';
  @ViewChild('dropdownContainer', { static: true }) dropdownContainer!: ElementRef;
  @ViewChild(VideoPlayerComponent)
  videoComponent!: VideoPlayerComponent;
  subscription!: Subscription;
  liveData$: any;
  animateCoinVal: any
  animate = false
  public message = {
    type: "1",
    id: ""
  };

  aPlayerChances: any;
  bPlayerChances: any;
  showHamburger: boolean = true;
  btnIcon = false
  btnCheck: any

  animationClass = '';

  newHeightPx!: string;
  openMobileMinMax: any = [];
  marketCollapsed: any = [];
  public messageResult = {
    type: "3",
    id: ""
  };





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

  constructor(private route: ActivatedRoute,
    private networkService: NetworkService,
    private encyDecy: EncryptDecryptService,
    private toggleService: ToggleService,
    private deviceService: DeviceDetectorService,
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
    this.getWindowSize()

    if (!this.isDesktop) {
      this.setMarketScrollHeight();
      $('html').css('overflow', 'hidden');
    }
    // if(this.game == undefined || this.game === null){
    this.resultcounter = 0;
    // this.socket.connect();
    // this.sendMsg();

    this.encyDecy.generateEncryptionKey('', this.message);

    this.subscription = this.encyDecy.getMarketData().pipe(retry(this.retryConfig)).subscribe((marketData: any) => {
      this.socket = marketData; // Update the receivedMessage variable with the received message
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID')

        let objMarket = JSON.parse(marketData);
        // let objMarket = marketData;
        if (this.eventid == '99.0046') {
          console.log(objMarket)
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
          if (this.getRoundId != this.game.roundId || this.getRoundId == '') {
            localStorage.setItem('roundID', this.game.roundId)
            this.getBalance();
            this.casinoPl = [];
            this.getResults();
            this.betSelectedPlayer = '';
            this.secndBoxWidth = '';
            this.firstBoxWidth = '';

          }

          this.networkService.updateRoundId(this.game);

          if (this.game.status == 'SUSPEND') {
            this.isBetsSlipOpened = '';
            this.isValueBetsSlip = 0;
          }
          this.playerACards = this.game?.cardsArr?.PLAYER_A;
          this.playerBCards = this.game?.cardsArr?.PLAYER_B;
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
          if (key_str.includes('.')) {

            this.split_arr = key_str.split('.');
            let marketIndex = parseInt(this.split_arr[1]);
            let runnersIndex = this.split_arr[3];
            let backIndex = this.split_arr[6];


            Object.entries(objMarket.data).forEach(([, value]) => {
              this.changeValue = value


              if (this.split_arr[7] == 'size') {
                if (runnersIndex == 0) {
                  // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                  let percnt1 = ((this.changeValue / this.sizeRunner1) * 100);
                  this.firstBoxWidth = -1 * (percnt1 - 100) + '';
                  console.log('player A', this.firstBoxWidth)
                }
                if (runnersIndex == 1) {
                  // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                  let percnt = ((this.changeValue / this.sizeRunner2) * 100);
                  this.secndBoxWidth = -1 * (percnt - 100) + '';
                  console.log('player B', this.secndBoxWidth)

                }
                this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = this.changeValue;

              }
              if (this.split_arr[7] == 'price') {

                this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = this.changeValue;
              }

              if (this.split_arr[4] == 'status') {

                this.marketArray[marketIndex].runners[runnersIndex].status = this.changeValue;
              }




            })

            // this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price  = this.changeValue;

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
    // this.scrollToBetslip() ;
    setTimeout(() => {
      const element = document.getElementById('betslip');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
          // console.log('Betslip is completely in the viewport');
        } else {
          // console.log('Betslip is not completely in the viewport');
          this.scrollToBetslip()
        }
      }

    }, 50);
    // setTimeout(() => {
    //   this.centerScrollableDiv('betslip');

    // }, 100);

    setTimeout(() => {
      const betslipElement = document.getElementById('betslip');
      const isBetslipOpen = betslipElement && betslipElement.style.display !== 'none';

      if (!isBetslipOpen) {
        // If the betslip is not already open, set up the event listener
        this.callFunctionOnClickNearBottom(350, this.scrollToBetslip);
        // this.centerScrollableDiv('betslip')

      } else {
        // console.log('Betslip is already open, no need to scroll');
      }
    }, 1);




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
          debugger
          data.data.forEach((round: any) => {
            if (round.winner === 'A') {
              playerAWins++;
            } else if (round.winner === 'B') {
              playerBWins++;
            }
          });
          this.aPlayerChances = (playerAWins / data?.data?.length) * 100
          this.bPlayerChances = (playerBWins / data?.data?.length) * 100
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

    let translateX = '205px';
    switch (this.animateCoinVal) {
      case 1:
        translateX = '205px';
        break;
      case 2:
        translateX = '143.8px';
        break;
      case 3:
        translateX = '85.51px';
        break;
      case 4:
        translateX = '26.4px';
        break;
      case 5:
        translateX = '-33.2px';
        break;
      case 6:
        translateX = '-90.8px';
        break;
    }
    document.documentElement.style.setProperty('--translateX', translateX);
    if (!this.btnCheck) {
      this.btnCheck = 1
    }

    let translateXRevers = '205px';
    switch (this.btnCheck) {
      case 1:
        translateXRevers = '205px';
        break;
      case 2:
        translateXRevers = '143.8px';
        break;
      case 3:
        translateXRevers = '85.51px';
        break;
      case 4:
        translateXRevers = '26.4px';
        break;
      case 5:
        translateXRevers = '-33.2px';
        break;
      case 6:
        translateXRevers = '-90.8px';
        break;
    }
    document.documentElement.style.setProperty('--translateXReverse', translateXRevers);


  }

}




