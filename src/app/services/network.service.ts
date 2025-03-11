import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first, map, Observable, Subject } from 'rxjs';
import { CONFIG } from '../../../config';
declare var $: any;
@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private eventData = new Subject<string>();
  private resultObj = new Subject<any>();
  private resultData: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  private betPlaceObj = new Subject<any>();

  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router
  ) {}

  getAllRecordsByPost(url: any, params: any) {
    return this.http.post<any>(url, params).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getBalance() {
    this.getAllRecordsByPost(CONFIG.userBalance, {})
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.meta.status == true) {
            let availBalance = (data.data.balance - data.data.exposure).toFixed(
              2
            );
            $('.userTotalBalance').text(availBalance);
            $('.userTotalExposure').text(data.data.exposure);
          }
        },
        (error) => {
          let responseData = error;
        }
      );
  }
  public updateRoundId(message: any): void {
    this.eventData.next(message);
  }
  public getRoundId(): Observable<any> {
    return this.eventData.asObservable();
  }
  setResultData(betObj: any) {
    this.resultObj.next(betObj);
  }
  getResultData() {
    return this.resultObj;
  }
  setBetPlace(betObj: any) {
    this.betPlaceObj.next(betObj);
  }
  getBetPlace() {
    return this.betPlaceObj;
  }
  getvideoStreamURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.videoStreamURL, { eventId });
  }
  getRulesOfMarketURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getRulesOfMarketURL, { eventId });
  }
  public getResultstream(): Observable<any> {
    return this.resultData.asObservable();
  }

  public updateResultstream(message: any): void {
    this.resultData.next(message);
  }
  getCasinoPLURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getAllMarketplURL, { eventId });
  }
  placeBet(item: any) {
    // this.showLoading();

    var token = localStorage.getItem('token');
    if (!token) {
      this.toaster.error('Log In first', '', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom-toast',
      });
      // this.router.navigate(['/login']);
      return;
    }

    let apiUrl: any;
    if (item.eventId.startsWith('99.')) {
      apiUrl = CONFIG.asianCasinoPlacebetURL;
    }
    if (item.eventId.startsWith('88.')) {
      apiUrl = CONFIG.virtualCasinoPlacebetURL;
    }
    let data;
    if (item.eventId == '99.0049' || item.eventId == '99.0040') {
      data = {
        marketId: item.marketId,
        selectionId: item.selectionId,
        selected: item.selected,
        stake: item.stake,
        eventId: item.eventId,
        flag: item.betType,
      };
    } else if (item.eventId == '99.0059') {
      data = {
        roundId: item.roundId,
        selectionId: item.selectionId,
        stake: item.stake,
        eventId: item.eventId,
        optionType: item.optionType,
      };
    } else {
      data = {
        marketId: item.marketId,
        selectionId: item.selectionId,
        stake: item.stake,
        eventId: item.eventId,
        flag: item.betType,
      };
    }

    this.getAllRecordsByPost(apiUrl, data)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res?.meta?.status == true) {
            item.stake = item.stake;
            item.betSuccess = true;
            this.setBetPlace(item);
            this.toaster.success(res.meta.message, '', {
              positionClass: 'toast-top-center',
              toastClass: 'ngx-toastr custom-toast success',
            });

            this.getBalance();
          } else {
            if (res?.meta.status == false) {
              this.toaster.error(res.meta.message, '', {
                positionClass: 'toast-top-center',
                toastClass: 'ngx-toastr custom-toast',
              });
              this.cancelBet(item);
            } else {
              this.toaster.error('Something went wrong please try again.', '', {
                positionClass: 'toast-top-center',
                toastClass: 'ngx-toastr custom-toast',
              });
            }
          }

          var pl = res.pl;
          // this.selectedOptionType = '1';
        },
        (error) => {
          // this.selectedOptionType = '1';
          this.cancelBet(item);

          let responseData = error.error;
          this.ErrorNotification_Manager(responseData);
        }
      );
  }
  cancelBet(item: any) {
    item.betSuccess = false;
    this.setBetPlace(item);
  }
  ErrorNotification_Manager(responseData: any) {
    if (responseData.meta) {
      let errorObject = responseData.meta.message;
      if (typeof errorObject === 'object') {
        for (var key of Object.keys(errorObject)) {
          this.toaster.error(errorObject[key].message, '', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom-toast',
          });
          return;
        }
      } else {
        this.toaster.error(errorObject, '', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom-toast',
        });
        return;
      }
    } else {
      this.toaster.error('Something went wrong please try again.', '', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom-toast',
      });
      return;
    }
  }

  // goToMarketCurrent(eventid: any) {
  //   localStorage.setItem('eventId', eventid);
  //   if (eventid == '99.0010') {
  //     let url = '/Nteenpatti';
  //     this.router.navigateByUrl(url);
  //     return;
  //   } else if (eventid == '88.0011') {
  //     let url = '/Vteenpatti';
  //     this.router.navigateByUrl(url);
  //     return;
  //   } else if (eventid == '99.0018') {
  //     let url = '/Ndt';
  //     this.router.navigateByUrl(url);
  //     return;
  //   } else {
  //     let url = '/home';
  //     this.router.navigateByUrl(url);
  //   }
  // }

  goToMarketCurrent(eventid: string) {
    localStorage.setItem('eventId', eventid);
    const eventRoutes: { [key: string]: string } = {
      '99.0010': '/Nteenpatti',
      '88.0011': '/Vteenpatti',
      '99.0018': '/Ndt',
    };

    const matchedRoute = eventRoutes[eventid];
    this.router.navigateByUrl(matchedRoute ? matchedRoute : '/home');
  }
}
