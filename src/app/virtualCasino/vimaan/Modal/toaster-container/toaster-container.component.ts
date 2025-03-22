import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { ToasterComponent } from '../toaster/toaster.component';

import { NgClass, NgStyle } from '@angular/common';
import { toasterEvent } from '../../../../services/interface/toastEvents';
import { ToasterService } from '../../../../services/toaster.service';

@Component({
  selector: 'app-toaster-container',
  standalone: true,
  imports: [ToasterComponent, NgClass, NgStyle],
  templateUrl: './toaster-container.component.html',
  styleUrl: './toaster-container.component.css',
})
export class ToasterContainerComponent implements OnInit {
  currentToasts: toasterEvent[] = [];
  private toastTimers = new Map<number, any>();

  constructor(
    private toasterService: ToasterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toasterService.toastEvents.subscribe((toasts) => {
      const currentToast: toasterEvent = {
        Type: toasts.Type,
        Message: toasts.Message,
        betMultiVal: toasts.betMultiVal,
        cashOutVal: toasts.cashOutVal,
        id: toasts.id,
      };
      this.currentToasts.push(currentToast);
      this.setTimerForToast(currentToast.id);
      this.cdr.detectChanges();
    });
  }

  dispose(toastId: number) {
    const index = this.currentToasts.findIndex((toast) => toast.id === toastId);
    if (index !== -1) {
      this.currentToasts.splice(index, 1);
      clearTimeout(this.toastTimers.get(toastId));
      this.toastTimers.delete(toastId);
      this.cdr.detectChanges();
    }
  }
  setTimerForToast(toastId: number) {
    const timer = setTimeout(() => {
      this.dispose(toastId);
    }, 8000);
    this.toastTimers.set(toastId, timer);
  }
}
