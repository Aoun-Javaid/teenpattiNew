import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-roulette',
  standalone: true,
  imports: [],
  templateUrl: './live-roulette.component.html',
  styleUrl: './live-roulette.component.css',
})
export class LiveRouletteComponent implements OnInit {
  ngOnInit(): void {
    this.getWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.getWindowSize();
  }

  getWindowSize() {
    const baseWidth = 320; // Base resolution width
    const scale = window.innerWidth / baseWidth;
    document.documentElement.style.setProperty(
      '--boardScale',
      scale.toString()
    );

    const baseHeight = 650; // Base resolution height
    const scaleY = window.innerHeight / baseWidth;
    document.documentElement.style.setProperty(
      '--boardScaleY',
      scaleY.toString()
    );
  }
}
