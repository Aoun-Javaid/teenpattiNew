import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerstatusMComponent } from "./playerstatus-m/playerstatus-m.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlayerstatusMComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-backend';
  
  constructor(){
    console.log('--- testing ---');
  }
}
