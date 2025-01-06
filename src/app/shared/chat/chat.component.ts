import { Component } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  constructor(private toggle:ToggleService){

  }
  closeMobSideBar(){
    this.toggle.setMobSideBarState(false);
  }
}
