import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModalService } from '../../../services/modal.service';
import { NetworkService } from '../../../services/network.service';
import { CasinoResultModalComponent } from "../../../Modals/casino-result-modal/casino-result-modal.component";

@Component({
  selector: 'app-top-results',
  standalone: true,
  imports: [CommonModule, CasinoResultModalComponent],
  templateUrl: './top-results.component.html',
  styleUrl: './top-results.component.css'
})
export class TopResultsComponent implements OnInit{

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  resultArray: any;
  selectedResult: any;
  eventid: any;
  game: any;
  roundId: any;
  isDesktop: any;
  SK_array: string[] = [];
  HK_array: string[] = [];
  DK_array: string[] = [];
  CK_array: string[] = [];



  myjson: any = JSON;
  marketName: any;

  constructor(private networkService: NetworkService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService,
    private modalsService:ModalService,
    private route: ActivatedRoute) {
    this.eventid = this.route.snapshot.params['id'];
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit(): void {


    this.networkService.getResultstream().subscribe(data => {
      this.resultArray = data;
      // console.log(data,'=============')

      // setTimeout(() => {
      //   this.getBalance();
      // }, 1000);
    })




  }

  worliSplitter(winnerResult: any) {
    let winnerArray = [];
    if (winnerResult) {
      let split_arr: any = []
      // console.log(winnerResult);

      split_arr = winnerResult?.split('@@');
      // console.log(split_arr);
      winnerResult = split_arr[1] + ' - ' + split_arr[2];
      winnerArray.push(split_arr[1]);
      winnerArray.push(split_arr[2]);
    }
    return winnerArray;
  }


  bodyFlow() {
    document.body.style.overflow = "";
  }
  openModal() {

  }

  setResults(result: any) {

    this.selectedResult= {};
    document.body.style.overflow = "hidden";
    this.selectedResult = result;

    if (result.eventId == '99.0062') {
      this.selectedResult = JSON.parse(JSON.stringify(result))
      this.cdr.detectChanges();
      const currentOrigin = window.location.origin;
      // this.selectedResult.cards.url = result.cards.url.replace('{$domain}', 'https://casino.fancy22.com');
      this.selectedResult.cards.url = this.selectedResult.cards.url.replace('{$domain}', currentOrigin);
      // this.selectedResult.cards.url ='https://casino.fancy22.com/api/users/images/ballbyball-2024889380422.mp4'
      var element1 = document.getElementById('videoballbyballResult') as HTMLVideoElement;

      if (element1) {
        element1.muted = true;
        // element1.play();
      }

      if (!element1?.muted) {


        const intervalId = setInterval(() => {
          const element = document.getElementById('videoballbyballResult') as HTMLVideoElement;
          if (element) {
            element.muted = true;
            if (element.muted) {
              clearInterval(intervalId);
            }
          }
        }, 10);
      }
    }
    // console.log(this.selectedResult, 'this.selectedResult');
    // console.log(this.selectedResult.cards.Player_A, 'this.selectedResult');

    if (this.eventid == '99.0046' || this.eventid == '99.0047' || this.eventid == '99.0048') { //for card race
      this.CK_array = [];
      this.DK_array = [];
      this.HK_array = [];
      this.SK_array = [];
      for (const [key, value] of Object.entries<string>(this.selectedResult.cards)) {
        if (value.startsWith("S")) {
          this.SK_array.push(value);
        } else if (value.startsWith("H")) {
          this.HK_array.push(value);
        } else if (value.startsWith("D")) {
          this.DK_array.push(value);
        } else if (value.startsWith("C")) {
          this.CK_array.push(value);
        }
      }
    }
    this.openbetsModal(this.selectedResult);
  }
  getObjectEntries(obj: any): [string, string][] {
    return Object.entries(obj || {});
  }

  getRunnerIds(runners: { [key: number]: string }): number[] {
    debugger
    return Object.keys(runners).map(key => parseInt(key, 10));
  }


  getLuckyResultClass(number:any) {

    if (number == 0) {
      return 'greenNumber'
    } else if (number % 2 == 0) {
      return 'blackNumber'
    } else {
      return 'redNumber'
    }
  }

  getCatcherResultClass(number:any) {
    if (number == 1) {
      return 'numberOne'
    } else if (number == 2) {
      return 'numberTwo'
    } else if (number == 5) {
      return 'numberFive'
    } else if (number == 10) {
      return 'numberTen'
    } else if (number == 20) {
      return 'numberTwenty'
    } else {
      return 'numberFourty'
    }
  }
  openbetsModal(item:any) {
    item.show=true;
    this.modalsService.setCasinoResultModal(item);
  }

}
