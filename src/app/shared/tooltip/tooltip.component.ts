import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() sidebarState: boolean = false;
  showTooltip: boolean = false;

  topPosition: number = 0;
  leftPosition: number = 0;

  positionTooltip(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();

    // Position tooltip above the hovered element
    this.topPosition = window.scrollY + rect.top - 60;
    this.leftPosition = window.scrollX + rect.left + rect.width / 2 - 30;
  }
}
