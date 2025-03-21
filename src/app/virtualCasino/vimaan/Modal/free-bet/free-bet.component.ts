import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';

@Component({
  selector: 'app-free-bet',
  standalone: true,
  imports: [NgClass],
  templateUrl: './free-bet.component.html',
  styleUrl: './free-bet.component.css',
})
export class FreeBetComponent implements OnInit {
  freeBetModalState: boolean = false;

  constructor(private toggle: ToggleService, private el: ElementRef) {}
  ngOnInit(): void {
    this.getFreeBetModalState();
  }

  getFreeBetModalState() {
    this.toggle.getFreeBetModalState().subscribe((val: boolean) => {
      this.freeBetModalState = val;
    });
  }
  closeFreeBetModal() {
    this.toggle.setFreeBetModalState(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.freeBetModalState
    ) {
      this.closeFreeBetModal();
    }
  }
}
