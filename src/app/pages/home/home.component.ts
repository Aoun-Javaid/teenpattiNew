import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CONFIG } from '../../../../config';
import { MainService } from '../../services/main.service';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, AfterViewInit {
  owlPrevBtn: boolean = true;
  owlNextBtn: boolean = false;
  forBlink:boolean = false
  tabIndex = 0
  isMarketOpen = true;
  isMarketOpen2 = true;
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  currentRoute!: string;
  heroSlider!: Swiper;
  activeTab: number = 1;
  LiveTab = 'basketball';
  TableTab: number = 1;

  WinnerDropdown = false;
  heroCurrentSlideIndex = 0;
  heroSlideCount = 0;

  searchPlaceholder: string = '';

  swiperConfig: any;
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;
  swiperBreakPoint = {
    slide: 7.5,
    space: 10,
  };

  heroSlides: any = [];
  navList: any = [];
  isCarouselActive = true;
  screenWidth = window.innerWidth;

  // swiperInstance: Swiper;
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getBannersList().subscribe((res: any) => {
      if (res) {
        this.heroSlides = res.sort((a: any, b: any) => a.sequence - b.sequence);;
      }
    });
    this.mainService.getNavigationList().subscribe((res: any) => {
      if (res) {
        this.navList = res.sort((a: any, b: any) => a.sequence - b.sequence);;
        // universeId:
        this.getUniverseOriginals('67728edcff8aeae796164df3');
      }
    });

    const inner = window.innerWidth;
    if (inner <= 992 && inner >= 400) {
      this.swiperBreakPoint.slide = 4;
    } else if (inner <= 400) {
      this.swiperBreakPoint.slide = 3;
    }
  }
  getUniverseOriginals(navigationId: any) {

    this.mainService.getDataFromServices(CONFIG.tablesList, CONFIG.tablesListTime, { navigationId }).subscribe((resp: any) => {
      if (resp) {

      }
    })
  }
  isUserLoggedIn(): boolean {
    return true;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    // this.checkCarousel();
  }

  ngAfterViewInit() {
    // this.checkCarousel();

    this.heroSlider = new Swiper('.hero-swiper', {
      loop: this.heroSlides.length > 3,
      slidesPerView: 1,
      slidesPerGroup: 1,
      freeMode: true,
      spaceBetween: 16,
      speed: 800,
      navigation: {
        nextEl: '.myCarouselRight',
        prevEl: '.myCarouselLeft',
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 1.1,
          slidesPerGroup: 1,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 16,
        },
      },
    });

    // $('#progressbar > div').css({
    //   'background-color': 'rgb(79 78 176)',
    //   width: '90%',
    // });
    // setTimeout(() => {
    //   $(document).ready(() => {
    //     $('.loaderMain').css('display', 'none')
    //   });
    // }, 400);

    this.forBlink = true

  }

  navigateRoute(index: number, routeValue: string) {
    this.scrollTabToCenter(index);
    this.tabIndex = index
  }

  getRouterLink(title: string): any[] {
    switch (title) {
      case 'Lobby':
        return ['/home/lobby'];
      case 'Providers':
        return ['/home/providers'];
      default:
        const kebabTitle = title.toLowerCase().split(' ').join('-');
        return ['/home', kebabTitle];
    }
  }



  scrollTabToCenter(index: number) {
    setTimeout(() => { 
      const container = this.tabsContainer.nativeElement;
      const tabs = container.querySelectorAll('.tab-item');

      if (tabs.length > index) {
        const selectedTab = tabs[index];
        const containerWidth = container.offsetWidth;
        const tabOffset = selectedTab.offsetLeft;
        const tabWidth = selectedTab.offsetWidth;
        const scrollTo = tabOffset - (containerWidth / 2) + (tabWidth / 2);

        container.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    }, 50);
  }


  checkCarousel() {
    if (this.screenWidth > 700 && this.isCarouselActive) {
      // this.gallerySlider.unslick();
      this.isCarouselActive = false;
    } else if (this.screenWidth <= 700 && !this.isCarouselActive) {
      this.isCarouselActive = true;
    }
  }

  heroSlickInit(e: any) {
    this.heroSlideCount = e.slick.slideCount;
  }

  heroAfterChange(e: any) {
    this.heroCurrentSlideIndex = e.currentSlide;
  }

  // Tabs
  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  // Tabs

  // Table Tabs
  // setLiveTabActive(tab: string) {
  //   this.LiveTab = tab;
  // }
  // NaviagteTo(item: any) {
  //   if (item.title == 'Universe Originals') {
  //     this.router.navigateByUrl('/home/universe-originals/UNIVERSE')
  //   }
  //   else if (item.title == 'Lobby') {
  //     this.router.navigateByUrl('/home/lobby')
  //   }

  // }
}
