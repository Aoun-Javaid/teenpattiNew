import { Component } from '@angular/core';
import { ToggleService } from '../../../../services/toggle.service';


@Component({
  selector: 'app-auto-play',
  standalone: true,
  imports: [],
  templateUrl: './auto-play.component.html',
  styleUrl: './auto-play.component.css'
})
export class AutoPlayComponent {
  autoState:boolean = false
  constructor(private toggle:ToggleService){}
  ngOnInit(): void {
    this.toggle.getAutoPlay().subscribe((value:any)=>{
      this.autoState = value
    })
  }

  closeModal(){
    this.toggle.setAutoPlay(false)
  }

}
