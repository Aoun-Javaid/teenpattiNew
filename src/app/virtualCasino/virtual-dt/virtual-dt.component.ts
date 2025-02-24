import { Component } from '@angular/core';
import {TimerComponent} from "../shared/timer/timer.component";
import {TopResultsComponent} from "../../newCasino/shared/top-results/top-results.component";

@Component({
  selector: 'app-virtual-dt',
  standalone: true,
    imports: [
        TimerComponent,
        TopResultsComponent
    ],
  templateUrl: './virtual-dt.component.html',
  styleUrl: './virtual-dt.component.css'
})
export class VirtualDtComponent {

}
