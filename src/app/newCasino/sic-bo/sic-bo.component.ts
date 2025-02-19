import { Component } from '@angular/core';
import { VideoPlayerComponent } from "../../shared/video-player/video-player.component";
import { TopResultsComponent } from '../shared/top-results/top-results.component';

@Component({
  selector: 'app-sic-bo',
  standalone: true,
  imports: [VideoPlayerComponent, TopResultsComponent],
  templateUrl: './sic-bo.component.html',
  styleUrl: './sic-bo.component.css'
})
export class SicBoComponent {
  RoundWinner: any;
}
