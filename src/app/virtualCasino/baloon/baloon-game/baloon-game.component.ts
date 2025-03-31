import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import Phaser from 'phaser';
import { backgroundScene } from '../scenes/backgroundScene';
import { baloonScene } from '../scenes/baloonScene';
import { aviatorScene } from '../scenes/aviatorScene';
import { spaceScene } from '../scenes/spaceScene';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { MusicScene } from '../scenes/musicScene';
import { first, retry, RetryConfig } from 'rxjs';



import { FooterComponent } from '../footer/footer.component';
import { AutoPlayComponent } from '../modals/auto-play/auto-play.component';
import { BetHistoryComponent } from '../modals/bet-history/bet-history.component';

import { TimerComponent } from '../timer/timer.component';
import { ToggleService } from '../../../services/toggle.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { NetworkService } from '../../../services/network.service';
import { ToasterService } from '../../../services/toaster.service';
import { CONFIG } from '../../../../../config';

@Component({
  selector: 'app-baloon-game',
  imports: [
    CommonModule,
    FooterComponent,
    AutoPlayComponent,
    BetHistoryComponent,
    TimerComponent,
  ],
  standalone: true,
  templateUrl: './baloon-game.component.html',
  styleUrl: './baloon-game.component.css',
})
export class BaloonGameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('phaserContainer', { static: false }) phaserContainer!: ElementRef;
  game!: Phaser.Game;
  betHistoryModalState: boolean = false;
  autoPlayState: boolean = false;
  ipadProState: boolean = false;
  nestHubState: boolean = false;
  bgMusicState: boolean = false;
  isBalloonCrashed: boolean = false;
  bgSoundState: boolean = false;
  isBetCashOut: boolean = false;
  // new variables
  isPlaneOnMove: boolean = false;
  planeFlewAway: boolean = false;
  gameAnimationState: boolean = true;
  gameSoundState: boolean = true;
  subscription: any;
  gameRound: any;
  getRoundId: any;
  marketArray: any;
  previousRound: any;
  counter: number = 0;
  toasterState: boolean = false;
  results: any = [];
  plListState: boolean = true;
  waitingState: boolean = false;
  plStateColorBlack: boolean = true;
  timeLeft!: number;
  private plStateTimer: any = null;
  public message = {
    type: '1',
    id: '88.0023',
  };
  //
  userCount: any;
  eventid = '88.0023';
  multiplier = '1.00';
  retryConfig: RetryConfig = {
    count: 1000,
  };
  AllBets: any = [];
  currentState: any;
  cashOutBets: any = [];
  placedBets: any = [];

  constructor(
    private toggle: ToggleService,
    private cdr: ChangeDetectorRef,
    private encyDecy: EncryptDecryptService,
    private networkService: NetworkService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.getResults();
    this.getResultStream();
    this.getBetHistoryModalState();
    this.detectIpadProScreen();
    this.detectNestHubScreen();
    this.getBgSoundState();
    this.toggle.getAutoPlay().subscribe((value: any) => {
      this.autoPlayState = value;
    });
    this.toggle.getcancelledBet().subscribe((bet: any) => {
      if (bet) {
        this.removeBetArr(bet);
      }
    });

    this.getPlacedBets();
    // this.getCashOutBets();

    this.encyDecy.generateEncryptionKey('', this.message);

    this.subscription = this.encyDecy
      .getMarketData()
      .pipe(retry(this.retryConfig))
      .subscribe((marketData: any) => {
        // this.reset();
        // this.notifyParent.emit({ key: 'eventId', value: this.eventid });
        this.toggle.setBalloonEvents({ key: 'eventId', value: this.eventid });
        if (marketData) {
          this.getRoundId = localStorage.getItem('roundID');

          let objMarket = JSON.parse(marketData);
          // console.log('obj makre',marketData)
          if (Array.isArray(objMarket?.data)) {
            if (objMarket?.data[0]) {
              if (objMarket?.type == '1') {
                this.marketArray = objMarket?.data[0]?.marketArr;
                this.gameRound = objMarket?.data[0];
                // this.notifyParent.emit({
                //   key: 'roundId',
                //   value: this.gameRound?.roundId,
                // });
                this.toggle.setBalloonEvents({
                  key: 'roundId',
                  value: this.gameRound?.roundId,
                });
                this.gameRound.marketArr = this.marketArray
                  ? this.marketArray
                  : objMarket?.data[0]?.marketArr;
                this.handleEventResponse(objMarket, 0);
              }
            }
          } else {
            this.handleEventResponse(objMarket, 0);
          }
          if (this.gameRound) {
            if (this.previousRound != this.gameRound.roundId) {
              if (this.previousRound) {
                setTimeout(() => {
                  this.getBalance();
                }, 4300);
              }
              this.previousRound = this.gameRound.roundId;
              // this.notifyParent.emit({ key: 'newRound', value: '' });
              this.toggle.setBalloonEvents({
                key: 'newRound',
                value: '',
              });
              localStorage.setItem('roundID', this.gameRound.roundId);
              // this.getBalance();
              // console.log('confiton',this.getRoundId != this.gameRound.roundId || this.getRoundId == '')
              // console.log('previousRound',this.previousRound)
              // console.log('gameRound round id',this.gameRound.roundId)
              this.getResults();
            }
          }
        }
      });
  }
  ngOnDestroy(): void {
    let message = {
      type: '2',
      id: '',
    };
    this.encyDecy.sendMessageToSocket(message);
    this.subscription.unsubscribe();
  }

  toggleAutoModal() {
    this.toggle.setAutoPlay(!this.autoPlayState);
  }

  ngAfterViewInit(): void {
    this.initializeGame();
    const canvasContainer = document.querySelector('.canvas-container');
    const canvas = document.querySelector('canvas');
    canvasContainer?.appendChild(canvas as Node);
  }

  initializeGame(): void {
    // Set screen dimensions based on device width

    let screenWidth;
    let screenHeight;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // console.log('width', width, 'height', height);

    // screenWidth = width;
    // screenHeight = height;
    switch (true) {
      case width < 600:
        screenWidth = width - 10;
        screenHeight = height - 100;
        break;
      case width < 781:
        screenWidth = width - 10;
        screenHeight = 520;
        break;
      case width < 825:
        screenWidth = width - 10;
        screenHeight = 520;
        break;
      case width === 1024 && height === 1366:
        screenWidth = 950;
        screenHeight = 520;
        break;
      case width === 1024 && height === 600:
        screenWidth = width - 74;
        screenHeight = 520;
        break;
      case width < 1000:
        screenWidth = width - 10;
        screenHeight = 520;
        break;
      case width < 1025:
        screenWidth = width - 10;
        screenHeight = 520;
        break;
      default:
        screenWidth = 950;
        screenHeight = 520;
        break;
    }

    const phaserGameContainer =
      this.phaserContainer.nativeElement.querySelector('.phaser-game');

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: screenWidth,
      height: screenHeight,
      parent: phaserGameContainer,

      banner: false,
      pixelArt: false,

      render: {
        antialias: true,
      },
      scene: [
        MusicScene,
        backgroundScene,
        spaceScene,
        aviatorScene,
        baloonScene,
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
    };

    // Initialize the Phaser Game instance with the calculated config
    this.game = new Phaser.Game(config);
    this.game.scene?.start('MusicScene');
    this.game.scene?.start('backgroundScene');
    this.game.scene?.start('spaceScene');
    this.game.scene?.start('aviatorScene');
    this.game.scene?.start('baloonScene');
    this.game.scene?.bringToTop('baloonScene');

    this.applyCanvasStyles();
  }

  applyCanvasStyles(): void {
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.border = '0px solid transparent';
        canvas.style.borderRadius = '12px';
        canvas.style.boxSizing = 'border-box';
        if (this.ipadProState || this.nestHubState) {
          canvas.style.margin = '37px';
        } else {
          canvas.style.margin = '5px';
        }
      }
    }, 100);
  }

  autoPlay() {
    this.autoPlayState = !this.autoPlayState;
    if (this.autoPlayState) {
      setTimeout(() => {
        this.autoPlayState = false;
      }, 3000);
    }
  }

  getBetHistoryModalState() {
    this.toggle.getBetHistoryModalState().subscribe((val: boolean) => {
      this.betHistoryModalState = val;
    });
  }
  getResultStream() {
    this.networkService.getaviatorResultList().subscribe((data: any) => {
      this.results = data;
    });
  }

  getBgSoundState() {
    this.toggle.getSoundState().subscribe((val: boolean) => {
      this.bgSoundState = val;
      if (this.bgSoundState) {
        this.turnOnSounds();
      } else {
        this.turnOffSounds();
      }
    });
  }

  fireSoundStart() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.balloonFireStart === 'function') {
      musicSceneRef.balloonFireStart();
    }
  }

  fireSoundStop() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.balloonFireStop === 'function') {
      musicSceneRef.balloonFireStop();
    }
  }

  autoCashOutSoundStart() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.autoCashOutSoundStart === 'function'
    ) {
      musicSceneRef.autoCashOutSoundStart();
    }
  }
  autoCashOutSoundStop() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.autoCashOutSoundStop === 'function'
    ) {
      musicSceneRef.autoCashOutSoundStop();
    }
  }
  turnOffSounds() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.stopSound === 'function') {
      musicSceneRef.stopSound();
    }
  }
  turnOnSounds() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.playSound === 'function') {
      musicSceneRef.playSound();
    }
  }
  playAutoCashOutSound() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.autoCashOutSoundStart === 'function'
    ) {
      musicSceneRef.autoCashOutSoundStart();
    }
  }
  stopAutoCashOutSound() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.autoCashOutSoundStop === 'function'
    ) {
      musicSceneRef.autoCashOutSoundStop();
    }
  }
  playMusic() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.playMusic === 'function') {
      musicSceneRef.playMusic();
    }
  }
  stopMusic() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.stopMusic === 'function') {
      musicSceneRef.stopMusic();
    }
  }
  playCashOutSound() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.playCashOutSound === 'function') {
      musicSceneRef.playCashOutSound();
    }
  }

  playWinSoundAfterCashOut() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (musicSceneRef && typeof musicSceneRef.playWinSound === 'function') {
      musicSceneRef.playWinSound();
    }
  }

  balloonHeatUpSoundStart() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.balloonHeatUpSoundStart === 'function'
    ) {
      musicSceneRef.balloonHeatUpSoundStart();
    }
  }
  balloonHeatUpSoundStop() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.balloonHeatUpSoundStop === 'function'
    ) {
      musicSceneRef.balloonHeatUpSoundStop();
    }
  }
  getPlacedBets() {
    this.toggle.getAllBets().subscribe((item: any) => {
      this.AllBets = item;
      if (this.AllBets?.length == 0) {
        const betTopPortion = document.getElementById('betTopPortion');
        if (betTopPortion) {
          betTopPortion.focus();
        }
      }
      this.placedBets = this.AllBets;

      if (this.placedBets?.length > 0) {
        this.placedBets?.sort((a: any, b: any) => b.stake - a.stake);
        let nextImageNumber = 1;
        const imageMapping: any = {};
        this.placedBets.forEach((bet: any) => {
          if (!imageMapping[bet.userName]) {
            imageMapping[bet.userName] = nextImageNumber;
            nextImageNumber++;
          }
          bet.imageNumber = imageMapping[bet.userName];
        });
      }
    });
  }
  // getCashOutBets() {
  //   this.toggle.getAllBets().subscribe((item: any) => {
  //     this.AllBets = item;
  //     if (this.AllBets?.length == 0) {
  //       const betTopPortion = document.getElementById('betTopPortion');
  //       if (betTopPortion) {
  //         betTopPortion.focus();
  //       }
  //     }
  //     this.cashOutBets = (this.AllBets || []).filter(
  //       (bet: any) => bet.cashOut > 0
  //     );

  //     if (this.cashOutBets?.length > 0) {
  //       this.cashOutBets?.sort((a: any, b: any) => b.stake - a.stake);
  //       let nextImageNumber = 1;
  //       const imageMapping: any = {};
  //       this.cashOutBets.forEach((bet: any) => {
  //         if (!imageMapping[bet.userName]) {
  //           imageMapping[bet.userName] = nextImageNumber;
  //           nextImageNumber++;
  //         }
  //         bet.imageNumber = imageMapping[bet.userName];
  //       });
  //       console.log('cashout', this.placedBets);
  //     }
  //   });
  // }
  playBalloonCrashSound() {
    const musicSceneRef = this.game?.scene?.getScene(
      'MusicScene'
    ) as MusicScene;
    if (
      musicSceneRef &&
      typeof musicSceneRef.blastBalloonSound === 'function'
    ) {
      musicSceneRef.blastBalloonSound();
    }
  }

  balloonFlewAway() {
    const balloonScene = this.game?.scene?.getScene(
      'baloonScene'
    ) as baloonScene;
    if (balloonScene && typeof balloonScene.blastBalloon === 'function') {
      balloonScene.blastBalloon();
    }
  }
  resetBackground() {
    const backgroundScenes = this.game?.scene?.getScene(
      'backgroundScene'
    ) as backgroundScene;
    if (backgroundScenes && typeof backgroundScenes.reset === 'function') {
      backgroundScenes.reset();
    }
  }

  resetBalloonPosition() {
    const balloonScene = this.game?.scene?.getScene(
      'baloonScene'
    ) as baloonScene;
    if (balloonScene && typeof balloonScene.resetBalloon === 'function') {
      balloonScene.resetBalloon();
    }
  }
  resetAviatorScene() {
    const aviatorSceneRef = this.game?.scene?.getScene(
      'aviatorScene'
    ) as aviatorScene;
    if (aviatorSceneRef && typeof aviatorSceneRef.reset === 'function') {
      aviatorSceneRef.reset();
    }
  }
  resetSpaceScene() {
    const spaceSceneRef = this.game?.scene?.getScene(
      'spaceScene'
    ) as spaceScene;
    if (spaceSceneRef && typeof spaceSceneRef.reset === 'function') {
      spaceSceneRef.reset();
    }
  }

  animateSunRays() {
    const balloonScene = this.game?.scene?.getScene(
      'baloonScene'
    ) as baloonScene;
    if (balloonScene && typeof balloonScene.animateSunRays === 'function') {
      balloonScene.animateSunRays();
    }
  }
  togglePlList() {
    this.plListState = !this.plListState;
  }

  detectIpadProScreen() {
    if (window.innerWidth === 1024 && window.innerHeight === 1366) {
      this.ipadProState = true;
    } else {
      this.ipadProState = false;
    }
  }

  detectNestHubScreen() {
    if (window.innerWidth === 1024 && window.innerHeight === 600) {
      this.nestHubState = true;
    } else {
      this.nestHubState = false;
    }
  }
  updateBgMusic(event: any) {
    if (event) {
      this.bgMusicState = true;
      localStorage.setItem('bgMusic', 'play');
      this.playMusic();
    } else {
      localStorage.setItem('bgMusic', 'mute');
      this.bgMusicState = false;
      this.stopMusic();
    }
  }

  toggleMusic() {
    if (!this.bgMusicState) {
      this.bgMusicState = true;
      localStorage.setItem('bgMusic', 'play');
      this.playMusic();
    } else {
      localStorage.setItem('bgMusic', 'mute');
      this.bgMusicState = false;
      this.stopMusic();
    }
  }
  toggleBetHistoryModal() {
    this.betHistoryModalState = !this.betHistoryModalState;
  }

  handleEventResponse(objMarket: any, index: any) {
    if (Array.isArray(objMarket)) {
      objMarket.forEach((objMarketRes: any) => {
        this.marketObjManager(objMarketRes);
        return;
      });
    } else {
      let objMarketRes = objMarket;
      this.marketObjManager(objMarketRes);
      return;
    }
  }

  marketObjManager(objMarket: any) {
    if (objMarket) {
      if (objMarket.type == '1') {
        if ('data' in objMarket && this.counter == 0) {
          this.marketArray = objMarket.data.marketArr;
          this.gameRound = this.marketArray ? this.marketArray : objMarket.data;
          this.gameRound = objMarket.data;
          this.counter = 1;
        } else {
          if ('roundId' in objMarket) {
            // this.notifyParent.emit({
            //   key: 'roundId',
            //   value: objMarket?.roundId,
            // });
            this.toggle.setBalloonEvents({
              key: 'roundId',
              value: objMarket?.roundId,
            });
            this.gameRound.roundId = objMarket?.roundId;
          }
          if ('marketArr' in objMarket?.data) {
            if (Array.isArray(objMarket?.data?.marketArr)) {
              this.gameRound.marketArr = objMarket?.data?.marketArr;
            }
          }
          if ('betId' in objMarket.data) {
            this.updateBetsArray(objMarket.data);
          }
          if ('multiplier' in objMarket.data) {
            // this.notifyParent.emit({
            //   key: 'multiplier',
            //   value: objMarket.data.multiplier,
            // });
            this.toggle.setBalloonEvents({
              key: 'multiplier',
              value: objMarket.data.multiplier,
            });
            this.multiplier = objMarket.data.multiplier;

            if (!this.currentState) {
              this.statusManagement('RUN');
            }
          }
          if ('seconds' in objMarket.data) {
            this.timeLeft = objMarket.data.seconds;
            if (objMarket.data.seconds) {
              // this.notifyParent.emit({
              //   key: 'betplace',
              //   value: objMarket.data.multiplier,
              // });
              this.toggle.setBalloonEvents({
                key: 'betplace',
                value: objMarket.data.multiplier,
              });
            }
            if (!this.currentState) {
              this.statusManagement('WAIT');
            }
          }
          if ('status' in objMarket.data) {
            this.statusManagement(objMarket.data.status);
          }
        }
      }
      if (objMarket.type == '3') {
        this.userCount = objMarket?.user_count;
        this.networkService.setUserCount(this.userCount);
      }
    }
  }
  statusManagement(status: any) {
    if (status == 'RUN') {
      this.play();
      this.waitingState = false;
      this.currentState = status;
      this.plStateTimer = setTimeout(() => {
        this.plStateColorBlack = false;
        this.plStateTimer = null;
      }, 5000);
      // this.notifyParent.emit({ key: 'RUN', value: '' });
      this.toggle.setBalloonEvents({ key: 'RUN', value: '' });
      this.multiplier = '1.00';
    }
    if (status == 'BLAST') {
      setTimeout(() => {
        this.waitingState = true;
      }, 2000);
      this.plStateColorBlack = true;
      // this.notifyParent.emit({ key: 'BLAST', value: '' });
      this.toggle.setBalloonEvents({ key: 'BLAST', value: '' });

      this.crash();
      setTimeout(() => {
        this.AllBets = JSON.parse(JSON.stringify([]));
        this.toggle.setAllBets(this.AllBets);
      }, 4000);
    }
    if (status == 'WAIT') {
      this.waitingState = true;
      this.plStateColorBlack = true;
      // this.waitingState = true;
      this.reset();
      this.toggle.setBalloonEvents({ key: 'WAIT', value: '' });

      // this.notifyParent.emit({ key: 'WAIT', value: '' });
    }
  }
  getBalance() {
    // this.networkService.getAllRecordsByPost(CONFIG.getUserBalanceURL, {})
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.meta.status == true) {
    //         let availBalance = (data.data.bankBalance - data.data.exposure).toFixed(2)
    //         $('.userTotalBalance').text(availBalance);
    //         // $('.userTotalExposure').text(data.data.exposure);
    //         // let ex = data.data.exposure.toLocaleString('en-US', {style: 'currency', currency: 'USD', symbol: ''});
    //         // ex = ex.substring(1)
    //         // $('.userTotalExposure').text(ex);
    //       }
    //     },
    //     error => {
    //       let responseData = error;
    //     });

    window.parent.postMessage('getBalance', '*');
  }
  removeBetArr(betId: any) {
    this.AllBets = this.AllBets.filter((item: any) => item.betId !== betId);
  }
  updateBetsArray(newBet: any) {
    let betFound = false;

    if (this.AllBets?.length === 0) {
      this.AllBets.push(newBet);
    } else {
      for (let i = 0; i < this.AllBets?.length; i++) {
        if (this.AllBets[i].betId === newBet.betId) {
          for (let key in newBet) {
            if (newBet.hasOwnProperty(key)) {
              if (key === 'nation' || key !== 'nation') {
                this.AllBets[i][key] = newBet[key];
              }
            }
          }
          betFound = true;
          break;
        }
      }

      if (!betFound) {
        this.AllBets?.push(newBet);
      }
    }
    this.toggle.setAllBets(this.AllBets);
  }

  // Main Functions are here

  play() {
    this.balloonHeatUpSoundStart();
    this.fireSoundStart();
    const balloonScene = this.game?.scene?.getScene(
      'baloonScene'
    ) as baloonScene;
    if (balloonScene && typeof balloonScene.fireStart === 'function') {
      balloonScene.fireStart();
    }

    const backgroundScenes = this.game?.scene?.getScene(
      'backgroundScene'
    ) as backgroundScene;
    if (
      backgroundScenes &&
      typeof backgroundScenes.startScrolling === 'function'
    ) {
      backgroundScenes.startScrolling();
    }

    const aviatorSceneRef = this.game?.scene?.getScene(
      'aviatorScene'
    ) as aviatorScene;
    if (aviatorSceneRef && typeof aviatorSceneRef.startPlane === 'function') {
      aviatorSceneRef.startPlane();
    }

    const spaceSceneRef = this.game?.scene?.getScene(
      'spaceScene'
    ) as spaceScene;
    if (spaceSceneRef && typeof spaceSceneRef.startMoon === 'function') {
      spaceSceneRef.startMoon();
    }
  }

  stopFly() {
    this.fireSoundStop();
    const balloonScene = this.game?.scene?.getScene(
      'baloonScene'
    ) as baloonScene;
    if (balloonScene && typeof balloonScene.fireStop === 'function') {
      balloonScene.fireStop();
    }

    const backgroundScenes = this.game?.scene?.getScene(
      'backgroundScene'
    ) as backgroundScene;
    if (
      backgroundScenes &&
      typeof backgroundScenes.stopScrolling === 'function'
    ) {
      backgroundScenes.stopScrolling();
    }

    // const aviatorSceneRef = this.game?.scene?.getScene(
    //   'aviatorScene'
    // ) as aviatorScene;
    // if (aviatorSceneRef && typeof aviatorSceneRef.stopPlane === 'function') {
    //   aviatorSceneRef.stopPlane();
    // }
    const spaceSceneRef = this.game?.scene?.getScene(
      'spaceScene'
    ) as spaceScene;
    if (spaceSceneRef && typeof spaceSceneRef.stopMoon === 'function') {
      spaceSceneRef.stopMoon();
    }
  }

  crash() {
    this.isBalloonCrashed = true;
    this.stopFly();
    this.balloonFlewAway();
    this.playBalloonCrashSound();
    setTimeout(() => {
      this.reset();
    }, 2000);
  }
  reset() {
    this.isBalloonCrashed = false;
    this.multiplier = '1.00';

    this.stopFly();
    this.resetBalloonPosition();
    this.resetBackground();
    this.resetAviatorScene();
    this.resetSpaceScene();
  }
  cashOut() {
    this.stopFly();
    this.isBetCashOut = true;
    this.animateSunRays();
    this.balloonFlewAway();
    this.playCashOutSound();
    setTimeout(() => {
      this.reset();
      this.playWinSoundAfterCashOut();
      this.isBetCashOut = false;
    }, 2000);
  }
  getResults() {
    this.networkService
      .getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.networkService.updateaviatorResultList(data.data);
        },
        (error: any) => {
          let responseData = error;
        }
      );
  }

  handleCashOutEvent(event: any) {
    if (true) {
      this.animateSunRays();
      this.playCashOutSound();
    }
  }
}
