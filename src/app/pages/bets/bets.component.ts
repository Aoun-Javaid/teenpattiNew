import { Component, OnInit } from '@angular/core';
import { BetdetailsModalComponent } from "../../Modals/betdetails-modal/betdetails-modal.component";
import { ModalService } from '../../services/modal.service';
import { WebSocketLiveBetService } from '../../services/web-socket-live-bet.service';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-bets',
  standalone: true,
  imports: [BetdetailsModalComponent, DatePipe, DecimalPipe],
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.css'
})
export class BetsComponent implements OnInit {
  token: any;
  liveBetsData: any = [];
  latestBetsData: any = [];

  constructor(private modalsService: ModalService,
    private socketService: WebSocketLiveBetService
  ) {

  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = uuidv4();
    }
    this.socketService.connect(this.token);

    this.socketService.onEvent('loadConnectedClients', (data) => {
      // console.log('Received loadConnectedClients:', data);
      // this.connectedUsers = data;
      console.log(data)
    });

    this.socketService.onEvent('loadBets', (data) => {

      console.log(data)

      this.updateIncomingMessage(data);
      // console.log('Received message event:', data);
    });
  }

  updateIncomingMessage(data: any) {
    let betsData = JSON.parse(data);
    console.log(typeof (this.liveBetsData))
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
