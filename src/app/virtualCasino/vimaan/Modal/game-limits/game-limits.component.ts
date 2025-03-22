import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';

@Component({
  selector: 'app-game-limits',
  standalone: true,
  imports: [NgClass],
  templateUrl: './game-limits.component.html',
  styleUrl: './game-limits.component.css',
})
export class GameLimitsComponent implements OnInit {
  gameLimitState: boolean = false;

  constructor(private toggle: ToggleService, private el: ElementRef) {}
  ngOnInit(): void {
    this.getGameLimitModalState();
  }

  getGameLimitModalState() {
    this.toggle.getGameLimitState().subscribe((val: boolean) => {
      this.gameLimitState = val;
    });
  }

  closeGameLimitModal() {
    this.toggle.setGameLimitModalState(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target) && this.gameLimitState) {
      this.closeGameLimitModal();
    }
  }
}
