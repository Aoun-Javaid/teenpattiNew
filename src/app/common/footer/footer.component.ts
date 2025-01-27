import { Component } from '@angular/core';
import { ConditionhandlerService } from '../../service/conditionhandler.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private conditionalService:ConditionhandlerService){}

  ShowSection(){
    this.conditionalService.setSection(true);
  }

}
