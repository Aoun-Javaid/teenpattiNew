import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../../config';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  routeSub: Subscription;
  public tableId: any;
  public accessToken: any;
  eventId: any;
  roomId: any;
  header: string | null = '';
  themeConfigData: any;
  site: string = '';
  isLoader = false

  favIcon: HTMLLinkElement = document.querySelector('#appIcon') as HTMLLinkElement;
  constructor(private route: ActivatedRoute, private mainService: MainService, private router: Router,) {
    this.isLoader=true
    this.routeSub = this.route.params.subscribe(params => {
      this.accessToken = params['token']
      // this.eventId = params['eventid']
    });
    // this.header = localStorage.getItem('header');

  }

  ngOnInit() {

    if (this.accessToken) {
      localStorage.setItem('token', this.accessToken);
      localStorage.setItem('localset', 'true');
      setTimeout(() => {
        this.getStakes();
      }, 1000)

      this.router.navigate([`/home`]);
    }

  }
  getStakes(){
    this.mainService.getDataFromServices(CONFIG.userGetStackURL, 0).subscribe((data: any) => {
    });
  }
  ngOnDestroy() {
    this.isLoader=false

  }
}
