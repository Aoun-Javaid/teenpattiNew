import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-detailed-rules-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './detailed-rules-modal.component.html',
  styleUrl: './detailed-rules-modal.component.css',
})
export class DetailedRulesModalComponent implements OnInit {
  detailedRuleModalState: boolean = false;
  constructor(private toggle: ToggleService, private el: ElementRef) {}

  ngOnInit(): void {
    this.getDetailedRuleModalState();
  }

  getDetailedRuleModalState() {
    this.toggle
      .getDetailedRuleModalState()
      .subscribe((val: boolean) => (this.detailedRuleModalState = val));
  }

  closeDetailedRulesModal() {
    this.toggle.setDetailedRuleModalState(false);
  }

  openProvablyFairModal() {
    setTimeout(() => {
      this.toggle.setProvablyFairModalState(true);
      this.closeDetailedRulesModal();
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.detailedRuleModalState
    ) {
      this.toggle.setDetailedRuleModalState(false);
    }
  }
}
