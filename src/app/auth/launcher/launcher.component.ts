import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { CONFIG } from '../../../../config';
import { MainService } from '../../services/main.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-launcher',
  standalone: true,
  imports: [],
  templateUrl: './launcher.component.html',
  styleUrl: './launcher.component.css'
})
export class LauncherComponent implements OnInit,OnDestroy{
  userToken: any;
  systemAuthToken: any;
  operator: any;
  eventId: any;

  routeSub!: Subscription;
  public tableId: any;
  public accessToken: any;
  roomId: any;
  header: string | null = '';
  themeConfigData: any;
  site: string = '';
  isLoader = false

  favIcon: HTMLLinkElement = document.querySelector('#appIcon') as HTMLLinkElement;

  constructor(private route: ActivatedRoute,
     private networkService: NetworkService,
      private router: Router, private mainService:MainService) {
    this.isLoader = true


  }





  ngOnInit() {

    // Access query parameters using the ActivatedRoute service
    this.userToken = this.route.snapshot.queryParamMap.get('userToken');
    this.systemAuthToken = this.route.snapshot.queryParamMap.get('systemAuthToken');
    this.operator = this.route.snapshot.queryParamMap.get('operator');
    this.eventId = this.route.snapshot.queryParamMap.get('eventId');
    this.networkService.getAllRecordsByPost(CONFIG.authlaunch, {
      userToken: this.userToken,
      operatorId: this.operator,
      systemAuthToken: this.systemAuthToken
    })
      .pipe(first())
      .subscribe(
        data => {

          if (data.meta.status == true) {
            this.accessToken = data.data.sessionId;

            if (this.accessToken) {
              localStorage.setItem('token', this.accessToken);
              localStorage.setItem('localset', 'true');


              this.mainService.setLoggedIn(true);

              if (this.eventId) {
                this.networkService.goToMarketCurrent(this.eventId);
              }
              else if(this.eventId==null || this.eventId==''){
                this.router.navigate([`/home`]);
              } else {
                this.router.navigate([`/home`]);
              }

            }
          }
          else {
            this.mainService.setLoggedIn(false);
            this.router.navigate(['/unautherized']);
          }
        },
        error => {
          let responseData = error;
        });






  }


  ngOnDestroy() {
    this.isLoader = false

  }
}
