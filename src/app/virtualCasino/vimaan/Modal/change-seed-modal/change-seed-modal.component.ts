import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';

@Component({
  selector: 'app-change-seed-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './change-seed-modal.component.html',
  styleUrl: './change-seed-modal.component.css',
})
export class ChangeSeedModalComponent implements OnInit {
  changeSeedModalState: boolean = true;

  constructor(private toggle: ToggleService, private el: ElementRef) {}

  ngOnInit(): void {
    this.getChangeSeedModalState();
  }

  getChangeSeedModalState() {
    this.toggle.getChangeSeedState().subscribe((val: boolean) => {
      this.changeSeedModalState = val;
    });
  }

  closeChangeSeedModalState() {
    this.toggle.setChangeSeedModalState(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.changeSeedModalState
    ) {
      this.closeChangeSeedModalState();
    }
  }
}
