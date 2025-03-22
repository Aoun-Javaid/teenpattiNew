import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { VimaanGameComponent } from '../vimaan-game/vimaan-game.component';
import { BetHistoryComponent } from '../Modal/bet-history/bet-history.component';
import { first } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NetworkService } from '../../../services/network.service';
import { IndexedDbService } from '../../../services/indexed-db.service';
import { ToggleService } from '../../../services/toggle.service';
import { ToastrService } from 'ngx-toastr';
import { CONFIG, STACK_VALUE } from '../../../../../config';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    VimaanGameComponent,
    BetHistoryComponent,
    FormsModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  isBetPlacedBtn1: boolean = false;
  isBetPlacedBtn2: boolean = false;
  isBetPlacedBtn3: boolean = false;
  isBetPlacedBtn4: boolean = false;

  isRoundStarted: boolean = false;
  isAutoCashOut: boolean = false;
  selectedTab: string = 'allBets';
  selectedTopCat: string = 'hugeWins';
  viewType: string = 'Day';
  previousHandState: boolean = false;
  cashAmount: string = '1.93';
  AllBets: any = [];
  editable: boolean = false;
  selectedStake: any;
  selectedStake2: any;
  bggrayTransform: string = 'translateX(0px)';
  viewTypeActive: string = 'translateX(0px)';
  selectedBtn1: string = 'bet';
  selectedBtn2: string = 'bet';
  bgMusicState: boolean = true;

  gameSoundState: boolean = true;
  animationState: boolean = true;
  ipadProState: boolean = false;
  nestHubState: boolean = false;
  betHistoryModalState: boolean = false;

  counter: number = 1.0;
  userCount = 0;
  myBets = [];
  stakeIndex: any;
  stakeIndex2: any;
  topMultipliers = [];

  biggestWins = [];

  hugeWins = [];
  currentState: any;
  activeBets = [];

  results: any = [];
  first50bets: any = [];
  isMobile: boolean = false;
  constructor(
    private networkService: NetworkService,
    private indexedDb: IndexedDbService,
    private toggle: ToggleService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getAutoCashoutMultiplier();
    this.resetVariables();
    setTimeout(() => {
      this.getBetStake();
    }, 10);
    if (window.innerWidth <= 768) {
      this.isMobile = true;
      setTimeout(() => {
        this.setMarketScrollHeight();
      }, 100);
    } else {
      this.isMobile = false;
    }
    this.toggle.getAllBets().subscribe((item: any) => {
      this.AllBets = item;
      if (this.AllBets?.length == 0) {
        const betTopPortion = document.getElementById('betTopPortion');
        if (betTopPortion) {
          betTopPortion.focus();
        }
      }
      this.first50bets = this.AllBets?.slice(0, 50);
      if (this.first50bets?.length > 0) {
        this.first50bets?.sort((a: any, b: any) => b.stake - a.stake);
        this.addingImages();
      }
    });
    this.networkService.getUserCout().subscribe((res: any) => {
      this.userCount = res;
    });
    this.getResultStream();
    this.getRoundStartState();
    this.detectIpadProScreen();
    this.detectNestHubScreen();
    this.getBgMusicState();
    this.getGameSoundState();
    this.getGameAnimationState();
    this.getBetHistoryModalState();
  }
  getAutoCashoutMultiplier() {
    this.networkService
      .getAllRecordsByPost(CONFIG.getAutoCashoutMultiplier, {})
      .subscribe((data: any) => {
        // console.log('',data)
        if (data.data) {
          data.data.forEach((element: any) => {
            this.autoCashOut[element.cashOutSelection].value =
              element.cashOutAtMultiplier;
          });
        }
      });
  }
  setAutoCashoutMultiplier() {
    let req = [
      {
        cashOutSelection: '1',
        cashOutAtMultiplier: this.autoCashOut[1].value,
      },
      {
        cashOutSelection: '2',
        cashOutAtMultiplier: this.autoCashOut[2].value,
      },
      {
        cashOutSelection: '3',
        cashOutAtMultiplier: this.autoCashOut[3].value,
      },
      {
        cashOutSelection: '4',
        cashOutAtMultiplier: this.autoCashOut[4].value,
      },
    ];

    this.networkService
      .getAllRecordsByPost(CONFIG.setAutoCashoutMultiplier, {
        autoCashOutArr: req,
      })
      .subscribe((data: any) => {
        // console.log('',data)
      });
  }
  addingImages() {
    let nextImageNumber = 1;
    const imageMapping: any = {};
    this.first50bets.forEach((bet: any) => {
      if (!imageMapping[bet.userName]) {
        imageMapping[bet.userName] = nextImageNumber;
        nextImageNumber++;
      }
      bet.imageNumber = imageMapping[bet.userName];
    });
    // console.log('50bets',this.first50bets)
  }
  detectIpadProScreen() {
    if (window.innerWidth === 1024 && window.innerHeight === 1366) {
      this.ipadProState = true;
    } else {
      this.ipadProState = false;
    }
  }
  getResultStream() {
    this.networkService.getaviatorResultList().subscribe((data: any) => {
      this.results = data;
    });
  }
  multiplier: number = 1.0;
  eventId: any;
  roundId: any;
  betValue1: number = 100.0;
  betValue2: number = 100.0;
  lastBetValue1: number = 0;
  lastBetValue2: number = 0;
  flexRow: boolean = true;
  currentStatus: any;
  bet: boolean = false;
  betObj: any = [];
  cashoutObj: any = [];
  activetab: any = [];
  mybets: any = [];
  autoCashOut: any = [
    {
      active: false,
      value: '',
      betplaced: false,
    },
    {
      active: false,
      value: '1.10',
      betplaced: false,
    },
    {
      active: false,
      value: '1.10',
      betplaced: false,
    },
    {
      active: false,
      value: '1.10',
      betplaced: false,
    },
    {
      active: false,
      value: '1.10',
      betplaced: false,
    },
  ];
  betStakes: any;

  status: any = '';

  // {"marketId":76478303,"stake":100,"eventId":"88.0022"}
  getBetStake() {
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {
      if (res?.data && res?.data !== null) {
        this.betStakes = res?.data?.stake;
      } else {
        if (
          !this.betStakes ||
          this.betStakes.length < 1 ||
          this.betStakes == undefined
        ) {
          this.betStakes = STACK_VALUE;
          let data1 = {
            data: {
              stake: STACK_VALUE,
            },
          };
          this.indexedDb.createRecord(path, data1).subscribe((res: any) => {});
        }
      }
      // this.betStakes = this.betStakes.slice(0, 4);
    });
  }
  increment(section: number): void {
    if (section === 1) {
      this.betValue1 = +(this.betValue1 + 10).toFixed(2);
    } else if (section === 2) {
      this.betValue2 = +(this.betValue2 + 10).toFixed(2);
    }
  }

  decrement(section: number): void {
    if (section === 1 && this.betValue1 > 100) {
      this.betValue1 = +(this.betValue1 - 10).toFixed(2);
    } else if (section === 2 && this.betValue2 > 100) {
      this.betValue2 = +(this.betValue2 - 10).toFixed(2);
    }
  }

  setBetValue(section: number, value: any): void {
    this.selectedStake = value;
    value = parseFloat(value);

    if (this.cashoutObj[section] || this.betObj[section]) {
      return;
    }
    if (section === 1) {
      if (this.lastBetValue1 !== value) {
        this.betValue1 = value;
        this.lastBetValue1 = value;
      } else {
        this.betValue1 = +(this.betValue1 + value).toFixed(2);
      }
    } else if (section === 2) {
      if (this.lastBetValue2 !== value) {
        this.betValue2 = value;
        this.lastBetValue2 = value;
      } else {
        this.betValue2 = +(this.betValue2 + value).toFixed(2);
      }
    }
  }
  ManualInputValue(event: any, index: any) {
    // Parse the input value and convert it to a float, ensuring it has two decimal places
    let value = parseFloat(parseFloat(event.target.value).toFixed(2));

    // Check if the value is a valid number (not NaN) and assign it accordingly
    if (!isNaN(value)) {
      if (index === '1') {
        this.betValue1 = value;
      } else {
        this.betValue2 = value;
      }
    }
    // else {

    //   if (index === '1') {
    //     this.betValue1 = 100;
    //   } else {
    //     this.betValue2 = 100;
    //   }
    // }
  }
  autobetBlur(index: any) {
    this.autoCashOut[index].value = parseFloat(
      this.autoCashOut[index].value
    ).toFixed(2);

    this.setAutoCashoutMultiplier();
  }

  tab(direction: 'bet' | 'auto', index: any) {
    if (direction === 'bet') {
      this.activetab[index] = false;
    }
    if (direction === 'auto') {
      this.activetab[index] = true;
    }
  }
  validateStakeAmount(index: any): void {
    if (this.betStakes[index].stakeAmount < 10) {
      this.betStakes[index].stakeAmount = 10;
    } else if (this.betStakes[index].stakeAmount > 10000) {
      this.betStakes[index].stakeAmount = 10000;
    }
  }
  activeBet(betNumber: any) {
    if (this.cashoutObj[betNumber]) {
      if (this.currentState == 'WAIT') {
        this.cancelBet(betNumber);
        return;
      }
      this.cashOut(
        this.multiplier,
        this.cashoutObj[betNumber].betId,
        betNumber
      );
    } else {
      if (betNumber === 1) {
        if (!this.selectedStake) {
          this.toaster.error('Please select the stake First.');
          return;
        }
        this.isBetPlacedBtn1 = true;
      }
      if (betNumber === 2) {
        if (!this.selectedStake2 && this.isMobile) {
          this.toaster.error('Please select the stake First.');
          return;
        }
        if (!this.selectedStake && !this.isMobile) {
          this.toaster.error('Please select the stake First.');
          return;
        }
        this.isBetPlacedBtn2 = true;
      }
      if (betNumber === 3) {
        if (!this.selectedStake) {
          this.toaster.error('Please select the stake First.');
          return;
        }
        this.isBetPlacedBtn3 = true;
      }
      if (betNumber === 4) {
        if (!this.selectedStake) {
          this.toaster.error('Please select the stake First.');
          return;
        }
        this.isBetPlacedBtn4 = true;
      }
      if (this.betObj[betNumber]) {
        // console.log('dsa')
        // this.cancelBet(betNumber);
        this.betObj[betNumber] = null;
        this.autoCashOut[betNumber].betplaced = false;
      } else {
        this.autoCashOut[betNumber].betplaced = true;
        if (betNumber == 2 && this.isMobile) {
          this.betObj[betNumber] = this.selectedStake2;
        } else {
          this.betObj[betNumber] = this.selectedStake;
        }

        // this.placeBetManager();
      }
    }
    // this.bet = !this.bet;
  }
  placeBetManager() {
    let req: any = {
      marketId: this.roundId,
      eventId: this.eventId,
      bets: [],
    };

    Object.keys(this.betObj).forEach((key) => {
      if (this.betObj[key]) {
        // this.placeBet(this.betObj[key], key);
        req.bets.push({
          stake: parseFloat(this.betObj[key]),
          cashIn: parseInt(key),
        });
        this.betObj[key] = false;
      }
    });
    if (req.bets.length != 0) {
      this.placeBetAll(req);
    }
    // setTimeout(() => {
    //   if (this.betObj[2]) {
    //     this.placeBet(this.betObj[2], 2);
    //     this.betObj[2] = false;
    //   }
    // }, 2000);
  }
  async autoCashOutManager(multiplier: any) {
    const indices = [1, 2, 3, 4]; // Add more indices if needed
    let req: any = {
      marketId: this.roundId,
      eventId: this.eventId,
      bets: [],
    };
    await indices.forEach((i) => {
      const autoCashOut = this.autoCashOut[i];
      if (autoCashOut.active && autoCashOut.betplaced) {
        if (multiplier == autoCashOut.value) {
          // this.cashOut(multiplier, this.cashoutObj[i].betId, i);
          if (this.cashoutObj[i].betId) {
            req.bets.push({
              cashOutAtMultiplier: multiplier,
              betId: this.cashoutObj[i].betId,
              index: i,
            });
            autoCashOut.betplaced = false;
          }
          // autoCashOut.active = false;
        }
      }
    });
    if (req.bets.length != 0) {
      this.cashOutAll(req);
    }
  }
  placeBetAll(req: any) {
    this.networkService
      .getAllRecordsByPost(CONFIG.AviatorPlacebet, req)
      .pipe(first())
      .subscribe(
        (data) => {
          setTimeout(() => {
            this.getBalance();
          }, 1500);

          // this.toaster.success(data.meta.message, '', {});

          // this.betObj[index] = false;
          // if (this.autoCashOut[index].active) {
          //   this.autoCashOut[index].betplaced = true;
          // }
          // this.cashoutObj[index] = data.data;

          data.data.forEach((element: any) => {
            this.mybets.push(element);
            this.betObj[element.orderId] = false;
            if (this.autoCashOut[element.orderId].active) {
              this.autoCashOut[element.orderId].betplaced = true;
            }
            this.cashoutObj[element.orderId] = element;
          });
          // idhr se kam krna hai baki ok.
        },
        (error) => {
          let responseData = error.error;
          if (responseData.meta) {
            let errorObject = responseData.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                // this.toaster.error(errorObject[key].message, '', {

                // });
                this.toaster.error(errorObject[key].message);
                return;
              }
            } else {
              // this.toaster.error(errorObject, '', {

              // });
              this.toaster.error(errorObject);
              return;
            }
          } else {
            this.toaster.error('Hey, looks like something went wrong.');
            // this.toaster.error('Hey, looks like something went wrong.', '', {

            // });
            return;
          }
        }
      );
  }
  placeBet(stake: any, index: any) {
    let req = {
      marketId: this.roundId,
      stake: stake,
      eventId: this.eventId,
      index: index,
    };
    this.networkService
      .getAllRecordsByPost(CONFIG.AviatorPlacebet, req)
      .pipe(first())
      .subscribe(
        (data) => {
          setTimeout(() => {
            this.getBalance();
          }, 1500);

          this.mybets.push(data.data);

          // this.toaster.success(data.meta.message, '', {});
          this.betObj[index] = false;
          if (this.autoCashOut[index].active) {
            this.autoCashOut[index].betplaced = true;
          }
          this.cashoutObj[index] = data.data;
        },
        (error) => {
          let responseData = error.error;
          if (responseData.meta) {
            let errorObject = responseData.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                // this.toaster.error(errorObject[key].message, '', {

                // });
                this.toaster.error(errorObject[key].message);
                return;
              }
            } else {
              // this.toaster.error(errorObject, '', {

              // });
              this.toaster.error(errorObject);
              return;
            }
          } else {
            this.toaster.error('Hey, looks like something went wrong.');
            // this.toaster.error('Hey, looks like something went wrong.', '', {

            // });
            return;
          }
        }
      );
  }

  cashOutAll(req: any) {
    this.networkService
      .getAllRecordsByPost(CONFIG.AviatorcashOut, req)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data && data.data && Array.isArray(data.data)) {
            data.data.forEach((element: any) => {
              this.toaster.success(
                element.cashout.toFixed(2),
                element.cashOutAtMultiplier
              );

              this.mybets = this.mybets.map((item: any) =>
                item.betId === element.betId ? element : item
              );
              this.mybetsManager();

              req.bets.forEach((bet: any) => {
                if (this.cashoutObj[bet.index].betId === element.betId) {
                  this.cashoutObj[bet.index] = false;

                  if (this.autoCashOut[bet.index]) {
                    this.autoCashOut[bet.index].betplaced = false;
                  }
                }
              });
            });

            setTimeout(() => {
              this.getBalance();
            }, 3000);
          } else {
            console.error('Invalid data format:', data);
          }
        },
        (error) => {
          let responseData = error.error;
          if (responseData.meta) {
            let errorObject = responseData.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                // this.toaster.error(errorObject[key].message, '', {

                // });
                this.toaster.error(errorObject[key].message);
                return;
              }
            } else {
              // this.toaster.error(errorObject, '', {

              // });
              this.toaster.error(errorObject);
              return;
            }
          } else {
            this.toaster.error('Hey, looks like something went wrong.');
            // this.toaster.error('Hey, looks like something went wrong.', '', {

            // });
            return;
          }
        }
      );
  }
  playButtonSound() {
    this.toggle.setBtnSoundState(true);
  }
  playCashoutSound() {
    this.toggle.setCashOutSoundState(true);
  }

  cashOut(cashOutAtMultiplier: any, betId: any, index: any) {
    let req: any = {
      marketId: this.roundId,
      eventId: this.eventId,
      bets: [
        {
          betId: betId,
          cashOutAtMultiplier: cashOutAtMultiplier,
        },
      ],
    };
    // let req = {
    //   marketId: this.roundId,
    //   cashOutAtMultiplier: cashOutAtMultiplier,
    //   eventId: this.eventId,
    //   betId: betId,
    // };
    this.networkService
      .getAllRecordsByPost(CONFIG.AviatorcashOut, req)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.canvas.getBalance();
          setTimeout(() => {
            this.getBalance();
          }, 3000);
          this.mybets = this.mybets.map((item: any) => {
            if (item.betId === data.data[0].betId) {
              return data.data[0];
            } else {
              return item;
            }
          });
          this.playCashoutSound();

          this.mybetsManager();
          this.toaster.success(
            data.data[0].cashout.toFixed(2),
            cashOutAtMultiplier
          );
          // this.autoCashOut[index].betplaced=false;
          // this.toaster.success(data.meta.message, 'Earned ' + (data.data.cashout).toFixed(2), {});
          this.cashoutObj[index] = null;
          this.autoCashOut[index].betplaced = false;
        },
        (error) => {
          let responseData = error.error;
          if (responseData.meta) {
            let errorObject = responseData.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                // this.toaster.error(errorObject[key].message, '', {

                // });
                this.toaster.error(errorObject[key].message);
                return;
              }
            } else {
              // this.toaster.error(errorObject, '', {

              // });
              this.toaster.error(errorObject);
              return;
            }
          } else {
            this.toaster.error('Hey, looks like something went wrong.');
            // this.toaster.error('Hey, looks like something went wrong.', '', {

            // });
            return;
          }
        }
      );
  }

  cancelBet(betNumber: any) {
    let req: any;
    req = {
      marketId: this.cashoutObj[betNumber].marketId,
      eventId: this.eventId,
      betId: this.cashoutObj[betNumber].betId,
    };
    this.networkService
      .getAllRecordsByPost(CONFIG.AviatorBetClear, req)
      .pipe(first())
      .subscribe(
        (data) => {
          this.AllBets = this.AllBets.filter(
            (item: any) => item.betId !== this.cashoutObj[betNumber].betId
          );
          this.first50bets = this.AllBets?.slice(0, 50);
          this.toggle.setcancelledBet(this.cashoutObj[betNumber].betId);
          setTimeout(() => {
            this.getBalance();
          }, 1000);

          this.cashoutObj[betNumber] = null;
          this.betObj[betNumber] = null;
          this.autoCashOut[betNumber].betplaced = false;
        },
        (error) => {}
      );

    // this.betObj[index] = null;
  }
  flexState() {
    this.flexRow = !this.flexRow;
  }

  handleNotification(event: any) {
    if (typeof event == 'object') {
      this.status = event.key;
      if (event.key == 'roundId') {
        this.roundId = event.value;
      }
      if (event.key == 'eventId') {
        this.eventId = event.value;
      }
      if (event.key == 'RUN') {
        this.currentState = event.key;
      }
      if (event.key == 'WAIT') {
        this.currentState = event.key;
      }
      if (event.key == 'BLAST') {
        this.currentState = event.key;
        this.cashoutObj[1] = false;
        this.cashoutObj[2] = false;
        this.cashoutObj[3] = false;
        this.cashoutObj[4] = false;
        this.multiplier = 1.0;
        this.resetAutoCashOut();
        this.mybetsManager();
      }
      if (event.key == 'multiplier') {
        this.multiplier = event.value;
        if (
          this.cashoutObj[1] ||
          this.cashoutObj[2] ||
          this.cashoutObj[3] ||
          this.cashoutObj[4]
        ) {
          this.autoCashOutManager(event.value);
        }
      }
      if (event.key == 'betplace') {
        this.placeBetManager();
      }
      if (event.key == 'newRound') {
        // console.log('new round');
        // this.resetVariables();
      }
    }
  }
  mybetsManager() {
    this.toggle.setMyBets(this.mybets);
  }
  clearStakeValue() {
    this.selectedStake = null;
    this.selectedStake2 = null;
    if (this.editable == true) {
      this.betStakes[this.stakeIndex].stakeAmount = '';
    }
  }
  resetVariables() {
    this.betObj = JSON.parse(JSON.stringify([]));
    this.betObj[1] = false;
    this.betObj[2] = false;
    this.cashoutObj[1] = false;
    this.cashoutObj[2] = false;
    this.betObj[3] = false;
    this.betObj[4] = false;
    this.cashoutObj[3] = false;
    this.cashoutObj[4] = false;
    this.multiplier = 1.0;
    this.betValue1 = 100.0;
    this.betValue2 = 100.0;
    this.resetAutoCashOut();
  }
  resetAutoCashOut() {
    this.autoCashOut = [
      {
        active: false,
        value: '',
        betplaced: false,
      },
      {
        active: this.autoCashOut[1].active,
        value: this.autoCashOut[1].value,
        betplaced: false,
      },
      {
        active: this.autoCashOut[2].active,
        value: this.autoCashOut[2].value,
        betplaced: false,
      },
      {
        active: this.autoCashOut[3].active,
        value: this.autoCashOut[3].value,
        betplaced: false,
      },
      {
        active: this.autoCashOut[4].active,
        value: this.autoCashOut[4].value,
        betplaced: false,
      },
    ];
  }
  trackByFn(index: any) {
    return index;
  }
  setMarketScrollHeight() {
    const vimaanHtml = document.getElementById('vimaanHtml');
    if (vimaanHtml) {
      vimaanHtml.style.overflow = 'hidden';
    }
    const marketScrollElement = document.getElementById('marketScroll');
    const windowHeight = window.innerHeight;
    // Adjust the percentage or calculation based on your specific needs.

    let targetHeight;
    targetHeight = Math.floor(windowHeight * 0.61);

    if (marketScrollElement) {
      marketScrollElement.style.height = `${targetHeight}px`;
      // marketScrollElement.style.marginTop = `${margintop}px`;
    }

    try {
      let HaveFooter = localStorage.getItem('footer');
      if (HaveFooter == 'true') {
        const iframeDocument = document;
        const allBetsElements = iframeDocument.querySelectorAll('.allbets');

        allBetsElements.forEach((element) => {
          (element as HTMLElement).style.paddingBottom = '120px';
          // (element as HTMLElement).style.cssText += 'margin-bottom: 100px !important;';
        });
      }
    } catch (error) {
      // console.error('Error accessing parent document:', error);
    }
  }
  detectNestHubScreen() {
    if (window.innerWidth === 1024 && window.innerHeight === 600) {
      this.nestHubState = true;
    } else {
      this.nestHubState = false;
    }
  }

  toggleBtn(type: string, section: number): void {
    if (section === 1) {
      this.selectedBtn1 = type;
    } else if (section === 2) {
      this.selectedBtn2 = type;
    }
  }

  navContentVisible: boolean = false;

  toggleNav(): void {
    this.navContentVisible = !this.navContentVisible;
  }

  selectTab(tabName: string): void {
    this.selectedTab = tabName;

    switch (tabName) {
      case 'allBets':
        this.bggrayTransform = 'translateX(0px)';
        break;
      case 'myBets':
        this.bggrayTransform = 'translateX(100px)';
        break;
      case 'top':
        this.bggrayTransform = 'translateX(200px)';
        break;
      default:
        this.bggrayTransform = 'translateX(0px)';
    }
  }
  getBalance() {
    window.parent.postMessage('getBalance', '*');
  }
  selectViewType(type: string) {
    this.viewType = type;

    switch (type) {
      case 'Day':
        this.viewTypeActive = 'translateX(0px)';
        break;
      case 'Month':
        this.viewTypeActive = 'translateX(100px)';
        break;
      case 'Year':
        this.viewTypeActive = 'translateX(200px)';
        break;
      default:
        this.viewTypeActive = 'translateX(0px)';
    }
  }

  selectTopCat(val: string) {
    this.selectedTopCat = val;
  }

  getBgMusicState() {
    this.toggle.getBgMusicState().subscribe((val: any) => {
      this.bgMusicState = val;
    });
  }

  getBetHistoryModalState() {
    this.toggle.getBetHistoryModalState().subscribe((val: any) => {
      this.betHistoryModalState = val;
    });
  }

  getGameSoundState() {
    this.toggle.getGameSoundState().subscribe((val: any) => {
      this.gameSoundState = val;
    });
  }

  getGameAnimationState() {
    this.toggle.getGameAnimationState().subscribe((val: any) => {
      this.animationState = val;
    });
  }

  toggleMusic(event: any) {
    const isChecked = event.target.checked;
    this.bgMusicState = isChecked;
    this.toggle.setBgMusicState(this.bgMusicState);
  }

  toggleSound(event: any) {
    const isChecked = event.target.checked;
    this.gameSoundState = isChecked;
    this.toggle.setGameSoundState(this.gameSoundState);
  }

  toggleAnimation(event: any) {
    const isChecked = event.target.checked;
    this.animationState = isChecked;
    this.toggle.setGameAnimationState(this.animationState);
  }
  toggleBetHistoryModal() {
    this.toggle.setBetHistoryModalState(!this.betHistoryModalState);
  }
  openHowToPlayModal() {
    setTimeout(() => {
      this.toggle.setHowToPlayModalState(true);
    });
  }

  openDetailedGameRuleModal() {
    setTimeout(() => {
      this.toggle.setDetailedRuleModalState(true);
    });
  }
  openProvablyFairDetailsModal() {
    setTimeout(() => {
      this.toggle.setProvablyFairDetails(true);
    });
  }
  togglePreviousHand() {
    this.previousHandState = !this.previousHandState;
  }
  openFreeBetModal() {
    setTimeout(() => {
      this.toggle.setFreeBetModalState(true);
    });
  }
  openProvablyFairSettings() {
    setTimeout(() => {
      this.toggle.setProvablyFairSettingState(true);
    });
  }
  openMyBetHistoryModal() {
    setTimeout(() => {
      this.toggle.setMyBetHistoryModalState(true);
    });
  }
  openGameLimitsModal() {
    setTimeout(() => {
      this.toggle.setGameLimitModalState(true);
    });
  }

  openChangeAvatarModal() {
    setTimeout(() => {
      this.toggle.setChangeAvatarModalState(true);
    });
  }

  openAutoPlayModal() {
    setTimeout(() => {
      this.toggle.setAutoPlayOptionsModalState(true);
    });
  }
  getRoundStartState() {
    this.toggle.getRoundStartState().subscribe((val: boolean) => {
      this.isRoundStarted = val;
    });
  }

  betCancelBtn1() {
    this.isBetPlacedBtn1 = false;
  }

  betStartBtn2() {
    this.isBetPlacedBtn2 = true;
  }
  betCancelBtn2() {
    this.isBetPlacedBtn2 = false;
  }

  cashOutBtn1() {
    this.isBetPlacedBtn1 = false;
  }

  cashOutBtn2() {
    this.isBetPlacedBtn2 = false;
  }
  toggleAutoCashOut(val: any) {
    const isChecked = val.target.checked;
    this.isAutoCashOut = isChecked;
  }
  toggleAutoPlay(event: any, index: number) {
    const isChecked = event.target.checked;
    if (!isChecked) {
      this.activetab[index] = false;
    }
    if (isChecked) {
      this.activetab[index] = true;
    }
  }
}
