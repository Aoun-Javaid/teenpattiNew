import { Component, HostListener } from '@angular/core';
import { TopResultsComponent } from '../../newCasino/shared/top-results/top-results.component';
import { BetCoinComponent } from '../../shared/bet-coin/bet-coin.component';

@Component({
  selector: 'app-virtual-topcards',
  standalone: true,
  imports: [TopResultsComponent, BetCoinComponent],
  templateUrl: './virtual-topcards.component.html',
  styleUrl: './virtual-topcards.component.css',
})
export class VirtualTopcardsComponent {
  game: any;
  screenWidth: any;

  getCoinValue(event: any) {
    console.log('event', event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.getWindowSize();
    this.screenWidth = window.innerWidth;
  }

  getWindowSize() {
    const baseWidth = 352; // Base resolution width
    const scale = window.innerWidth / baseWidth;
    document.documentElement.style.setProperty(
      '--boardScale',
      scale.toString()
    );

    const baseHeight = 716; // Base resolution height
    const scaleY = window.innerHeight / baseWidth;
    document.documentElement.style.setProperty(
      '--boardScaleY',
      scaleY.toString()
    );
  }
}
