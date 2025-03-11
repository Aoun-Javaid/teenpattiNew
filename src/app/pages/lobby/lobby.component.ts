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
import { Router, ActivatedRoute, RouterLink, NavigationEnd } from '@angular/router';
import Swiper from 'swiper';
import { ToggleService } from '../../services/toggle.service';
import { BetsComponent } from '../bets/bets.component';
import { MainService } from '../../services/main.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, RouterLink, BetsComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LobbyComponent implements OnInit, AfterViewInit {
  owlPrevBtn: boolean = true;
  owlNextBtn: boolean = false;
  ProviderPrevBtn: boolean = true;
  ProviderNextBtn: boolean = false;
  providerSwiper!: Swiper;
  activeTab: number = 1;
  LiveTab = 'basketball';
  stakeOrigin!: Swiper;
  TableTab: string = 'myBets';
  casinoViewAllState: boolean = false;
  ProviderViewAllState: boolean = false;
  WinnerDropdown = false;

  stakeCurrentSlideIndex = 0;
  stakeSlideCount = 0;

  providerCurrentSlideIndex = 0;
  providerSlideCount = 0;
  searchPlaceholder: string = '';

  swiperConfig: any;
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;
  swiperBreakPoint = {
    slide: 7.5,
    space: 10,
  };

  stakes = [
    {
      img: '/assets/home/stake-1.avif',
      count: 3469,
      status: 'Playing',
    },
    { img: '/assets/home/stake-2.avif', count: 1943, status: 'Maintenance' },
    { img: '/assets/home/stake-3.avif', count: 1931, status: 'Playing' },
    { img: '/assets/home/stake-4.avif', count: 1962, status: 'Maintenance' },
    { img: '/assets/home/stake-5.avif', count: 4814, status: 'Playing' },
    { img: '/assets/home/stake-6.avif', count: 3218, status: 'Playing' },
    {
      img: '/assets/home/stake-7.avif',
      count: 1450,
      status: 'Playing',
    },
    { img: '/assets/home/stake-8.avif', count: 895, status: 'Playing' },
    { img: '/assets/home/stake-9.avif', count: 930, status: 'Playing' },
    { img: '/assets/home/stake-10.avif', count: 1414, status: 'Maintenance' },
    { img: '/assets/home/stake-11.avif', count: 186, status: 'Playing' },
    { img: '/assets/home/stake-12.avif', count: 711, status: 'Playing' },
    { img: '/assets/home/stake-13.avif', count: 105, status: 'Playing' },
    { img: '/assets/home/stake-14.avif', count: 895, status: 'Maintenance' },
    { img: '/assets/home/stake-15.avif', count: 930, status: 'Playing' },
    { img: '/assets/home/stake-16.avif', count: 1414, status: 'Playing' },
    { img: '/assets/home/stake-17.avif', count: 895, status: 'Maintenance' },
    { img: '/assets/home/stake-18.avif', count: 930, status: 'Playing' },
  ];
  casinos: { img: string }[] = [
    {
      img: '/assets/home/casino-1.avif',
    },
    { img: '/assets/home/casino-2.avif' },
    { img: '/assets/home/casino-3.avif' },
    { img: '/assets/home/casino-4.avif' },
    { img: '/assets/home/casino-5.avif' },
    { img: '/assets/home/casino-6.avif' },
    { img: '/assets/home/casino-7.avif' },
    { img: '/assets/home/casino-8.avif' },
    { img: '/assets/home/casino-9.avif' },
    { img: '/assets/home/casino-10.avif' },
    { img: '/assets/home/casino-11.avif' },
    { img: '/assets/home/casino-12.avif' },
    { img: '/assets/home/casino-13.avif' },
    { img: '/assets/home/casino-14.avif' },
    { img: '/assets/home/casino-15.avif' },
    { img: '/assets/home/casino-16.avif' },
    { img: '/assets/home/casino-17.avif' },
    { img: '/assets/home/casino-18.avif' },
    { img: '/assets/home/casino-19.avif' },
    { img: '/assets/home/casino-20.avif' },
    { img: '/assets/home/casino-21.avif' },
    { img: '/assets/home/casino-22.avif' },
  ];
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
  universeProviderGames: any;
  private isInitialLoad = true;
  // swiperInstance: Swiper;
  constructor(private router: Router, private mainService: MainService,private networkService:NetworkService) {

  }

  ngOnInit() {
    this.setActiveTableTab(this.TableTab);
    this.getprovidersNavigations();
    const inner = window.innerWidth;
    if (inner <= 992 && inner >= 400) {
      this.swiperBreakPoint.slide = 4;
    } else if (inner <= 400) {
      this.swiperBreakPoint.slide = 3;
    }


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
    const isInitialLoad = localStorage.getItem('isInitialLoad');
    if (isInitialLoad   == 'true') {
      // On initial load, use setTimeout
      setTimeout(() => {
        this.setDefaultView();
        this.setDefaultViewProvider();
        localStorage.setItem('isInitialLoad', 'false'); // Mark subsequent loads
      }, 800);
    }
    if (isInitialLoad   == 'false') {
      this.setDefaultView();
      this.setDefaultViewProvider();
    }
    // if (this.isInitialLoad == false) {
    //   setTimeout(() => {
    //     this.setDefaultView();
    //     this.setDefaultViewProvider();
    //     console.log('false call');
    //   }, 50);
    // }
    // if (this.isInitialLoad == true) {
    //   setTimeout(() => {
    //     this.setDefaultView();
    //     this.setDefaultViewProvider();
    //     this.isInitialLoad = false;
    //     console.log('true call');

    //   }, 50);
    // }


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
  getprovidersNavigations() {
    this.mainService.getProvidersNavigationsList().subscribe((res: any) => {
      if (res) {
        // ProviderList without games
        let allProviderListNullGame = res.filter((game: any) => (game?.gameId == null || game?.gamId == ''))
        this.navProviderList = allProviderListNullGame.sort((a: any, b: any) => a.providerSequence - b.providerSequence);

        // ProviderList with games
        let allProviderListWithGame = res.filter((game: any) => (game?.gameId !== null && game?.gamId !== ''))

        const groupedData = allProviderListWithGame.reduce((acc: any, item: any) => {
          // Check if the providerTitle already exists in the accumulator
          if (!acc[item.providerTitle]) {
            acc[item.providerTitle] = [];
          }
          // Add the item to the respective group
          acc[item.providerTitle].push(item);
          return acc;
        }, {});
        // Convert the grouped object back into an array format if needed
        const result = Object.keys(groupedData).map(providerTitle => ({
          providerTitle,
          games: groupedData[providerTitle].filter((game: any) => game.isFavorite).sort((a: any, b: any) => a.gameSequence - b.gameSequence)
        }));
        this.universeProviderGames = result.sort((a: any, b: any) => a.providerSequence - b.providerSequence);
        console.log('provides',this.universeProviderGames)
      }
    });
  }
  updateNavigationButtons() {
    if (this.stakeOrigin) {
      this.owlPrevBtn = this.stakeOrigin.isBeginning;
      this.owlNextBtn = this.stakeOrigin.isEnd;
    }
  }
  updateProviderNavigationButtons() {
    if (this.providerSwiper) {
      this.ProviderPrevBtn = this.providerSwiper.isBeginning;
      this.ProviderNextBtn = this.providerSwiper.isEnd;
    }
  }
  gotoEvent(event:any){
    console.log(event);
    if(event.providerTitle=='Universe'){
      this.networkService.goToMarketCurrent(event.gameId);
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

  stakeSlickInit(e: any) {
    this.stakeSlideCount = e.slick.slideCount;
  }

  providerSlickInit(e: any) {
    this.providerSlideCount = e.slick.slideCount;
  }

  stakeAfterChange(e: any) {
    this.stakeCurrentSlideIndex = e.currentSlide;
  }

  providerAfterChange(e: any) {
    this.providerCurrentSlideIndex = e.currentSlide;
  }

  // Tabs
  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  // Tabs
  setActiveTableTab(tabIndex: string): void {
    this.TableTab = tabIndex;
    this.mainService.setLiveBetRoom(this.TableTab);
  }

  // Table Tabs
  // setLiveTabActive(tab: string) {
  //   this.LiveTab = tab;
  // }
  setCasinoViewType() {
    this.casinoViewAllState = !this.casinoViewAllState;
    if (this.casinoViewAllState) {
      this.setGridView();
    } else {
      this.removeSwiperGridClass()
      setTimeout(() => {
        this.setDefaultView();
      }, 100);
    }
  }
  private initializeSwiper(config: any): void {
    if (this.stakeOrigin && typeof this.stakeOrigin.destroy === 'function') {
      this.stakeOrigin.destroy(true, true); // Destroy existing Swiper instance
    }
    this.stakeOrigin = new Swiper('.stake-swiper-lobby', config); // Initialize Swiper with new config
  }
  removeSwiperGridClass() {
    const swiperElement = document.querySelector('.swiper-grid');
    if (swiperElement) {
        swiperElement.classList.remove('swiper-grid');
    }
}
  private getDefaultSwiperConfig(): any {
    return {
      loop: false,
      slidesPerView: 7.5,
      slidesPerGroup: 6,
      freeMode: true,
      spaceBetween: 10,
      speed: 700,
      grid: { rows: 1, fill: 'row' },
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
        slideChange: () => this.updateNavigationButtons(),
        reachBeginning: () => (this.owlPrevBtn = true),
        reachEnd: () => (this.owlNextBtn = true),
      },
    };
  }
  private getGridSwiperConfig(): any {
    const totalSlides = this.universeProviderGames[0].games?.length;
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
  setDefaultView(): void {
    const config = this.getDefaultSwiperConfig();
    this.initializeSwiper(config);
  }

  setGridView(): void {
    const config = this.getGridSwiperConfig();
    this.initializeSwiper(config);
  }
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
    this.providerSwiper = new Swiper('.provider-swiper-lobby', config); // Initialize Swiper with new config
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
    const totalSlides = this.navProviderList.length;
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
