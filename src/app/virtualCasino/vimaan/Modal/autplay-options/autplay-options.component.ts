import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-autplay-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autplay-options.component.html',
  styleUrl: './autplay-options.component.css',
})
export class AutplayOptionsComponent implements OnInit {
  btnClicked: string = '';
  autPlayModalState: boolean = false;
  stopIfCashDecreaseBy: boolean = false;
  stopIfCashIncreaseBy: boolean = false;
  stopIfSingleWinExceeds: boolean = false;
  counter1: number = 0.0;
  counter2: number = 0.0;
  counter3: number = 0.0;

  constructor(private toggle: ToggleService, private el: ElementRef) {}
  ngOnInit(): void {
    this.getAutoPlayModalState();
  }

  getAutoPlayModalState() {
    this.toggle.getAutoPlayOptionsModalState().subscribe((val: boolean) => {
      this.autPlayModalState = val;
    });
  }
  closeAutoPlayModal() {
    this.toggle.setAutoPlayOptionsModalState(false);
  }

  selectedBtn(val: string) {
    this.btnClicked = val;
  }

  toggleStopCashDecreaseBy(val: any) {
    const isChecked = val.target.checked;
    this.stopIfCashDecreaseBy = isChecked;
  }
  toggleStopCashIncreaseBy(val: any) {
    const isChecked = val.target.checked;
    this.stopIfCashIncreaseBy = isChecked;
  }
  toggleStopSingleWinExceeds(val: any) {
    const isChecked = val.target.checked;
    this.stopIfSingleWinExceeds = isChecked;
  }

  incrementBtn1() {
    if (this.counter1 < 1.9) {
      this.counter1 = Math.round((this.counter1 + 0.1) * 10) / 10;
    } else if (this.counter1 === 1.9) {
      this.counter1 = 2.0;
    } else {
      this.counter1 += 0.1;
    }
  }

  decrementBtn1() {
    if (this.counter1 > 0.0) {
      this.counter1 = Math.round((this.counter1 - 0.1) * 10) / 10;
    }
  }

  incrementBtn2() {
    if (this.counter2 < 1.9) {
      this.counter2 = Math.round((this.counter2 + 0.1) * 10) / 10;
    } else if (this.counter2 === 1.9) {
      this.counter2 = 2.0;
    } else {
      this.counter2 += 0.1;
    }
  }

  decrementBtn2() {
    if (this.counter2 > 0.0) {
      this.counter2 = Math.round((this.counter2 - 0.1) * 10) / 10;
    }
  }

  incrementBtn3() {
    if (this.counter3 < 1.9) {
      this.counter3 = Math.round((this.counter3 + 0.1) * 10) / 10;
    } else if (this.counter2 === 1.9) {
      this.counter3 = 2.0;
    } else {
      this.counter3 += 0.1;
    }
  }

  decrementBtn3() {
    if (this.counter3 > 0.0) {
      this.counter3 = Math.round((this.counter3 - 0.1) * 10) / 10;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.autPlayModalState
    ) {
      this.closeAutoPlayModal();
    }
  }
}
