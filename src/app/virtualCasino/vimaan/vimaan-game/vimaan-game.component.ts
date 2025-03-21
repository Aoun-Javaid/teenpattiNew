import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from '../scenes/mainScene';
import { DotGridScene } from '../scenes/dotGridScene';
import { MusicScene } from '../scenes/musicScene';
import { CommonModule } from '@angular/common';


import { first, retry, RetryConfig } from 'rxjs';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { NetworkService } from '../../../services/network.service';
import { ToggleService } from '../../../services/toggle.service';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../../config';

declare var $: any;

@Component({
  selector: 'app-vimaan-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vimaan-game.component.html',
  styleUrls: ['./vimaan-game.component.css'],
})
export class VimaanGameComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter<any>();
  game!: Phaser.Game;
  @ViewChild('phaserContainer', { static: false }) phaserContainer!: ElementRef;
  multiValue: number = 1.89;
  bgMusicState: boolean = true;
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
  public message = {
    type: '1',
    id: '88.0022',
  };
  userCount: any;
  eventid = '88.0022';
  multiplier = '1.00';
  retryConfig: RetryConfig = {
    count: 1000,
  };
  AllBets: any = [];
  currentState: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private encyDecy: EncryptDecryptService,
    private networkService: NetworkService,
    private toggleService: ToggleService,
    private toasterService: ToastrService
  ) {}

  ngOnDestroy(): void {
    let message = {
      type: '2',
      id: '',
    };
    this.encyDecy.sendMessageToSocket(message);
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCashOutBtnSoundState();
    this.getBtnSoundState();
    this.getResults();
    this.getBgMusicState();
    this.getGameAnimationState();
    this.getGameSoundState();
    this.getToasterState();

    // setTimeout(() => {
    //   this.reset();
    // }, 1000);
    this.toggleService.getcancelledBet().subscribe((bet: any) => {
      if (bet) {
        this.removeBetArr(bet);
      }
    });
    this.encyDecy.generateEncryptionKey('', this.message);

    this.subscription = this.encyDecy
      .getMarketData()
      .pipe(retry(this.retryConfig))
      .subscribe((marketData: any) => {
        // this.reset();
        this.notifyParent.emit({ key: 'eventId', value: this.eventid });
        if (marketData) {
          this.getRoundId = localStorage.getItem('roundID');

          let objMarket = JSON.parse(marketData);
          // console.log('obj makre',marketData)
          if (Array.isArray(objMarket?.data)) {
            if (objMarket?.data[0]) {
              if (objMarket?.type == '1') {
                this.marketArray = objMarket?.data[0]?.marketArr;
                this.gameRound = objMarket?.data[0];
                this.notifyParent.emit({
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
              this.notifyParent.emit({ key: 'newRound', value: '' });
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
            this.notifyParent.emit({
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
            this.notifyParent.emit({
              key: 'multiplier',
              value: objMarket.data.multiplier,
            });
            this.multiplier = objMarket.data.multiplier;
            if (objMarket.data.multiplier < 2) {
              this.setTintColor('#34B4FF');
            } else if (
              objMarket.data.multiplier >= 2 &&
              objMarket.data.multiplier <= 10
            ) {
              this.setTintColor('#913EF8');
            } else if (objMarket.data.multiplier > 10) {
              this.setTintColor('#C017B4');
            }

            if (!this.currentState) {
              this.statusManagement('RUN');
            }
          }
          if ('seconds' in objMarket.data) {
            if (objMarket.data.seconds) {
              this.notifyParent.emit({
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
  setTintColor(hexColor: string): void {
    const mainScene = this.game?.scene?.getScene('MainScene') as MainScene;
    if (mainScene && typeof mainScene.setTintColor === 'function') {
      // console.log('color', hexColor);
      mainScene.setTintColor(hexColor);
    }
  }
  getBtnSoundState() {
    this.toggleService.getButtonSoundState().subscribe((val: boolean) => {
      if (val === true) {
        this.playButtonSound();
      }
    });
  }
  getCashOutBtnSoundState() {
    this.toggleService.getCashoutSoundState().subscribe((val: boolean) => {
      if (val === true) {
        this.playCashOutSound();
      }
    });
  }

  statusManagement(status: any) {
    this.currentState = status;
    if (status == 'RUN') {
      this.notifyParent.emit({ key: 'RUN', value: '' });
      this.multiplier = '1.00';
      this.play();
      // this.startPlane();
    }
    if (status == 'BLAST') {
      this.notifyParent.emit({ key: 'BLAST', value: '' });
      // this.stopPlane();
      this.fly();
      setTimeout(() => {
        this.AllBets = JSON.parse(JSON.stringify([]));
        this.toggleService.setAllBets(this.AllBets);
      }, 4000);
    }
    if (status == 'WAIT') {
      this.reset();
      this.notifyParent.emit({ key: 'WAIT', value: '' });
    }
  }

  ngAfterViewInit(): void {
    this.initializeGame();
  }
  getResults() {
    this.networkService
      .getAllRecordsByPost(CONFIG.getCasinoResultURL, { eventId: this.eventid })
      .pipe(first())
      .subscribe(
        (data) => {
          this.networkService.updateaviatorResultList(data.data);
        },
        (error) => {
          let responseData = error;
        }
      );
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

    if (this.AllBets.length === 0) {
      this.AllBets.push(newBet);
    } else {
      for (let i = 0; i < this.AllBets.length; i++) {
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
        this.AllBets.push(newBet);
      }
    }
    this.toggleService.setAllBets(this.AllBets);
  }
  initializeGame(): void {
    // Set screen dimensions based on device width

    let screenWidth;
    let screenHeight;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // console.log(width, 'width', height, 'height');
    // alert(`Width: ${width}, Height: ${height}`);

    switch (true) {
      case width <= 332:
        screenWidth = width - 12;
        screenHeight = 250;
        break;
      case width <= 350:
        screenWidth = width - 12;
        screenHeight = 313;
        break;
      case width <= 360:
        screenWidth = width - 12;
        screenHeight = 256;
        break;
      case width <= 375:
        screenWidth = width - 12;
        screenHeight = 227;
        break;
      case width <= 390:
        screenWidth = width - 12;
        screenHeight = 297;
        break;
      case width <= 412:
        screenWidth = width - 12;
        screenHeight = 326;
        break;
      case width <= 414:
        screenWidth = width - 12;
        screenHeight = 318;
        break;
      case width <= 425:
        screenWidth = width - 12;
        screenHeight = 250;
        break;
      case width <= 480:
        screenWidth = width - 12;
        screenHeight = 333;
        break;
      case width <= 570:
        screenWidth = width - 12;
        screenHeight = 248;
        break;
      case width <= 800:
        screenWidth = width - 12;
        screenHeight = 369;
        break;
      case width <= 840:
        screenWidth = width - 12;
        screenHeight = 432;
        break;
      case width <= 880:
        screenWidth = width - 12;
        screenHeight = 472;
        break;
      case width <= 950:
        screenWidth = width - 12;
        screenHeight = 507;
        break;
      case width === 1110 && window.innerHeight === 650:
        screenWidth = 682;
        screenHeight = 328;
        break;
      case width == 1024 && window.innerHeight == 1366:
        screenWidth = width - 340;
        screenHeight = 1094;
        break;
      case width == 1024:
        screenWidth = width - 340;
        screenHeight = 328;
        break;

      case width == 1280 && window.innerHeight == 800:
        screenWidth = 888;
        screenHeight = 468;
        // screenHeight = 528;
        break;
      case width <= 1330:
        screenWidth = width - 392;
        screenHeight = 468;
        // screenHeight = 528;
        break;
      case width <= 1500:
        // screenWidth = 1008;
        // screenHeight = 520;
        screenWidth = 1008;
        screenHeight = 415;
        break;
      case width <= 1600:
        screenWidth = 1008;
        screenHeight = 445;

        break;
      default:
        screenWidth = width - 440;
        screenHeight = 428;
        //  screenHeight = 628;
        break;
    }
    const phaserGameContainer =
      this.phaserContainer.nativeElement.querySelector('.phaser-game');

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: screenWidth,
      height: screenHeight,
      banner: false,
      parent: phaserGameContainer,
      render: {
        antialias: true,
      },
      scene: [MusicScene, MainScene, DotGridScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };

    // Initialize the Phaser Game instance with the calculated config
    this.game = new Phaser.Game(config);
    this.game.scene?.start('MusicScene');
    this.game.scene?.start('MainScene');
    this.game.scene?.start('DotGridScene');
    this.game.scene?.bringToTop('DotGridScene');
    this.applyCanvasStyles();
  }

  applyCanvasStyles(): void {
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.border = '1px solid #2A2B2E';
        canvas.style.borderRadius = '20px';
        canvas.style.boxSizing = 'border-box';
      }
    }, 100);
  }

  fly() {
    this.toggleService.setRoundStartState(false);
    this.isPlaneOnMove = false;
    this.planeFlewAway = true;
    const mainScene = this.game.scene?.getScene('MainScene') as MainScene;
    const dotGridScene = this.game.scene?.getScene(
      'DotGridScene'
    ) as DotGridScene;

    if (mainScene && typeof mainScene.flyAway === 'function') {
      mainScene.flyAway();
    }
    if (dotGridScene && typeof dotGridScene.fly === 'function') {
      dotGridScene.fly();
    }
    const MusicScene = this.game.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.flyPlane();
    }
  }

  reset() {
    this.toggleService.setRoundStartState(false);
    const mainScene = this.game.scene?.getScene('MainScene') as MainScene;
    const dotGridScene = this.game.scene?.getScene(
      'DotGridScene'
    ) as DotGridScene;

    if (mainScene && typeof mainScene.resetPlanePosition === 'function') {
      mainScene.resetPlanePosition();
    }
    if (dotGridScene && typeof dotGridScene.reset === 'function') {
      dotGridScene.reset();
    }
    this.planeFlewAway = false;
    this.isPlaneOnMove = false;
  }

  play() {
    this.planeFlewAway = false;
    this.toggleService.setRoundStartState(true);
    const mainScene = this.game?.scene?.getScene('MainScene') as MainScene;
    const dotGridScene = this.game?.scene?.getScene(
      'DotGridScene'
    ) as DotGridScene;

    if (mainScene && typeof mainScene.startPlaneAnimation === 'function') {
      mainScene.startPlaneAnimation();
    }
    if (dotGridScene && typeof dotGridScene.play === 'function') {
      dotGridScene.play();
    }
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.planeStart();
    }
    this.isPlaneOnMove = true;
  }

  turnOnMusic() {
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.playMusic();
    }
  }
  turnOffMusic() {
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.stopMusic();
    }
  }

  toggleSound() {
    if (this.bgMusicState) {
      this.toggleService.setBgMusicState(false);
      this.turnOffMusic();
      this.turnOffSOund();
    } else {
      this.toggleService.setBgMusicState(true);
      this.turnOnMusic();
      this.turnOnSound();
    }
  }

  turnOnSound() {
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.playSound();
    }
  }
  turnOffSOund() {
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.stopSound();
    }
  }
  playButtonSound() {
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.playButtonSound();
    }
  }
  playCashOutSound() {
    const MusicScene = this.game?.scene?.getScene('MusicScene') as MusicScene;
    if (MusicScene && MusicScene.scene?.isActive()) {
      MusicScene.playCashOutSound();
    }
  }

  stopAnimation() {
    const mainScene = this.game?.scene?.getScene('MainScene') as MainScene;
    if (mainScene && typeof mainScene.startPlaneAnimation === 'function') {
      mainScene.stopAnimation();
    }
  }

  startAnimation() {
    const mainScene = this.game?.scene?.getScene('MainScene') as MainScene;
    if (mainScene && typeof mainScene.startPlaneAnimation === 'function') {
      mainScene.startAnimation();
    }
  }

  getBgMusicState() {
    this.toggleService.getBgMusicState().subscribe((val: boolean) => {
      this.bgMusicState = val;
      if (this.bgMusicState) {
        this.turnOnMusic();
      } else {
        this.turnOffMusic();
      }
    });
  }

  getGameAnimationState() {
    this.toggleService.getGameAnimationState().subscribe((val: any) => {
      this.gameAnimationState = val;
      if (this.gameAnimationState) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    });
  }

  getGameSoundState() {
    this.toggleService.getGameSoundState().subscribe((val: any) => {
      this.gameSoundState = val;
      if (this.gameSoundState) {
        this.turnOnSound();
      } else {
        this.turnOffSOund();
      }
    });
  }
  getToasterState() {
    this.toggleService.getToasterState().subscribe((val: boolean) => {
      this.toasterState = val;
    });
  }

 
}
