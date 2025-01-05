import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  betsDetailsModal: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() { }

  getBetsDetailModals() {
    return this.betsDetailsModal;
  }

  setBetsDetailModals(val: any) {
    this.betsDetailsModal.next(val);
  }
}
