import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
  
})
export class TimerComponent {
  timeLeft: number = 19;
  interval: any;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  getStrokeDasharray(): string {
    const circumference = 2 * Math.PI * 45;
    const progress = (circumference * this.timeLeft) / 29;
    return `${progress} ${circumference}`;
  }

  getStrokeColor(): string {
    if (this.timeLeft <= 0 || this.timeLeft <= 3) {
      return '#FF0000'; // Red when time is 3 or below
    } else if (this.timeLeft === 4) {
      return '#FF4500'; // Orange when time is 4
    } else if (this.timeLeft <= 5) {
      return '#FEFF00'; // Yellow when time is 5 or less
    }
    return '#AAFF00'; // Green when time is more than 5
  }
  

  getOpacity(): number {
    return this.timeLeft > 4 ? 1 : 0.5; // Slight fade-out effect when below 4
  }
}
