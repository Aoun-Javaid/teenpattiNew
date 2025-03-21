import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';

@Component({
  selector: 'app-how-to-play',
  standalone: true,
  imports: [NgClass],
  templateUrl: './how-to-play.component.html',
  styleUrl: './how-to-play.component.css',
})
export class HowToPlayComponent implements OnInit {
  howToPlayState: boolean = false;
  rulesInfo: any;
  constructor(private toggle: ToggleService, private el: ElementRef) {}

  ngOnInit(): void {
    this.getHowToModalState();
  }

  getHowToModalState() {
    this.toggle
      .getHowToPlayModalState()
      .subscribe((val: boolean) => (this.howToPlayState = val));
  }

  closeRulesModal() {
    this.toggle.setHowToPlayModalState(false);
  }
  openDetailedRulesModal() {
    setTimeout(() => {
      this.toggle.setDetailedRuleModalState(true);
    });
    this.toggle.setHowToPlayModalState(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target) && this.howToPlayState) {
      this.toggle.setHowToPlayModalState(false);
    }
  }
}
