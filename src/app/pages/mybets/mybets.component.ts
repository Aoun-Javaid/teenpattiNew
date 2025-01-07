import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BetdetailsModalComponent } from "../../Modals/betdetails-modal/betdetails-modal.component";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-mybets',
  standalone: true,
  imports: [BetdetailsModalComponent,NgClass,NgFor],
  templateUrl: './mybets.component.html',
  styleUrl: './mybets.component.css'
})
export class MybetsComponent {
  activeTab='casino';
  constructor(private modalsService:ModalService){

  }
  rows:any=[
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    
  ]
  openbetsModal(){
    let obj={
      show:true,
    }
    this.modalsService.setBetsDetailModals(obj);
  }
}
