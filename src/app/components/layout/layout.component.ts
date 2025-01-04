import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ContentComponent } from '../content/content.component';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { filter } from 'rxjs';
import { ToggleService } from '../../services/toggle.service';
import { MobNavigationComponent } from '../../shared/mob-navigation/mob-navigation.component';
import { MobSidebarComponent } from '../../shared/mob-sidebar/mob-sidebar.component';
declare var $:any;
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ContentComponent,
    CommonModule,
    HeaderComponent,
    MobNavigationComponent,
    MobSidebarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  currentRoute: string = '';
  showBetslip: boolean = false;
  sidebarOpen: boolean = true;
  vaultModal: boolean = false;
  vipModal: boolean = false;
  statisticModal: boolean = false;
  statisticTableModal: boolean = false;
  notificationState: boolean = false;
  campaingState: boolean = false;
  constructor(private router: Router, private toggle: ToggleService) {
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
            $('.loaderMain').css('display', 'none')
          });
        }, 400);

      });
  }
  ngOnInit(): void {}
}
