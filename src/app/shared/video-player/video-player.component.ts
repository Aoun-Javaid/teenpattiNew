import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CasinoSocketService } from '../../services/casino-socket.service';
import { NetworkService } from '../../services/network.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CountdownConfig } from 'ngx-countdown';
import * as confetti from 'canvas-confetti';

declare var T20RTCPlayer: any;
declare var $: any;

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass, NgIf, NgFor, CarouselModule, NgStyle],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
})
export class VideoPlayerComponent {
  @Input() eventId: any;
  raceCards: any = [];
  ballbyBallStream: any;
  showBanner: any = false;
  Cards = [
    {
      card: 'C2_',

    },
    {
      card: 'C3_',

    },
    {
      card: 'C4_',

    },
    {
      card: 'C5_',

    },
    {
      card: 'C6_',

    },
    {
      card: 'C7_',

    },


  ];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    stagePadding: 0,

    responsive: {
      0: {
        items: 4
      },
      300: {
        items: 6
      },
      400: {
        items: 7
      },
      550: {
        items: 8
      },
      740: {
        items: 9
      },
      940: {
        items: 12
      }
    },
    nav: true
  }

  @ViewChild('videoElement') videoElement!: ElementRef;

  @Input() resultDeclared: any;
  eventid: any;
  myVideo: any = null;
  placedbet = true;
  rulesBox: any;
  selectedResult: any;
  resultArray: any;
  totalMatchedBets: any;
  game: any = {};
  playerACards: any;
  playerBCards: any;
  timer: any;
  status: any;
  streamingName: any;
  streamingURl: any;
  Card: any;
  DragonCards: any;
  TigerCards: any;
  LoinCards: any;

  BANKER: any;
  PLAYER: any;

  PLAYER8: any = [];
  PLAYER9: any = [];
  PLAYER10: any = [];
  PLAYER11: any = [];
  ActiveCardCountPlayer = '';
  cardCount = {
    "PLAYER_8": 8,
    "PLAYER_9": 9,
    "PLAYER_10": 10,
    "PLAYER_11": 11
  };

  cardCountLH: any = {
    "LOW": 0,
    "HIGH": 0,
  };
  Card_1: any;
  Card_2: any;
  Card_3: any;
  boardCards: any;

  Q1: any;
  Q2: any;
  Q3: any;
  Q4: any;
  Q5: any;


  timerLeft: any;
  TIME_LIMIT = 0;
  timerInterval: any;

  // Initially, no time has passed, but this will count up
  // and subtract from the TIME_LIMIT
  timePassed = 0;
  timeLeft = 0;
  // config: CountdownConfig ;
  config: CountdownConfig = {
    formatDate: ({ date }) => `${date / 1000}`,
  };
  progressSec: string | undefined;
  public casinoFlag = 1;
  AmarAkbarCard: any;
  ANDAR_CARDS: any;
  BAHAR_CARDS: any;
  AndarBahirResult: any;
  hasAndarBahir: boolean | undefined;
  hasAndarBahirRoute: boolean | undefined;
  HIGH: any;
  LOW: any;
  SPREAD: any;



  customOptions1: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    pullDrag: false,
    dots: false,
    margin: 2,
    startPosition: 0,
    navSpeed: 700,
    navText: [' < ', ' > '],
    responsive: {
      0: {
        items: 4,
      },
      400: {
        items: 4,
      },
      740: {
        items: 4,
      },
      1366: {
        items: 4,
      },
    },
    nav: true,
  };

  customOptions2: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    pullDrag: false,
    dots: false,
    margin: 2,
    navSpeed: 700,
    navText: [' < ', ' > '],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      1366: {
        items: 3,
      },
    },
    nav: true,
  };
  instantWorlieCard: any;
  DEALER: any;
  JOKER: any;
  FIGHTER_A: any;
  FIGHTER_B: any;
  isDesktop: boolean;

  constructor(private networkService: NetworkService,
    private route: ActivatedRoute,
    private casinoService: CasinoSocketService,
    private deviceService: DeviceDetectorService
  ) {
    this.eventid = this.route.snapshot.params['id'];
    this.isDesktop = this.deviceService.isDesktop();

  }
  ngAfterViewInit(): void {
    // const videoHeight = this.videoElement.nativeElement.videoHeight;
    // console.log('Video height:', videoHeight);

  }

  handleCountDown(event: any) {
  }

  ngOnInit(): void {
    // this.surpriseFireWork()
    // this.surprise()
    if (this.eventId != '99.0062') {
      this.getStreaming();
      this.autoRun();
    }
    this.networkService.getResultData().subscribe(data => {

      this.resultDeclared = data;

      // console.log(this.resultDeclared)

    });
    this.networkService.getRoundId().subscribe(data => {

      this.game = data;


      if (this.game?.status == "SUSPEND") {
        this.TIME_LIMIT = 0;
        this.timePassed = 0;
        this.timeLeft = 0;
        this.casinoFlag = 1;
        this.casinoService.setTimelimit(0);
        window.clearInterval(this.timerInterval);

      }
      if (this.game?.status == "ONLINE") {
        if (this.game && this.casinoFlag == 1) {
          this.casinoFlag = 2;
          this.TIME_LIMIT = this.game?.seconds;
          this.casinoService.setTimelimit(this.TIME_LIMIT);
          if (this.TIME_LIMIT) {
            this.timeLeft = this.TIME_LIMIT;

            this.timerInterval = setInterval(() => {

              this.timeLeft = this.timeLeft - 1;
              if (this.TIME_LIMIT) {
                document.documentElement.style.setProperty('--timerValue', this.TIME_LIMIT.toString() + 's');
              }

              this.timerLeft = this.formatTimeLeft(this.timeLeft);
              // console.log("hyeeeee", this.timerLeft, " pass", this.timePassed)
              if (this.timeLeft == 0) {
                window.clearInterval(this.timerInterval);
              }

              if (this.timeLeft == 0 || this.timeLeft < 0) {
                this.timeLeft = 0;
                this.casinoFlag = 1;
                window.clearInterval(this.timerInterval);
              }

            }, 1000);
          }
        }
        // console.log("timer", this.TIME_LIMIT)
      }
      if (this.game?.eventId == '99.0062' && this.game?.status == 'SUSPEND') {
        if (!this.showBanner) {//false
          setTimeout(() => {
            this.showBanner = true;
          }, this.game?.cardsArr?.duration * 1000);
        }
        var element1 = document.getElementById('videoBallByball') as HTMLVideoElement;

        if (element1) {
          element1.muted = true;
          // element1.play();
        }

        if (!element1?.muted) {


          const intervalId = setInterval(() => {
            const element = document.getElementById('videoBallByball') as HTMLVideoElement;
            if (element) {
              element.muted = true;
              if (element.muted) {
                clearInterval(intervalId);
              }
            }
          }, 10);
        }

      }
      else if (this.game.eventId == '99.0062' && this.game.status != 'SUSPEND') {
        this.showBanner = false;
      }
      if (!data) {
        this.TIME_LIMIT = 0;
        this.timePassed = 0;
        this.timeLeft = 0;
        this.casinoFlag = 1;
        this.casinoService.setTimelimit(0);
        window.clearInterval(this.timerInterval);
      }
      let CK, DK, HK, SK;
      if (data?.cardsArr) {
        ({ CK, DK, HK, SK } = data.cardsArr);
      } else {
        CK = DK = HK = SK = null;
      }
      const { ANDAR_CARDS, BAHAR_CARDS } = data?.cardsArr || { ANDAR_CARDS: null, BAHAR_CARDS: null };;
      const arrayOfArrays = [CK, DK, HK, SK];
      if (this.eventid == '99.0046' || this.eventid == '99.0047' || this.eventid == '99.0048') {

        const maxLengthArray = this.getMaxLengthArray(arrayOfArrays);
        this.raceCards = maxLengthArray;
      }

      this.Card = this.game?.cardsArr?.card;
      this.instantWorlieCard = this.game?.cardsArr?.cards;


      this.Card_1 = this.game?.cardsArr?.card_1;
      this.Card_2 = this.game?.cardsArr?.card_2;
      this.Card_3 = this.game?.cardsArr?.card_3;

      this.playerACards = this.game?.cardsArr?.PLAYER_A;
      this.playerBCards = this.game?.cardsArr?.PLAYER_B;
      this.JOKER = this.game?.cardsArr?.JOKER;
      this.boardCards = this.game?.cardsArr?.BOARD;

      this.DragonCards = this.game?.cardsArr?.DRAGON;
      this.TigerCards = this.game?.cardsArr?.TIGER;
      this.LoinCards = this.game?.cardsArr?.LION;


      this.AmarAkbarCard = this.game?.cardsArr?.card;

      this.BANKER = this.game?.cardsArr?.BANKER;
      this.PLAYER = this.game?.cardsArr?.PLAYER;
      this.DEALER = this.game?.cardsArr?.DEALER;

      if (this.game.cardsArr?.url) {
        const currentOrigin = window.location.origin;
        this.game.cardsArr.url = this.game.cardsArr.url.replace('{$domain}', currentOrigin);

        // this.game.cardsArr.url = this.game.cardsArr.url.replace('{$domain}', 'https://casino.fancy22.com');
        if (this.ballbyBallStream != this.game.cardsArr.url) {
          this.ballbyBallStream = this.game.cardsArr.url;
          // this.ballbyBallStream = 'https://casino.fancy22.com/api/users/images/ballbyball-2024889380422.mp4';
        }
      }

      this.PLAYER8 = this.game?.cardsArr?.PLAYER_8;
      this.PLAYER9 = this.game?.cardsArr?.PLAYER_9;
      this.PLAYER10 = this.game?.cardsArr?.PLAYER_10;
      this.PLAYER11 = this.game?.cardsArr?.PLAYER_11;


      this.FIGHTER_A = this.game?.cardsArr?.FIGHTER_A;
      this.FIGHTER_B = this.game?.cardsArr?.FIGHTER_B;

      this.Q1 = this.game?.cardsArr?.Q1;
      this.Q2 = this.game?.cardsArr?.Q2;
      this.Q3 = this.game?.cardsArr?.Q3;
      this.Q4 = this.game?.cardsArr?.Q4;
      this.Q5 = this.game?.cardsArr?.Q5;

      if (this.eventId !== '99.0055') {
        this.detectChanges(this.game?.cardCount, this.cardCount);

      }
      this.cardCount = this.game?.cardCount;




      this.HIGH = this.game?.cardsArr?.HIGH;
      // console.log(this.HIGH,'high');
      // console.log(this.LOW,'low');

      this.LOW = this.game?.cardsArr?.LOW;
      // console.log(this.LOW,'lowlowlow');

      this.SPREAD = this.game?.cardsArr?.SPREAD;

      // this.detectChanges(this.game?.cardCount, this.cardCountLH);
      this.cardCountLH.LOW = this.game?.cardCount?.LOW;
      // console.log(this.cardCountLH.LOW,'cardcountLOW');

      this.cardCountLH.HIGH = this.game?.cardCount?.HIGH;
      // console.log(this.cardCountLH.HIGH,'cardcountHigh');

      this.detectChanges(this.game?.cardCount, this.cardCount);
      this.cardCount = this.game?.cardCount;

      // console.log('card count',this.cardCount)
      this.timer = this.game?.leftSec;


      this.ANDAR_CARDS = ANDAR_CARDS;
      this.BAHAR_CARDS = BAHAR_CARDS;
      // debugger

      this.AndarBahirResult = this.game?.cardScan?.RESULT;

      if (this.ANDAR_CARDS?.length !== 0 && this.BAHAR_CARDS !== 0 && this.hasAndarBahirRoute) {
        this.hasAndarBahir = true;
      } else {
        this.hasAndarBahir = false;
      }

    });

  }


  getMaxLengthArray(arrayOfArrays: any) {
    let currentMaxLength = 0;
    let maxLengthArray = [];

    for (const array of arrayOfArrays) {
      const arrayLength = array?.length;

      if (arrayLength > currentMaxLength) {
        currentMaxLength = arrayLength;
        maxLengthArray = array;
      }
    }

    return maxLengthArray;
  }


  getStreaming() {
    if (this.eventid == "99.0062") {
      return
    }
    var webrtcPlayer = null;
    setTimeout(() => {
      this.networkService.getvideoStreamURL(this.eventid).subscribe((res: any) => {

        this.streamingName = res?.data?.streamingName;
        this.streamingURl = res?.data?.url;
        if (this.streamingName && this.streamingURl && this.streamingName != 'lowbalance') {
          webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "", this.streamingURl, "", true, true, "tcp");
          webrtcPlayer.Play();
        }
        else {
          return
        }

        // webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "", this.streamingURl, "", true, true, "tcp");
        // // webrtcPlayer = new T20RTCPlayer("remoteVideo", this.streamingName, "","strikexch.live", "", true, true, "tcp");
        // // webrtcPlayer = new T20RTCPlayer("remoteVideo", "2020teenpatti-1", "", "strikexch.live", "", true, true, "tcp");
        // webrtcPlayer?.Play();
      });
    }, 100);
  }

  autoRun() {
    if (this.eventid == "99.0062") {
      return
    }
    this.myVideo = document.getElementById('remoteVideo');
    // Not all browsers return promise from .play().
    const playPromise = this.myVideo?.play() || Promise.reject('');
    playPromise.then(() => {
      // Video could be autoplayed, do nothing.
    }).catch(() => {
      // Video couldn't be autoplayed because of autoplay policy. Mute it and play.
      if (this.myVideo) {
        this.myVideo.muted = true;
        this.myVideo.play();
      }
    });

  }



  loadRules() {

    this.networkService.getRulesOfMarketURL(this.eventid).subscribe((res: any) => {
      this.rulesBox = res.data.rules;
      const el = document.createElement('div');

      el.innerHTML = this.rulesBox;
      const box = document.getElementById('rulesBoxContainer');
      $('#rulesBoxContainer').empty();
      box?.appendChild(el);
    })
  }


  myVal: number = 0;



  formatTimeLeft(time: any) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    var seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = parseInt(`0${seconds}`);
    }

    // The output in MM:SS format
    return seconds;
  }

  ngOnDestroy() {
    window.clearInterval(this.timerInterval)
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  public surprise(): void {
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    var particleCount = 50
    const myCanvas = document.getElementById('my-canvas') as HTMLCanvasElement;
    const myConfetti = confetti.create(myCanvas, {
      resize: true, // will fit all screen sizes
      useWorker: true
    });

    myConfetti({
      particleCount: 700,
      spread: 100,
      origin: { y: 0.5 }
      // any other options from the global
      // confetti function
    });


  }

  detectChanges(newCardCount: Record<string, number>, oldCardCount: Record<string, number>) {
    if (!newCardCount || !oldCardCount) {
      return;
    }
    for (const key in newCardCount) {
      if (newCardCount.hasOwnProperty(key) && oldCardCount.hasOwnProperty(key)) {
        if (newCardCount[key] !== oldCardCount[key]) {
          this.ActiveCardCountPlayer = key;
          if (newCardCount['PLAYER_8'] == 8) {
            this.ActiveCardCountPlayer = '';
          }
          // console.log(`Property ${key} has changed from ${oldCardCount[key]} to ${newCardCount[key]}`);
        }
      }
    }
  }
  surpriseFireWork() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 20, spread: 360, ticks: 500, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    const myCanvas = document.getElementById('my-canvas') as HTMLCanvasElement;
    const myConfetti = confetti.create(myCanvas, {
      resize: true, // will fit all screen sizes
      useWorker: true
    });

    var interval: any = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 100 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }


}
