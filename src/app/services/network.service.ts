import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { CONFIG } from '../../../config';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

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
}
