import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnDestroy,
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
export class LobbyComponent implements OnInit, AfterViewInit, OnDestroy {
  owlPrevBtn: boolean = true;
  owlNextBtn: boolean = false;
  navigationStates: { prevDisabled: boolean; nextDisabled: boolean }[] = [];
  swiperIndex:any
  ProviderPrevBtn: boolean = true;
  ProviderNextBtn: boolean = false;
  public swiperInstances: Swiper[] = [];
  swiperLoader:boolean = false
  providerSwiper!: Swiper;
  previousIndex: number | null = null;
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
        const firstIndex = {
          "providerTitle": "test",
          "games": [
            {
              "_id": "67c3481c19e7bbba6334e237",
              "providerTitle": "Universe",
              "providerSequence": 0,
              "gameName": "TEEN PATTI",
              "gameId": "99.0010",
              "gameSequence": 1,
              "gameStatus": "ACTIVE",
              "isMaintenance": false,
              "type": "GAME",
              "isFavorite": true,
              "createdAt": "2025-03-01T17:47:08.903Z",
              "updatedAt": "2025-03-13T09:05:19.412Z",
              "gameImage": "https://v2.universestudio.online/v2/operator/games/csp/game-img-1741856719275-teen.png",
              "providerImage": null
            },
            {
              "_id": "67ceb75517cb549abd82775a",
              "providerTitle": "Universe",
              "providerSequence": 0,
              "gameName": "Virtual Teen Patti",
              "gameId": "88.0011",
              "gameSequence": 2,
              "gameStatus": "ACTIVE",
              "isMaintenance": false,
              "type": "GAME",
              "isFavorite": true,
              "createdAt": "2025-03-10T09:56:37.827Z",
              "updatedAt": "2025-03-10T11:18:29.281Z",
              "gameImage": "https://v2.universestudio.online/v2/operator/games/csp/game-img-1741600597715-teenpatti.png",
              "providerImage": null
            },
            {
              "_id": "67d29f3417cb549abd827abe",
              "providerTitle": "Universe",
              "providerSequence": 0,
              "gameName": "Dragon Tiger",
              "gameId": "99.0018",
              "gameSequence": 3,
              "gameStatus": "ACTIVE",
              "isMaintenance": false,
              "type": "GAME",
              "isFavorite": true,
              "createdAt": "2025-03-13T09:02:44.322Z",
              "updatedAt": "2025-03-13T09:05:26.811Z",
              "gameImage": "https://v2.universestudio.online/v2/operator/games/csp/game-img-1741856564209-dragon.png",
              "providerImage": null
            },
            {
              "_id": "67d2a01017cb549abd827acd",
              "providerTitle": "Universe",
              "providerSequence": 0,
              "gameName": "Baccarat",
              "gameId": "99.0001",
              "gameSequence": 4,
              "gameStatus": "ACTIVE",
              "isMaintenance": false,
              "type": "GAME",
              "isFavorite": true,
              "createdAt": "2025-03-13T09:06:24.018Z",
              "updatedAt": "2025-03-13T09:06:45.663Z",
              "gameImage": "https://v2.universestudio.online/v2/operator/games/csp/game-img-1741856783976-baccart.png",
              "providerImage": null
            },
            {
              "_id": "67d678c46c008ae8aeb487d8",
              "providerTitle": "Universe",
              "providerSequence": 0,
              "gameName": "Sic Bo",
              "gameId": "99.0061",
              "gameSequence": 5,
              "gameStatus": "ACTIVE",
              "isMaintenance": false,
              "type": "GAME",
              "isFavorite": true,
              "createdAt": "2025-03-16T07:07:48.537Z",
              "updatedAt": "2025-03-16T07:07:50.916Z",
              "gameImage": "https://v2.universestudio.online/v2/operator/games/csp/game-img-1742108868481-sicbo1.png",
              "providerImage": null
            }
          ]
        }
        // this.universeProviderGames.push(firstIndex)
        console.log('provides',this.universeProviderGames)
      }
    });
  }


  private updateNavigationButtons(index: number): void {
    console.log('Updating navigation for index:', index);
    console.log('swiperInstances:', this.swiperInstances);
    console.log('navigationStates:', this.navigationStates);

    if (!this.swiperInstances[index]) return;
    // Ensure navigationStates[index] exists
    if (!this.navigationStates[index]) {
      this.navigationStates[index] = { prevDisabled: false, nextDisabled: false };
    }

    this.navigationStates[index].prevDisabled = this.swiperInstances[index].isBeginning;
    this.navigationStates[index].nextDisabled = this.swiperInstances[index].isEnd;
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



  setCasinoViewType(i: any) {
    if (this.previousIndex === i) {
      const swiperElements = document.querySelectorAll('.swiper-grid');
      swiperElements.forEach((element: any) => {
          element.classList.remove('swiper-grid');
          this.setDefaultView();
      });
      this.previousIndex = null;
      return;
    }

    this.swiperIndex = i;

    if (this.swiperIndex === i) {
      this.setGridView();
    } else {
      this.removeSwiperGridClass();
      setTimeout(() => {
        this.setDefaultView();
      }, 100);
    }

    const swiperElements = document.querySelectorAll('.swiper-grid');
    swiperElements.forEach((element: any, index: any) => {
      if (i !== index) {
        element.classList.remove('swiper-grid');
      }
    });

    this.previousIndex = i;

    console.log(i);
  }



  private initializeSwiper(config: any, index: number): void {
    const selector = `.stake-swiper-lobby${index}`;
    const element = document.querySelector(selector);

    if (!element) {
      console.warn(`Swiper container not found for selector: ${selector}`);
      return;
    }


    if (!this.navigationStates[index]) {
      this.navigationStates[index] = { prevDisabled: true, nextDisabled: false };
    }


    if (this.swiperInstances[index] && typeof this.swiperInstances[index].destroy === 'function') {
      this.swiperInstances[index].destroy(true, true);
    }


    this.swiperInstances[index] = new Swiper(selector, {
      ...config,
      on: {
        init: (swiper: any) => {
          this.updateButtonStates(swiper, index);
        },
        slideChange: (swiper: any) => {
          this.updateButtonStates(swiper, index);
        }
      }
    });

    this.swiperLoader = true;
  }

  // Method to update button states based on Swiper's position
  private updateButtonStates(swiper: any, index: number): void {
    this.navigationStates[index].prevDisabled = swiper.isBeginning;
    this.navigationStates[index].nextDisabled = swiper.isEnd;
  }



  removeSwiperGridClass() {
    const swiperElement = document.querySelector('.swiper-grid');
    if (swiperElement) {
        swiperElement.classList.remove('swiper-grid');
    }
}

 private getDefaultSwiperConfig(index: number): any {
    return {
      loop: false,
      slidesPerView: 7.5,
      slidesPerGroup: 6,
      freeMode: true,
      spaceBetween: 10,
      speed: 700,
      grid: { rows: 1, fill: 'row' },
      navigation: {
        nextEl: `.myCarouselRight${index}`,
        prevEl: `.myCarouselLeft${index}`,
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
        slideChange: () => this.updateNavigationButtons(index),
        reachBeginning: () => (this.navigationStates[index].prevDisabled = true),
        reachEnd: () => (this.navigationStates[index].nextDisabled = true),
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
    this.universeProviderGames.forEach((ele:any, index: number) => {
      const config = this.getDefaultSwiperConfig(index);
      this.initializeSwiper(config, index);
    });
  }

  setGridView(): void {
    const config = this.getGridSwiperConfig();
    this.universeProviderGames.forEach((ele: any, index: number) => {
      this.initializeSwiper(config, index);
    });
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
  ngOnDestroy(): void {
    this.swiperLoader = false
  }
}
