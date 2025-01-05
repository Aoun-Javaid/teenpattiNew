import { Component } from '@angular/core';
import { BetdetailsModalComponent } from "../../Modals/betdetails-modal/betdetails-modal.component";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-bets',
  standalone: true,
  imports: [BetdetailsModalComponent],
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.css'
})
export class BetsComponent {

  constructor(private modalsService:ModalService){

  }

  openbetsModal(){
    let obj={
      show:true,
    }
    this.modalsService.setBetsDetailModals(obj);
  }

}
