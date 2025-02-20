import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {TopResultsComponent} from "../shared/top-results/top-results.component";
import {VideoPlayerComponent} from "../../shared/video-player/video-player.component";
import {CommonModule} from "@angular/common";
import {BetCoinComponent} from "../../shared/bet-coin/bet-coin.component";
import {ShortNumberPipe} from "../../pipes/short-number.pipe";
import { first, retry, RetryConfig, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { NetworkService } from '../../services/network.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../config';
import { CasinoSocketService } from '../../services/casino-socket.service';

declare var $: any;

@Component({
  selector: 'app-live-baccarat',
  standalone: true,
  imports: [TopResultsComponent, VideoPlayerComponent, CommonModule, BetCoinComponent],
  templateUrl: './live-baccarat.component.html',
  styleUrl: './live-baccarat.component.css'
})
export class LiveBaccaratComponent implements OnInit {
  isMobile: boolean = false;
  firstBoxWidth: string = '';
  secndBoxWidth: string = '';

  @ViewChild(VideoPlayerComponent)
  videoComponent!: VideoPlayerComponent;
  subscription!: Subscription

  liveData$: any;
  public message = {
    type: "1",
    id: ""
  };


  public messageResult = {
    type: "3",
    id: ""
  };

  selectedBetAmount = 0;
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
  tieMarketArray: any;
  pairMarketArray: any;
  getRoundId: any;
  counter: number = 0;
  split_arr: any;
  changeValue: any;
  resultcounter = 0;
  RoundWinner: any;
  betSelectedPlayer: any;

  isBetPlaceProccess: boolean = false;
  betStakes: any;

  playerMarket = '0%';
  playerMarketSize: any;
  tieMarket = '0%';
  tieMarketSize: any;
  bankerMarket = '0%';
  bankerMarketSize: any;
  pairPlayer = '0%';
  pairPlayerSize: any;
  pairBanker = '0%';
  pairBankerSize: any;
  isDesktop: any;

  // playerMarket = '0%';
  // tieMarket = '0%';
  // bankerMarket = '0%';
  // pairPlayer = '0%';
  // pairBanker = '0%';
  tieMarketLeft = '45%'

  retryConfig: RetryConfig = {
    count: 1000

  };

  constructor(private route: ActivatedRoute,
    private socket: CasinoSocketService,
    private toaster: ToastrService,
    private encyDecy: EncryptDecryptService,
    private deviceService: DeviceDetectorService,
    private networkService: NetworkService,
    private mainService: MainService) {

    this.eventid = this.route.snapshot.params['id'];
    localStorage.setItem('eventId', this.eventid)
    this.message.id = this.eventid;
    this.messageResult.id = this.eventid;
    // this.sendMsg();

    this.isDesktop = this.deviceService.isDesktop();
    // console.log(this.isDesktop, 'isDesktop');

  }

  @HostListener('window:resize', ['$event'])
onResize(event?: Event) {
  console.log(this.checkWindowSize()); // ✅ Ab ye true/false return karega
}

checkWindowSize() {
  this.isMobile = window.innerWidth <= 1312;
  return this.isMobile; // 🔥 Ab yeh value return karega
}


  ngOnDestroy(): void {
    let message = {
      type: "2",
      id: ""
    };
    this.encyDecy.sendMessageToSocket(message);
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.getBetStake();
    }, 2000);
    this.resultcounter = 0;

    // this.socket.connect();
    // this.sendMsg();

    // ws
    this.encyDecy.generateEncryptionKey('', this.message);

    this.subscription = this.encyDecy.getMarketData().pipe(retry(this.retryConfig)).subscribe((marketData: any = []) => {
      // this.subscription = this.encyDecy.getMarketData().pipe(retry(this.retryConfig)).subscribe((marketData: any) => {
      this.socket = marketData; // Update the receivedMessage variable with the received message
      if (marketData) {
        this.getRoundId = localStorage.getItem('roundID')

        let objMarket = JSON.parse(marketData);

        if (Array.isArray(objMarket.data)) {

          if (objMarket.type == "1") {
            this.marketArray = objMarket?.data[0]?.marketArr;
            this.game = objMarket?.data[0];
            this.game.marketArr = this.marketArray ? this.marketArray : objMarket?.data[0]?.marketArr;
            this.playerMarketSize = this.marketArray[0]?.runners[0]?.price?.back[0]?.size;
            this.bankerMarketSize = this.marketArray[0]?.runners[1]?.price?.back[0]?.size;
            this.tieMarketSize = this.marketArray[1]?.runners[0]?.price?.back[0]?.size;
            this.pairPlayerSize = this.marketArray[2]?.runners[0]?.price?.back[0]?.size;
            this.pairBankerSize = this.marketArray[2]?.runners[1]?.price?.back[0]?.size;
            this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';

            this.handleEventResponse(objMarket, 0)
          }


        }
        else {
          this.handleEventResponse(objMarket, 0)
        }

        if (this.game) {
          this.winnerMarketArray = this.game?.marketArr ? this.game?.marketArr[0] : '';
          this.marketArray = this.game.marketArr
          this.gameroundId = this.game.roundId;

          //  get balance on round Id change
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
          this.playerACards = this.game?.cardsArr?.PLAYER;
          this.playerBCards = this.game?.cardsArr?.BANKER;
          this.winnerMarketArray = this.game.marketArr ? this.game.marketArr[0] : ''
          this.tieMarketArray = this.game.marketArr ? this.game.marketArr[1] : ''
          this.pairMarketArray = this.game.marketArr ? this.game.marketArr[2] : ''
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
    this.getBetStake();
    this.getResults();
    this.checkWindowSize();
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

  marketObhManager(res: any) {
    let objMarket = res;
    if (objMarket && objMarket.type == "1") {
      if ('data' in objMarket && this.counter == 0 && objMarket.data.marketArr && objMarket.data._id) {
        this.marketArray = objMarket.data.marketArr;
        this.game = this.marketArray ? this.marketArray : objMarket.data;
        this.game = objMarket.data;
        this.counter = 1;
        this.playerMarketSize = this.marketArray[0]?.runners[0]?.price?.back[0]?.size;
        this.bankerMarketSize = this.marketArray[0]?.runners[1]?.price?.back[0]?.size;
        this.tieMarketSize = this.marketArray[1]?.runners[0]?.price?.back[0]?.size;
        this.pairPlayerSize = this.marketArray[2]?.runners[0]?.price?.back[0]?.size;
        this.pairBanker = this.marketArray[2]?.runners[1]?.price?.back[0]?.size;
      }
      else {



        if ('roundId' in objMarket) {
          if (this.game.roundId != objMarket?.roundId) {

            this.playerMarket = '0%';
            this.tieMarket = '0%';
            this.bankerMarket = '0%';
            this.pairPlayer = '0%';
            this.pairBanker = '0%';
            this.tieMarketLeft = '45%';

            this.getBalance();
          }
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

            if ((key == this.betSelectedPlayer && objMarket.data?.resultsArr[0]?.runners[key] == 'WINNER') || (key == this.betSelectedPlayer && objMarket.data?.resultsArr[1]?.runners[0] == 'WINNER')) {
              setTimeout(() => {
                // console.log(this.RoundWinner,'fireworksd')
                this.videoComponent.surpriseFireWork();
              }, 1000);
            }
          }
          if (objMarket.data.resultsArr[1].runners[39578955] == 'WINNER') {
            // console.log('winner winner')
            // this.RoundWinner = objMarket.data?.resultsArr[1]?.runners[0];
            this.RoundWinner = objMarket.data?.resultsArr[1]?.runnersName[39578955];
          }
          setTimeout(() => {
            this.RoundWinner = null;
          }, 5000)
          // }
        }

        var key_str = Object.keys(objMarket?.data)[0];
        if (key_str.includes('.')) {
          this.split_arr = key_str.split('.');
          Object.entries(objMarket?.data).forEach(([, value]) => this.changeValue = value)

          let marketIndex = parseInt(this.split_arr[1]);
          let runnersIndex: any = this.split_arr[3];
          let backIndex = this.split_arr[6];

          // this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price  = this.changeValue;

          // if(this.split_arr[7]== 'size'){
          //   if(marketIndex==0){
          //     if(runnersIndex==0){
          //       let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
          //       let percnt = ((this.changeValue/size)*100);
          //       this.playerMarket = -1*(percnt-100 )+'%';
          //     }
          //     if(runnersIndex==1){
          //       let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
          //       let percnt = ((this.changeValue/size)*100);
          //       this.bankerMarket=  -1*(percnt-100 )+'%';
          //     }
          //   }
          //   if(marketIndex==1){
          //     if(runnersIndex==0){
          //       let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
          //       let percnt = ((this.changeValue/size)*100);
          //       let PercentFinal = -1*(percnt-100 );
          //       this.tieMarket = -1*(percnt-100 )+'%';
          //       if(PercentFinal<=10){
          //         this.tieMarketLeft ='45%'
          //       }
          //       if(PercentFinal > 10){

          //        let percentLeft =   45 - (( PercentFinal - 10) / 2 ) ;

          //        this.tieMarketLeft  = percentLeft + '%'

          //       }
          //       this.tieMarket = -1*(percnt-100 )+'%';
          //     }

          //   }
          //   if(marketIndex==2){
          //     if(runnersIndex==0){
          //       let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
          //       let percnt = ((this.changeValue/size)*100);
          //       this.pairPlayer = -1*(percnt-100 )+'%';
          //     }
          //     if(runnersIndex==1){
          //       let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
          //       let percnt = ((this.changeValue/size)*100);
          //       this.pairBanker =  -1*(percnt-100 )+'%';
          //     }
          //   }
          //   this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size  = this.changeValue;

          // }

          if (this.split_arr[7] == 'size') {
            //

            if (marketIndex == 0) {
              if (runnersIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = ((this.changeValue / this.playerMarketSize) * 100);
                this.playerMarket = -1 * (percnt - 100) + '%';
              }
              //
              if (runnersIndex == 1) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = ((this.changeValue / this.bankerMarketSize) * 100);
                this.bankerMarket = -1 * (percnt - 100) + '%';
              }
            }
            if (marketIndex == 1) {
              if (runnersIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = ((this.changeValue / this.tieMarketSize) * 100);
                this.tieMarket = -1 * (percnt - 100) + '%';


                let PercentFinal = -1 * (percnt - 100);
                if (PercentFinal <= 10) {
                  this.tieMarketLeft = '45%'
                }
                if (PercentFinal > 10) {

                  let percentLeft = 45 - ((PercentFinal - 10) / 2);

                  this.tieMarketLeft = percentLeft + '%'

                }
              }
              //
            }
            if (marketIndex == 2) {
              //
              if (runnersIndex == 0) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = ((this.changeValue / this.pairPlayerSize) * 100);
                this.pairPlayer = -1 * (percnt - 100) + '%';
              }
              //
              if (runnersIndex == 1) {
                // let size =this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size ;
                let percnt = ((this.changeValue / this.pairBankerSize) * 100);
                this.pairBanker = -1 * (percnt - 100) + '%';
              }
            }
            this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].size = this.changeValue;

          }




          if (this.split_arr[7] == 'price') {

            this.marketArray[marketIndex].runners[runnersIndex].price.back[backIndex].price = this.changeValue;
          }
        }
      }

    }
  }


  getBetStake() {
    // this.betStakes = this.networkService.getBetStakes();
    // if(!this.betStakes){
    //   this.networkService.getbetStakesForEu().subscribe((data:any)=>{
    //     this.betStakes = data;
    //     // console.log('betstake',this.betStakes)
    //   });
    // }
    this.mainService.getDataFromServices(CONFIG.userGetStackURL, 1440).subscribe((data: any) => {
      this.betStakes = data.data.stake;
    });

  }

  openBetslip(marketId: any, selectionId: any, betType: any, price: any, min: any, max: any) {
    if (this.game.status !== 'SUSPEND' && !this.isBetPlaceProccess) {
      if (this.selectedBetAmount > 0) {
        this.isBetsSlipOpened = selectionId;
        this.marketId = marketId;
        this.betType = betType
        this.isValueBetsSlip = 0;
        //  this.selectedCell = selectionId;
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
        this.toaster.error("please select chips for Bet")
      }
    }


  }




  getResults() {

    this.networkService.getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        data => {
          this.networkService.updateResultstream(data.data);
        },
        error => {
          let responseData = error;
        });
  }

  placeCasinoBet() {
    let data = {
      marketId: this.betplaceObj.marketId,
      selectionId: this.betplaceObj.selectionId,
      stake: this.selectedBetAmount,
      eventId: this.betplaceObj.eventId,
      flag: this.betplaceObj.betType
    };

    // $('.btn-placebet').prop('disabled', true);
    $('.checkBetAPi').prop('disabled', true);
    let apiURL;
    this.isBetPlaceProccess = true;
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
            $('.checkBetAPi').prop('disabled', false);

            this.isBetPlaceProccess = false;
            // this.afterPlaceBet();
            this.getBalance();
            this.getAllMarketProfitLoss();

            // this.getAllMarketProfitLoss();
          }
          else {

            this.isBetPlaceProccess = false;
            // $('.btn-placebet').prop('disabled', true);
            $('.checkBetAPi').prop('disabled', true);

            // this.afterPlaceBet();
            if (res?.meta.status == false) {
              this.toaster.error(res.meta.message);
              // this.cancelBet();
            } else {
              this.toaster.error("Something went wrong please try again.");
            }
          }

          var pl = res.pl;


        },
        error => {
          this.isBetPlaceProccess = false;
          //let statusError = error;
          // $('.btn-placebet').prop('disabled', false);
          $('.checkBetAPi').prop('disabled', false);

          //this.afterPlaceBet();
          if (error?.error.meta.status == false) {
            this.toaster.error(error.error.meta.message);
            // this.cancelBet();
          } else {
            this.toaster.error("Something went wrong please try again.");
          }
        });
  }

  setStake(amount: number) {
    if (amount != this.selectedBetAmount) {
      this.selectedBetAmount = amount;
    }
    else {
      this.selectedBetAmount = 0;
    }

  }


  intoNumber(str: any) {
    str.replace('%', '');
    let num = parseInt(str);
    // num = 100 - num
    return num
  }


  playerPair() {
    // el.scrollIntoView();

    // this.scroller.scrollToAnchor("playerPairSlip");
    setTimeout(() => {

      document.getElementById("playerPairSlip")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
    }, 1);


  }


  bankerPair() {
    // this.scroller.scrollToAnchor("bankerPairSlip");
    setTimeout(() => {
      document.getElementById("bankerPairSlip")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
    }, 1);
  }


  // openBetslip(marketId: any, selectionId: any, betType: any, price: any, min: any, max: any) {

  //   this.isBetsSlipOpened = selectionId;
  //   this.marketId = marketId;
  //   this.betType = betType
  //   this.isValueBetsSlip = 0;

  //   this.betplaceObj = {
  //     marketId: marketId,
  //     selectionId: selectionId,
  //     betType: betType,
  //     price: price,
  //     eventId: this.eventid,
  //     roomId: this._roomId,
  //     minValue: min,
  //     maxValue: max

  //   }

  // }


  doSomething(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip;
  }


  catchWebSocketEvents(msg: any) {
  }

  sendMsg() {
    // this.casinoService.messages.next(this.message);
    this.socket.send(this.message);
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

  getCoinValue(event: any) {
    console.log('event', event);
  }

  getClickedItem(blockName: string){
    console.log(blockName + " Method Clicked");
  }

}
