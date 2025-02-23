import { Component } from '@angular/core';
import {TimerComponent} from "../shared/timer/timer.component";

@Component({
  selector: 'app-virtual-dt',
  standalone: true,
  imports: [
    TimerComponent
  ],
  templateUrl: './virtual-dt.component.html',
  styleUrl: './virtual-dt.component.css'
})
export class VirtualDtComponent {

}
