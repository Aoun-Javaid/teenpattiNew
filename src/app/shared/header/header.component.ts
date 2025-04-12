import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { CONFIG } from '../../../../config';
import { MainService } from '../../services/main.service';
import { NetworkService } from '../../services/network.service';
import { ToggleService } from '../../services/toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private networkService: NetworkService, private toggle: ToggleService, private mainService: MainService, private router: Router) {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }
  userBalance: any;
  UserExposure: any;
  isLoggedIn: any;
  browseNav = false
  ProfileNav = false
  ChatNav = false


  ngOnInit(): void {


    // this.getUserBallance();
    this.mainService.getLoggedIn().subscribe((res: any) => {
      // console.log('agya bai login hai ya ni ', res)
      this.isLoggedIn = res;

    });
    if (this.isLoggedIn) {
      // this.mainService.setLoggedIn(true);
      this.getUserBallance();
      // this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string);
    }
  }

  navigateHome() {
    this.router.navigateByUrl('/home/lobby');
    this.toggle.setBrowseMobSidebarState(false);
    this.toggle.setProfileMobSidebarState(false);
    this.toggle.setChatMobSidebarState(false)
    this.toggle.setMobileNavState(null);
    const pageWrapper = document.querySelector(
      '.page-wrapper'
    ) as HTMLElement;
    if (pageWrapper) {
      pageWrapper.scrollTop = 0;
    }
  }


getUserBallance() {
    this.networkService.getAllRecordsByPost(CONFIG.getUserBalanceURL, {})
      .pipe(first())
      .subscribe(
        res => {
          // let availBalance = (res.data.balance - res.data.exposure).toFixed(2)
          let availBalance = (res.data.balance - res.data.exposure);
          this.userBalance = availBalance;
          this.UserExposure = res.data.exposure;
        },
        error => {
          //let statusError = error;

        });
  }
  getAllRecordsByPost(userBalance: any, arg1: {}) {
    throw new Error('Method not implemented.');
  }
  removeOverflow() {
    document.body.classList.add('overflow-hidden');
  }
  addOverflow() {
    document.body.classList.remove('overflow-hidden');
  }
  closemobSidebar() {
    this.toggle.setMobSideBarState(false);
  }
}
