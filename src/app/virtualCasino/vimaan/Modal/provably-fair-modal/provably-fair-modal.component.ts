import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-provably-fair-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './provably-fair-modal.component.html',
  styleUrl: './provably-fair-modal.component.css',
})
export class ProvablyFairModalComponent implements OnInit {
  provablyFairModalState: boolean = false;
  constructor(private toggle: ToggleService, private el: ElementRef) {}

  ngOnInit(): void {
    this.getProvablyFairModalState();
  }

  getProvablyFairModalState() {
    this.toggle
      .getProvablyFairModalState()
      .subscribe((val: boolean) => (this.provablyFairModalState = val));
  }

  closeProvablyFairsModal() {
    this.toggle.setProvablyFairModalState(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.provablyFairModalState
    ) {
      this.toggle.setProvablyFairModalState(false);
    }
  }
}
