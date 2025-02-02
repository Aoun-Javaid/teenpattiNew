import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { BetListingEventService } from '../../services/bet-listing-event.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { NetworkService } from '../../services/network.service';

declare var $: any;

@Component({
  selector: 'app-betslips',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './betslip.component.html',
  styleUrl: './betslip.component.css'
})
export class BetslipComponent {
  selectedAmount: any;
  priceDisable: boolean = false;
  @Input() item: any = [];
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEventPlaceBet = new EventEmitter<string>();
  @Output() valueEventPlaceBet = new EventEmitter<any>();

  private lowerUpperArry = [{
    increment: 0.01,
    lowerBound: 1.01,
    upperBound: 2
  }, {
    increment: 0.02,
    lowerBound: 2,
    upperBound: 3
  }, {
    increment: 0.05,
    lowerBound: 3,
    upperBound: 4
  }, {
    increment: 0.1,
    lowerBound: 4,
    upperBound: 6
  }, {
    increment: 0.2,
    lowerBound: 6,
    upperBound: 10
  }, {
    increment: 0.5,
    lowerBound: 10,
    upperBound: 20
  }, {
    increment: 1,
    lowerBound: 20,
    upperBound: 30
  }, {
    increment: 2,
    lowerBound: 30,
    upperBound: 50
  }, {
    increment: 5,
    lowerBound: 50,
    upperBound: 100
  }, {
    increment: 10,
    lowerBound: 100,
    upperBound: 1000
  }];

  betStakes: any;
  betslipRecord: any;
  isDesktop: any;

  pathName:any;

  constructor(private networkService: NetworkService, private indexedDb: IndexedDbService,
    private toaster: ToastrService, private deviceService: DeviceDetectorService, private betListingEventService: BetListingEventService, private router: Router) {
    this.isDesktop = this.deviceService.isDesktop();

    this.pathName = window?.location?.pathname;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
      } else if (event instanceof NavigationEnd) {
        this.pathName = window?.location?.pathname;
      } else if (event instanceof NavigationError) {
      }
    });

  }

  ngOnInit(): void {
    this.item;
    setTimeout(() => {
      this.getBetStake();
    }, 10);
  }



  //  ngAfterViewInit() {
  //   document?.getElementById("betAmount")?.focus();
  // }

  setStake(amount: any) {
    this.selectedAmount = amount;

    this.valueEventPlaceBet.emit(amount);
  }


  plusStake(Amount: any) {
    // this.item.selectedAmount?this.item.selectedAmount=this.item.selectedAmount+1:this.item.selectedAmount=100;
    if (this.item.maxValue < (Amount * 2)) {
      this.selectedAmount = Math.round(this.item.maxValue);
    }
    else {
      this.selectedAmount = Math.round(Amount * 2)
    }
    this.valueEventPlaceBet.emit(this.selectedAmount);

  }

  minusStake(Amount: any) {
    // this.item.selectedAmount?this.item.selectedAmount>100?this.item.selectedAmount=this.item.selectedAmount-1:this.item.selectedAmount=100:this.item.selectedAmount=100;


    if (this.item.minValue > (Amount / 2)) {
      this.selectedAmount = Math.round(this.item.minValue);
    }
    else {
      this.selectedAmount = Math.round(Amount / 2);
    }
    this.valueEventPlaceBet.emit(this.selectedAmount);

  }

  cancelBet() {
    this.item = null;
    this.newItemEvent.emit('');
  }

  inputAmount(value: any) {
    this.selectedAmount = value.target.value;
    this.valueEventPlaceBet.emit(value.target.value);
  }

  getBetStake() {
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {

      if (res?.data && res?.data !== null) {
        this.betStakes = res?.data?.stake;
      }
      else {
        if (!this.betStakes || this.betStakes.length < 1 || this.betStakes == undefined) {
          this.betStakes = STACK_VALUE;
          let data1 = {
            data: {
              stake: STACK_VALUE
            }

          }
          this.indexedDb.createRecord(path, data1).subscribe((res: any) => {
          });
        }
      }


    })
    // this.betStakes = this.networkService.getBetStakes();
  }

  upValue() {

    if (this.item.type == 'FANCY' || this.item.type == 'BOOKMAKER') {
      return;
    }

    if (!this.item.price) {
      return
    }

    let c = this.item.price;

    var increment = 0;

    if (c >= this.lowerUpperArry[9].upperBound) {
      increment = this.lowerUpperArry[9].increment;
    }
    for (var b = 0; b < this.lowerUpperArry.length; b++) {
      if ((c >= this.lowerUpperArry[b]["lowerBound"]) && (c < this.lowerUpperArry[b]["upperBound"])) {
        increment = this.lowerUpperArry[b].increment;
      }
    }

    let newVal = Number(this.item.price) + increment;
    this.item.price = newVal.toFixed(2);

    let emitObj = {
      stake: this.selectedAmount,
      price: this.item.price
    }
    this.valueEventPlaceBet.emit(emitObj);
    // this.inputAmount({target:{
    //   value:this.item.price
    // }})
    // this.updateStack(this.stackModal)
  }


  downValue() {

    if (this.item.type == 'FANCY' || this.item.type == 'BOOKMAKER') {
      return;
    }

    if (!this.item.price) {
      return
    }
    let c = this.item.price;
    var increment: any;
    if (c >= this.lowerUpperArry[9].upperBound) {
      increment = this.lowerUpperArry[9]
    }
    for (var b = 0; b < this.lowerUpperArry.length; b++) {
      if ((c > this.lowerUpperArry[b]["lowerBound"]) && (c <= this.lowerUpperArry[b]["upperBound"])) {
        increment = this.lowerUpperArry[b].increment;
      }
    }

    if (this.item.price <= 1.01) {
      this.item.price = this.item.price;
    } else {
      let newVal = Number(this.item.price) - increment;
      this.item.price = newVal.toFixed(2);
    }
    let emitObj = {
      stake: this.selectedAmount,
      price: this.item.price
    }
    this.valueEventPlaceBet.emit(emitObj);
    // this.inputAmount({target:{
    //   value:this.item.price
    // }})

  }

  placeCasinoBet() {
    let data = {}


    if (this.item.eventId == '99.0049' || this.item.eventId == '99.0040') {
      data = {
        marketId: this.item.marketId,
        selectionId: this.item.selectionId,
        selected: this.item.selected,
        stake: this.selectedAmount,
        eventId: this.item.eventId,
        flag: this.item.betType
      };
    }
    else if(this.item.eventId == '99.0059' ){
      data = {
        roundId: this.item.roundId,
        selectionId: this.item.selectionId,
        stake: this.selectedAmount,
        eventId: this.item.eventId,
        optionType: this.item.optionType
      };
    }
    else {
      data = {
        marketId: this.item.marketId,
        selectionId: this.item.selectionId,
        stake: this.selectedAmount,
        eventId: this.item.eventId,
        flag: this.item.betType
      };
    }

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
        (res: any) => {
          if (res?.meta?.status == true) {


            this.toaster.success(res.meta.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 800,
            });

            $('.btn-placebet').prop('disabled', false);
            this.afterPlaceBet();
            // this.getAllMarketProfitLoss();

            // this.getBalance();
          }
          else {
            $('.btn-placebet').prop('disabled', false);
            // this.afterPlaceBet();
            if (res?.meta.status == false) {
              this.toaster.error(res.meta.message);
              this.cancelBet();
            } else {
              this.toaster.error("Something went wrong please try again.");
            }
          }

          var pl = res.pl;


        },
        error => {
          //let statusError = error;
          $('.btn-placebet').prop('disabled', false);
          //this.afterPlaceBet();
          // if (error?.error.meta.status == false) {
          //   this.toaster.error(error.error.meta.message);
          //   this.cancelBet();
          // } else {
          //   this.toaster.error("Something went wrong please try again.");
          // }
          let responseData = error.error;
          if (responseData.meta) {
            this.cancelBet();
            let errorObject = responseData.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                this.toaster.error(errorObject[key].message, '', {

                });
                return;
              }
            } else {
              this.toaster.error(errorObject, '', {

              });
              return;
            }

          } else {
            this.toaster.error('Hey, looks like something went wrong.', '', {

            });
            return;
          }
        });
  }

  afterPlaceBet() {
    this.betListingEventService.setEventObject(this.item)
    this.item = null;
    this.newItemEventPlaceBet.emit('');
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
          }
        },
        error => {
          let responseData = error;
        });
  }


}
