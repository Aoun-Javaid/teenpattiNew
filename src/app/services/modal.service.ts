import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  betsDetailsModal = new Subject<any>();
  chatRulesModal = new Subject<any>();
  casinoResultModal = new Subject<any>();
  chatDetailsModal= new Subject<any>();

  constructor() { }

  getBetsDetailModals() {
    return this.betsDetailsModal;
  }

  setBetsDetailModals(val: any) {
    this.betsDetailsModal.next(val);
  }

  getChatRulesModal() {
    return this.chatRulesModal;
  }

  setChatRulesModal(val: any) {
    this.chatRulesModal.next(val);
  }

  getChatDetailsModal() {
    return this.chatDetailsModal;
  }

  setChatDetailsModal(val: any) {
    this.chatDetailsModal.next(val);
  }


  getCasinoResulttModal() {
    return this.casinoResultModal;
  }

  setCasinoResultModal(val: any) {
    this.casinoResultModal.next(val);
  }
}
