import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ContentComponent } from '../content/content.component';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { filter } from 'rxjs';
import { ToggleService } from '../../services/toggle.service';
import { MobNavigationComponent } from '../../shared/mob-navigation/mob-navigation.component';
import { MobSidebarComponent } from '../../shared/mob-sidebar/mob-sidebar.component';
import { BrowseComponent } from '../../shared/mob-navigation/browse/browse.component';
import { ChatComponent } from '../../shared/chat/chat.component';
import { ProfileComponent } from '../../shared/mob-navigation/profile/profile.component';
import { CookiesComponent } from '../../shared/cookies/cookies.component';
import { CookieConsentService } from '../../services/cookie-consent.service';
declare var $: any;
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ContentComponent,
    CommonModule,
    HeaderComponent,
    MobNavigationComponent,
    MobSidebarComponent,
    BrowseComponent,
    ChatComponent,
    ProfileComponent,
    CookiesComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  currentRoute: string = '';
  modalsState: boolean = false;
  showBetslip: boolean = false;
  sidebarOpen: boolean = true;
  vaultModal: boolean = false;
  vipModal: boolean = false;
  statisticModal: boolean = false;
  statisticTableModal: boolean = false;
  notificationState: boolean = false;
  campaingState: boolean = false;
  constructor(
    private router: Router,
    private toggle: ToggleService,
    private cookieConsentService: CookieConsentService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        $('#progressbar > div').css({
          'background-color': 'rgb(79 78 176)',
          width: '90%',
        });
        setTimeout(() => {
          $(document).ready(() => {
            $('.loaderMain').css('display', 'none');
          });
        }, 1000);
      });
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.modalsState = true;
    }, 1000);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pageWrapper = document.querySelector(
          '.page-wrapper'
        ) as HTMLElement;
        if (pageWrapper) {
          pageWrapper.scrollTop = 0;
        }
      }
    });
  }

  get hasConsent(): boolean {
    return this.cookieConsentService.hasConsent();
  }
}
