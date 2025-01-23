import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swiper from 'swiper';
import { ToggleService } from '../../services/toggle.service';
import { CommonModule } from '@angular/common';
import { MainService } from '../../services/main.service';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProvidersComponent implements OnInit, AfterViewInit {
  owlPrevBtn: boolean = true;
  owlNextBtn: boolean = false;
  ProviderPrevBtn: boolean = true;
  ProviderNextBtn: boolean = false;

  providerSwiper!: Swiper;

  TableTab: number = 1;

  ProviderViewAllState: boolean = false;

  providerCurrentSlideIndex = 0;
  providerSlideCount = 0;
  searchPlaceholder: string = '';

  swiperConfig: any;
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;
  swiperBreakPoint = {
    slide: 7.5,
    space: 10,
  };

  providers = [
    { img: '/assets/providers/pragmatic.png' },
    { img: '/assets/providers/evolution.png' },
    { img: '/assets/providers/hacksaw.png' },
    { img: '/assets/providers/nolimit.jpeg' },
    { img: '/assets/providers/play-go.png' },
    { img: '/assets/providers/push-gaming.png' },
    { img: '/assets/providers/real-gaming.png' },
    { img: '/assets/providers/massive.png' },
    { img: '/assets/providers/stake-gaming.png' },
    { img: '/assets/providers/titan-gaming.png' },
    { img: '/assets/providers/avatar-ux.png' },
    { img: '/assets/providers/backseat.png' },
    { img: '/assets/providers/twist.png' },
    { img: '/assets/providers/octoplay.png' },
    { img: '/assets/providers/elk-studios.png' },
    { img: '/assets/providers/thunderkick.jpeg' },
    { img: '/assets/providers/popiplay.png' },
    { img: '/assets/providers/bg-gaming.png' },
    { img: '/assets/providers/print-studios.png' },
    { img: '/assets/providers/bullshark.png' },
    { img: '/assets/providers/pg-gaming.jpeg' },
    { img: '/assets/providers/netent.png' },
    { img: '/assets/providers/btg.png' },
    { img: '/assets/providers/red-tiger.png' },
    { img: '/assets/providers/fantasma.png' },
    { img: '/assets/providers/game-art.png' },
    { img: '/assets/providers/oslotmill.png' },
    { img: '/assets/providers/one-touch.png' },
    { img: '/assets/providers/wazdan.png' },
    { img: '/assets/providers/live-88.png' },
    { img: '/assets/providers/gamomat.png' },
    { img: '/assets/providers/games-global.png' },
    { img: '/assets/providers/belatra.png' },
    { img: '/assets/providers/endorphina.png' },
    { img: '/assets/providers/true-lab.png' },
    { img: '/assets/providers/blue-print.png' },
    { img: '/assets/providers/redrake.png' },
    { img: '/assets/providers/boming-games.png' },
    { img: '/assets/providers/quick-spin.png' },
    { img: '/assets/providers/novomatic.png' },
    { img: '/assets/providers/oaks-gaming.png' },
    { img: '/assets/providers/jade-rabbit.png' },
    { img: '/assets/providers/jade-rabbit.png' },
  ];
  index = 0;

  isCarouselActive = true;
  screenWidth = window.innerWidth;
  navProviderList: any;

  // swiperInstance: Swiper;
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
    const inner = window.innerWidth;
    if (inner <= 992 && inner >= 400) {
      this.swiperBreakPoint.slide = 4;
    } else if (inner <= 400) {
      this.swiperBreakPoint.slide = 3;
    }
    this.getprovidersNavigations();
  }
  getprovidersNavigations() {
    this.mainService.getProvidersNavigationsList().subscribe((res: any) => {
      if (res) {
        this.navProviderList = res.sort((a: any, b: any) => a.gameSequence - b.gameSequence);
      }
    });
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

    // this.stakeOrigin = new Swiper('.stake-swiper', {
    //   loop: false,
    //   slidesPerView: 7.5,
    //   slidesPerGroup: 6,
    //   freeMode: true,

    //   spaceBetween: 10,
    //   navigation: {
    //     nextEl: '.myCarouselRight',
    //     prevEl: '.myCarouselLeft',
    //   },
    //   breakpoints: {
    //     300: {
    //       slidesPerView: 3,
    //       slidesPerGroup: 3,
    //       spaceBetween: 6,

    //     },
    //     768: {
    //       slidesPerView: 4,
    //       slidesPerGroup: 3,
    //       spaceBetween: 6,

    //     },
    //     1024: {
    //       slidesPerView: 7.5,
    //       slidesPerGroup: 6,
    //       spaceBetween: 10,
    //     },
    //   },
    //   on: {
    //     slideChange: () => this.updateNavigationButtons(),
    //     reachBeginning: () => (this.owlPrevBtn = true),
    //     reachEnd: () => (this.owlNextBtn = true),
    //   },
    // });
    // this.setDefaultViewProvider();
    this.setGridViewProvider();
    // this.providerSwiper = new Swiper('.provider-swiper', {
    //   loop: false,
    //   slidesPerView: 7.5,
    //   slidesPerGroup: 3,
    //   freeMode: true,
    //   spaceBetween: 10,
    //   navigation: {
    //     nextEl: '.myCarouselRight',
    //     prevEl: '.myCarouselLeft',
    //   },
    //   breakpoints: {
    //     300: {
    //       slidesPerView: 3,
    //       slidesPerGroup: 3,
    //       spaceBetween: 6,
    //     },
    //     768: {
    //       slidesPerView: 4,
    //       slidesPerGroup: 3,
    //       spaceBetween: 6,
    //     },
    //     1024: {
    //       slidesPerView: 7.5,
    //       slidesPerGroup: 6,
    //       spaceBetween: 10,
    //     },
    //   },
    //   on: {
    //     slideChange: () => this.updateProviderNavigationButtons(),
    //     reachBeginning: () => (this.ProviderPrevBtn = true),
    //     reachEnd: () => (this.ProviderNextBtn = true),
    //   },
    // });
  }

  updateProviderNavigationButtons() {
    if (this.providerSwiper) {
      this.ProviderPrevBtn = this.providerSwiper.isBeginning;
      this.ProviderNextBtn = this.providerSwiper.isEnd;
    }
  }
  checkCarousel() {
    if (this.screenWidth > 700 && this.isCarouselActive) {
      // this.gallerySlider.unslick();
      this.isCarouselActive = false;
    } else if (this.screenWidth <= 700 && !this.isCarouselActive) {
      this.isCarouselActive = true;
    }
  }

  providerSlickInit(e: any) {
    this.providerSlideCount = e.slick.slideCount;
  }

  providerAfterChange(e: any) {
    this.providerCurrentSlideIndex = e.currentSlide;
  }

  // Tabs
  setActiveTableTab(tabIndex: number): void {
    this.TableTab = tabIndex;
  }

  // Table Tabs
  // setLiveTabActive(tab: string) {
  //   this.LiveTab = tab;
  // }

  setProviderViewType() {
    this.ProviderViewAllState = !this.ProviderViewAllState;
    if (this.ProviderViewAllState) {
      this.setGridViewProvider();
    } else {
      this.setDefaultViewProvider();
    }
  }
  setGridViewProvider() {
    const config = this.getGridProviderSwiperConfig();
    this.initializeProviderSwiper(config);
  }
  setDefaultViewProvider() {
    const config = this.getDefaultProviderSwiperConfig();
    this.initializeProviderSwiper(config);
  }
  private initializeProviderSwiper(config: any): void {
    if (this.providerSwiper) {
      this.providerSwiper.destroy(true, true); // Destroy existing Swiper instance
    }
    this.providerSwiper = new Swiper('.provider-swiper', config); // Initialize Swiper with new config
  }
  private getDefaultProviderSwiperConfig(): any {
    return {
      loop: false,
      slidesPerView: 7.5,
      slidesPerGroup: 3,
      freeMode: true,
      spaceBetween: 10,
      speed: 700,
      navigation: {
        nextEl: '.myCarouselRight',
        prevEl: '.myCarouselLeft',
      },
      breakpoints: {
        300: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 6,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 3,
          spaceBetween: 6,
        },
        1024: {
          slidesPerView: 7.5,
          slidesPerGroup: 6,
          spaceBetween: 10,
        },
      },
      on: {
        slideChange: () => this.updateProviderNavigationButtons(),
        reachBeginning: () => (this.ProviderPrevBtn = true),
        reachEnd: () => (this.ProviderNextBtn = true),
      },
    };
  }
  private getGridProviderSwiperConfig(): any {
    const totalSlides = this.providers.length;
    const slidesPerView = 3; // Number of slides per row
    const rows = Math.ceil(totalSlides / slidesPerView);

    return {
      slidesPerView: slidesPerView,
      spaceBetween: 6,
      grid: {
        rows: rows,
        fill: 'row',
      },
      navigation: false,
      loop: false,
      allowTouchMove: false,
      freeMode: false,
      breakpoints: {
        300: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 6,
          grid: {
            rows: rows,
            fill: 'row',
          },
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 3,
          spaceBetween: 6,
        },
        1024: {
          slidesPerView: 7.5,
          slidesPerGroup: 6,
          spaceBetween: 10,
        },
      },
    };
  }
}
