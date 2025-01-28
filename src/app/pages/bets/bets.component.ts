import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BetdetailsModalComponent } from "../../Modals/betdetails-modal/betdetails-modal.component";
import { ModalService } from '../../services/modal.service';
import { WebSocketLiveBetService } from '../../services/web-socket-live-bet.service';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MainService } from '../../services/main.service';
import { NetworkService } from '../../services/network.service';
import { CONFIG } from '../../../../config';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bets',
  standalone: true,
  imports: [BetdetailsModalComponent, DatePipe, DecimalPipe],
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.css'
})
export class BetsComponent implements OnInit, OnDestroy {
  token: any;
  liveBetsData: any = [];
  latestBetsData: any = [];
  private unsubscribe$ = new Subject<void>();
  constructor(private modalsService: ModalService,
    private socketService: WebSocketLiveBetService,
    private mainService: MainService,
    private networkService: NetworkService
  ) {
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = uuidv4();
    }

    this.mainService.getLiveBetRoom().pipe(takeUntil(this.unsubscribe$)).subscribe((room: any) => {
     
      this.socketService.connect(this.token, room);

      if (room == 'myBets') {
        this.networkService.getAllRecordsByPost(CONFIG.myBets, {})
          .subscribe((data: any) => {
            if (data.meta && data.meta.status === true) {
              this.latestBetsData = [];
              this.latestBetsData = data.data;
            }
          });
        this.socketService.onEvent('myBets', (data) => {
          this.updateIncomingMessage(data);
        });
      }

      if (room == 'allBets') {
        this.networkService.getAllRecordsByPost(CONFIG.allBets, {})
        .subscribe((data: any) => {
          if (data.meta && data.meta.status === true) {
            this.latestBetsData = [];
            this.latestBetsData = data.data;
          }
        });
        this.socketService.onEvent('allBets', (data) => {
          this.updateIncomingMessage(data);
        });
      }

      if (room == 'highRollers') {
        this.networkService.getAllRecordsByPost(CONFIG.highRollers, {})
        .subscribe((data: any) => {
          if (data.meta && data.meta.status === true) {
            this.latestBetsData = [];
            this.latestBetsData = data.data;
          }
        });
        this.socketService.onEvent('highRollers', (data) => {
          this.updateIncomingMessage(data);
        });
      }

    });



  }

  updateIncomingMessage(data: any) {
    let betsData = JSON.parse(data);
    this.liveBetsData.push(betsData);

    // Maintain a separate array with only the latest 15 objects
    if (!this.latestBetsData) {
      this.latestBetsData = []; // Initialize if not already done
    }

    // Add the new object to the start of the latestBetsData array
    this.latestBetsData.unshift(betsData);

    // Ensure the array only keeps the last 15 elements
    if (this.latestBetsData.length > 15) {
      this.latestBetsData.pop();
    }
  }

  openbetsModal() {
    let obj = {
      show: true,
    }
    this.modalsService.setBetsDetailModals(obj);
  }

}
