import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-provably-fair-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provably-fair-details.component.html',
  styleUrl: './provably-fair-details.component.css',
})
export class ProvablyFairDetailsComponent implements OnInit {
  provablyFairDetailState: boolean = false;
  bet = {
    color: '#34B4FF',
    betResult: '5102.92',
    roundId: '6130186',
    time: new Date('1970-01-01T10:39:07'),
  };
  constructor(private toggle: ToggleService, private el: ElementRef) {}

  ngOnInit(): void {
    this.getProvablyFairDetailState();
  }

  getProvablyFairDetailState() {
    this.toggle
      .getProvablyFairDetails()
      .subscribe((val: boolean) => (this.provablyFairDetailState = val));
  }

  closeProvablyFairsDetail() {
    this.toggle.setProvablyFairDetails(false);
  }

  openProvablyFairModal() {
    setTimeout(() => {
      this.toggle.setProvablyFairModalState(true);
      this.toggle.setProvablyFairDetails(false);
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.provablyFairDetailState
    ) {
      this.toggle.setProvablyFairDetails(false);
    }
  }
}
