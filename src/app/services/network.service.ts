import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable, Subject } from 'rxjs';
import { CONFIG } from '../../../config';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private eventData = new Subject<string>();
  private resultObj = new Subject<any>();
  private resultData = new Subject<string>();
  private betPlaceObj = new Subject<any>();

  constructor(private http: HttpClient) { }

  getAllRecordsByPost(url: any, params: any) {
    return this.http.post<any>(url, params)
      .pipe(map(data => {
        return data;
      }));
  }

  getBalance() {
    this.getAllRecordsByPost(CONFIG.userBalance, {})
      .pipe(first())
      .subscribe(
        data => {

          if (data.meta.status == true) {
            let availBalance = (data.data.balance - data.data.exposure).toFixed(2)
            $('.userTotalBalance').text(availBalance);
            $('.userTotalExposure').text(data.data.exposure);
          }
        },
        error => {
          let responseData = error;
        });
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
    return this.resultObj
  }
  setBetPlace(betObj: any) {
    this.betPlaceObj.next(betObj);
  }
  getBetPlace() {
    return this.betPlaceObj
  }
  getvideoStreamURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.videoStreamURL, { eventId })
  }
  getRulesOfMarketURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getRulesOfMarketURL, { eventId })
  }
  public getResultstream(): Observable<any> {
    return this.resultData.asObservable();
  }

  public updateResultstream(message: any): void {
    this.resultData.next(message);
  }
  getCasinoPLURL(eventId: any): Observable<any> {
    return this.http.post(CONFIG.getAllMarketplURL, { eventId })
  }
}
