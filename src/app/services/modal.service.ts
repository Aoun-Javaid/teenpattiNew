import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  betsDetailsModal = new Subject<any>();

  constructor() { }

  getBetsDetailModals() {
    return this.betsDetailsModal;
  }

  setBetsDetailModals(val: any) {
    this.betsDetailsModal.next(val);
  }
}
