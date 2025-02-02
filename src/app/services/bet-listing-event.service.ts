import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetListingEventService {

  private eventObj: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor() { }

  getEventObject(): BehaviorSubject<any | null> {
    return this.eventObj;
  }

  setEventObject(obj: any | null): void {
    this.eventObj.next(obj);
  }
}
