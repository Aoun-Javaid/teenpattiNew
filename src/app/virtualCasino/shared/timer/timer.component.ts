import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NetworkService} from "../../../services/network.service";
import {CasinoSocketService} from "../../../services/casino-socket.service";

@Component({
  selector: 'app-timer',
  standalone: true,
    imports: [
        CommonModule
    ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnChanges {

  @Input() fancyTimer: boolean = false;
  TIME_LIMIT = 0;
  animate: boolean = false;
  timeLeft: number = 19;
  game: any = {};
  timePassed = 0;
  timerInterval: any;
  public casinoFlag = 1;
  timerLeft: any;
  interval: any;

  constructor(private networkService:NetworkService,private casinoService:CasinoSocketService) {
  }

  ngOnInit(): void {


    this.networkService.getRoundId().subscribe(data => {

      this.game = data;


      if (this.game?.status == "SUSPEND") {
        this.TIME_LIMIT = 0;
        this.timePassed = 0;
        this.timeLeft = 0;
        this.casinoFlag = 1;
        this.casinoService.setTimelimit(0);
        window.clearInterval(this.timerInterval);


      }
      if (this.game?.status == "ONLINE") {
        if (this.game && this.casinoFlag == 1) {
          this.casinoFlag = 2;
          this.TIME_LIMIT = this.game?.seconds;
          this.casinoService.setTimelimit(this.TIME_LIMIT);
          if (this.TIME_LIMIT) {
            this.timeLeft = this.TIME_LIMIT;
            this.timerInterval = setInterval(() => {

              this.timeLeft = this.timeLeft - 1;
              this.animate = false;
              setTimeout(() => {
                this.animate = true;
                // console.log('hiii true');
              }, 50);
              if (this.TIME_LIMIT) {
                document.documentElement.style.setProperty('--timerValue', this.TIME_LIMIT.toString() + 's');
              }

              this.timerLeft = this.formatTimeLeft(this.timeLeft);
              // console.log("hyeeeee", this.timerLeft, " pass", this.timePassed)
              if (this.timeLeft == 0) {
                window.clearInterval(this.timerInterval);
              }

              if (this.timeLeft == 0 || this.timeLeft < 0) {
                this.timeLeft = 0;
                this.casinoFlag = 1;
                window.clearInterval(this.timerInterval);
              }

            }, 1000);
          }
        }
        // console.log("timer", this.TIME_LIMIT)
      }
      if (!data) {
        this.TIME_LIMIT = 0;
        this.timePassed = 0;
        this.timeLeft = 0;
        this.casinoFlag = 1;
        this.casinoService.setTimelimit(0);
        window.clearInterval(this.timerInterval);
      }


    });



  }
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
    window.clearInterval(this.timerInterval)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.game?.status == "ONLINE") {
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
