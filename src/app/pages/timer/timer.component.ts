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
  animate: boolean = false; 

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.triggerAnimation(); 
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  triggerAnimation() {
    this.animate = false;
    setTimeout(() => {
      this.animate = true; 
    }, 50);
  }

  getStrokeDasharray(): string {
    const circumference = 2 * Math.PI * 45;
    const progress = (circumference * this.timeLeft) / 29;
    return `${progress} ${circumference}`;
  }

  getStrokeColor(): string {
    if (this.timeLeft <= 3) {
      return '#FF0000';
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
