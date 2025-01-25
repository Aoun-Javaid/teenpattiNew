import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CONFIG } from '../../config';
import { MainService } from './services/main.service';

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'Universe Casino';
  private readonly storageKey = 'isInitialLoad';

  constructor(private mainService: MainService) {

  }
  ngOnInit(): void {
    $('#progressbar > div').css({
      'background-color': '#d2098b',
      width: '70%',
    });

    localStorage.setItem(this.storageKey, 'true');
    this.getBanners();
    this.getNavigationList();
    this.getprovidersNavigations();
  }

  getBanners() {
    this.mainService.getDataFromServices(CONFIG.bannersList, CONFIG.bannersListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.mainService.setBannersList(data.data);
    });
  }
  getNavigationList() {
    this.mainService.getDataFromServices(CONFIG.NavigationList, CONFIG.NavigationListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.mainService.setNavigationList(data.data);
    });
  }
  getprovidersNavigations() {
    this.mainService.getDataFromServices(CONFIG.providersNavigations, CONFIG.providersNavigationsTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.mainService.setProvidersNavigationsList(data.data);
    });
  }
}
