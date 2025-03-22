import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { toasterEvent } from './interface/toastEvents';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  toastEvents: Observable<toasterEvent>;
  private _toastEvents = new Subject<toasterEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  private generateId(): number {
    return Date.now() + Math.random();
  }
  showSuccess(cashOutAmount: string, betMultiValue: string) {
    this._toastEvents.next({
      Message: '',
      Type: 'Success',
      cashOutVal: cashOutAmount,
      betMultiVal: betMultiValue,
      id: this.generateId(),
    });
  }

  showSuccessMsg(message: string) {
    this._toastEvents.next({
      Message: message,
      Type: 'SuccessMsg',
      cashOutVal: '',
      betMultiVal: '',
      id: this.generateId(),
    });
  }

  // showWarning(message: string, cashOutAmount: string, betMultiValue: string) {
  //   this._toastEvents.next({
  //     Message: message,
  //     Type: 'Warning',
  //     cashOutVal: cashOutAmount,
  //     betMultiVal: betMultiValue,
  // id: this.generateId(),

  //   });
  // }

  showError(message: string) {
    this._toastEvents.next({
      Message: message,
      Type: 'Error',
      cashOutVal: '',
      betMultiVal: '',
      id: this.generateId(),
    });
  }
}
