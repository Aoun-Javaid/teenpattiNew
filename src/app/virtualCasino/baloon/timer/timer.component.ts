import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnChanges {
  @Input() timeLeft: number = 8;

  fancyTimer: boolean = true;
  TIME_LIMIT = this.timeLeft;
  animate: boolean = false;
  game: any = {};
  timePassed = 0;
  timerInterval: any;
  public casinoFlag = 1;
  timerLeft: any;
  interval: any;

  constructor() {}

  ngOnInit(): void {}
  formatTimeLeft(time: any) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    var seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = parseInt(`0${seconds}`);
    }

    // The output in MM:SS format
    return seconds;
  }
  ngOnDestroy() {
    window.clearInterval(this.timerInterval);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.game?.status == 'ONLINE') {
      this.startTimer();
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.triggerAnimation();
        // this.timeLeft--;
        // console.log('hiii down');
      }
    }, 1000);
  }

  triggerAnimation() {
    this.animate = false;
    setTimeout(() => {
      this.animate = true;
      // console.log('hiii true');
    }, 50);
  }

  getStrokeDasharray(): string {
    const circumference = 2 * Math.PI * 28.5;
    const progress = (circumference * this.timeLeft) / this.TIME_LIMIT;
    return `${progress} ${circumference}`;
  }

  getStrokeColor(): string {
    if (this.timeLeft <= 3) {
      // return '#FF0000';
      return '#f70f02';
    } else if (this.timeLeft === 4) {
      return '#FF4500';
    } else if (this.timeLeft <= 5) {
      return '#FEFF00';
    }
    return '#AAFF00';
  }

  getOpacity(): number {
    return this.timeLeft > 4 ? 1 : 0.5;
  }
}
