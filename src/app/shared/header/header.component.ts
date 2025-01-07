import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { CONFIG } from '../../../../config';
import { NetworkService } from '../../services/network.service';
import { ToggleService } from '../../services/toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  constructor(private networkService:NetworkService,private toggle:ToggleService){

  }
  userBalance:any={};
  ngOnInit(): void {
    // this.getBalance();
  }
  getBalance(){
    this.networkService.getAllRecordsByPost(CONFIG.userBalance, {})
      .pipe(first())
      .subscribe(
        data => {

          if (data.meta.status == true) {
            this.userBalance = data.data;

          }
        },
        error => {
          let responseData = error;
        });
  }
  getAllRecordsByPost(userBalance: any, arg1: {}) {
    throw new Error('Method not implemented.');
  }
  removeOverflow(){
    document.body.classList.add('overflow-hidden');
  }
  addOverflow(){
    document.body.classList.remove('overflow-hidden');
  }
  closemobSidebar(){
    this.toggle.setMobSideBarState(false);
  }
}
