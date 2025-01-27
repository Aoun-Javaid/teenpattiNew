import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionhandlerService {

  constructor() { }

  private showDatePicker: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(false);

  getSection(): BehaviorSubject<any | null> {
    return this.showDatePicker;
  }

  setSection(value: any | null): void {
    this.showDatePicker.next(value);
  }
}
