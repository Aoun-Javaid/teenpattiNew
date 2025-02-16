import {Component, HostListener, OnInit} from '@angular/core';
import {TopResultsComponent} from "../shared/top-results/top-results.component";
import {VideoPlayerComponent} from "../../shared/video-player/video-player.component";
import {CommonModule} from "@angular/common";
import {BetCoinComponent} from "../../shared/bet-coin/bet-coin.component";
import {ShortNumberPipe} from "../../pipes/short-number.pipe";

@Component({
  selector: 'app-dragon-tiger',
  standalone: true,
  imports: [
    TopResultsComponent,
    VideoPlayerComponent, CommonModule, BetCoinComponent, ShortNumberPipe
  ],
  templateUrl: './dragon-tiger.component.html',
  styleUrl: './dragon-tiger.component.css'
})
export class DragonTigerComponent implements OnInit {

  RoundWinner: any;
  isDesktop!: boolean;
  marketArray: any;
  game: any;
  winnerMarketArray: any;

  ngOnInit() {
    this.getWindowSize()
  }


  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.getWindowSize()
  }

  getWindowSize() {
    const baseWidth = 352; // Base resolution width
    const scale = window.innerWidth / baseWidth
    document.documentElement.style.setProperty('--boardScale', scale.toString());
  }

}
