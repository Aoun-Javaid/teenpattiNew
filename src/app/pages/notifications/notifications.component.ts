import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  constructor(private location:Location){

  }

  gotoBack(){
    this.location.back();
    document.body.classList.remove('overflow-hidden');
  }

}
