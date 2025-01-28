import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-slider.component.html',
  styleUrl: './tab-slider.component.css'
})
export class TabSliderComponent {
    @Input() arrItem:any
    tabIndex = 0
     tabs(index:any){
       this.tabIndex = index
     }
}
