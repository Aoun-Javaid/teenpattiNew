import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { ToggleService } from '../../services/toggle.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-mob-navigation',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass, NgIf],
  templateUrl: './mob-navigation.component.html',
  styleUrl: './mob-navigation.component.css',
})
export class MobNavigationComponent implements OnInit {
  mobSideBarState: boolean = false;
  viewType = 'Profile';
  parentRouteName: string = '';
  currentRoute: string = '';
  navItemIndex: any
  browseNav: boolean = false;
  ProfileNav: boolean = false;
  ChatNav: boolean = false;
  buttons = [
    {
      text: 'Exit',
      view: '0 0 64 64',
      clickFunction: this.gotoOrignalSite.bind(this),
      svgPath: 'M32 1.916c-.288-.01-.628-.016-.97-.016C14.254 1.9.586 15.206.002 31.84L0 31.894A28.655 28.655 0 0 0 7.476 51.15l-.02-.024c-.688 4.028-1.89 7.636-3.552 10.974l.102-.228c4.634-.396 8.878-1.73 12.654-3.81l-.164.082c4.474 2.35 9.774 3.728 15.398 3.728h.112H32c.3.01.654.016 1.008.016 16.768 0 30.428-13.31 30.99-29.942l.002-.052C63.414 15.206 49.746 1.902 32.97 1.902c-.342 0-.68.006-1.018.016l.05-.002H32ZM16.138 37.604a5.948 5.948 0 1 1 0-11.896 5.948 5.948 0 0 1 0 11.896Zm15.862 0a5.948 5.948 0 1 1 0-11.896 5.948 5.948 0 0 1 0 11.896Zm15.862 0a5.948 5.948 0 1 1 0-11.896 5.948 5.948 0 0 1 0 11.896Z',
    },
    {
      text: 'Browse',
      clickFunction: this.openBrowseMobSidebar.bind(this),
      svgPath: 'M0 0h23.867c-3.947 3.173-7.014 7.333-8.827 12.107H0V0Zm0 51.867h41.707v12.106H0V51.867Zm13.36-25.92H0v12.106h17.867a28.537 28.537 0 0 1-4.48-12.106h-.027ZM57.014 38.32l6.987 10.96-8.08 5.173-7.12-11.146c-2.24.773-4.64 1.2-7.12 1.2-12.24 0-22.187-9.947-22.187-22.187 0-12.24 9.947-22.187 22.187-22.187 12.24 0 22.187 9.947 22.187 22.187 0 6.293-2.64 11.947-6.854 16ZM41.681 9.733c-6.933 0-12.587 5.654-12.587 12.587s5.654 12.587 12.587 12.587 12.587-5.654 12.587-12.587S48.614 9.733 41.68 9.733Z',
      view: '0 0 64 64'
    },
    // {
    //   text: 'Casino',
    //   view: '0 0 64 64',
    //   clickFunction: this.navigateCasino.bind(this),
    //   svgPath: 'M12.265 47.726.21 14.603a3.574 3.574 0 0 1 2.108-4.553l.024-.007 19.282-7.015a3.55 3.55 0 0 1 4.553 2.082l.008.024.694 1.92L12.69 46.073a8.9 8.9 0 0 0-.418 1.598l-.008.056ZM63.79 15.511 48.002 58.93a3.529 3.529 0 0 1-4.558 2.1l.024.009-21.948-8.001a3.58 3.58 0 0 1-2.124-4.585l-.008.024 15.787-43.39a3.555 3.555 0 0 1 4.559-2.126l-.024-.008 21.948 8a3.58 3.58 0 0 1 2.124 4.585l.008-.024v-.002ZM50.457 32.685l-1.386-3.254a1.789 1.789 0 0 0-2.333-.956l.012-.004-2.666 1.174a1.787 1.787 0 0 1-2.316-.948l-.004-.012-1.146-2.667a1.764 1.764 0 0 0-2.332-.93l.012-.004-3.28 1.386a1.738 1.738 0 0 0-.929 2.33l-.004-.01 3.92 9.255a1.816 1.816 0 0 0 2.359.928l-.012.005 9.227-3.947a1.737 1.737 0 0 0 .794-2.356l.004.01h.08Z',
    // },
    // {
    //   text: 'Bet Slip',
    //   view: '0 0 64 64',
    //   clickFunction: this.toggleBetslip.bind(this),
    //   svgPath: 'M.001 3.549v7.12h7.12v49.786h6.214c.778-3.122 3.556-5.398 6.866-5.398a7.07 7.07 0 0 1 6.856 5.348l.01.048h9.974c.778-3.122 3.556-5.398 6.866-5.398a7.07 7.07 0 0 1 6.856 5.348l.01.048h6.16V10.665h7.066v-7.12L.001 3.549Zm35.546 37.334h-17.76v-5.334h17.76v5.334Zm10.668-14.214H17.789v-5.334h28.426v5.334Z',
    // },
    {
      text: 'Home',
      view: '0 0 20 21',
      clickFunction: this.gotoHome.bind(this),
      svgPath: 'M7.14373 19.2339V16.1003C7.14372 15.3063 7.77567 14.6612 8.55844 14.6562H11.4326C12.2189 14.6562 12.8563 15.3028 12.8563 16.1003V19.2248C12.8562 19.9135 13.404 20.4732 14.0829 20.4782H16.0438C16.9596 20.4806 17.8388 20.1133 18.4872 19.4572C19.1356 18.8012 19.5 17.9104 19.5 16.9814V8.0803C19.5 7.32988 19.1721 6.61806 18.6046 6.1366L11.943 0.732383C10.7785 -0.212874 9.11537 -0.182339 7.98539 0.805045L1.46701 6.1366C0.872741 6.60386 0.517552 7.31779 0.5 8.0803V16.9723C0.5 18.9086 2.04738 20.4782 3.95617 20.4782H5.87229C6.19917 20.4806 6.51349 20.3506 6.74547 20.117C6.97746 19.8834 7.10793 19.5655 7.10792 19.2339H7.14373Z',
    },

    {
      text: 'Chat',
      view: '0 0 64 64',
      clickFunction: this.openChatMobSidebar.bind(this),
      svgPath: 'M32 1.916c-.288-.01-.628-.016-.97-.016C14.254 1.9.586 15.206.002 31.84L0 31.894A28.655 28.655 0 0 0 7.476 51.15l-.02-.024c-.688 4.028-1.89 7.636-3.552 10.974l.102-.228c4.634-.396 8.878-1.73 12.654-3.81l-.164.082c4.474 2.35 9.774 3.728 15.398 3.728h.112H32c.3.01.654.016 1.008.016 16.768 0 30.428-13.31 30.99-29.942l.002-.052C63.414 15.206 49.746 1.902 32.97 1.902c-.342 0-.68.006-1.018.016l.05-.002H32ZM16.138 37.604a5.948 5.948 0 1 1 0-11.896 5.948 5.948 0 0 1 0 11.896Zm15.862 0a5.948 5.948 0 1 1 0-11.896 5.948 5.948 0 0 1 0 11.896Zm15.862 0a5.948 5.948 0 1 1 0-11.896 5.948 5.948 0 0 1 0 11.896Z',
    },
    {
      text: 'Profile',
      view: '0 0 96 96',
      clickFunction: this.openProfileMobSidebar.bind(this),
      svgPath: 'M7.99682 13.1746C3.68382 13.1746 -0.000183105 13.8546 -0.000183105 16.5746C-0.000183105 19.2956 3.66082 19.9996 7.99682 19.9996C12.3098 19.9996 15.9938 19.3206 15.9938 16.5996C15.9938 13.8786 12.3338 13.1746 7.99682 13.1746Z',
      svgpath2: 'M7.99683 10.5837C10.9348 10.5837 13.2888 8.22869 13.2888 5.29169C13.2888 2.35469 10.9348 -0.000305176 7.99683 -0.000305176C5.05983 -0.000305176 2.70483 2.35469 2.70483 5.29169C2.70483 8.22869 5.05983 10.5837 7.99683 10.5837Z'
    },

  ];

  constructor(private toggle: ToggleService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.getMobSideBarState();
    this.getViewType();
    this.checkCurrentStates();
    this.toggle.getMobileNavState().subscribe((value) => {
      this.navItemIndex = value
    })
    this.currentRoute = this.router.url;
    this.parentRouteName = this.getParentRouteName();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.parentRouteName = this.getParentRouteName();
      });
  }

  private getParentRouteName(): string {
    let route = this.activatedRoute;
    let parentRouteName = '';

    while (route.firstChild) {
      route = route.firstChild;
    }

    const parentRoute = route.parent;

    if (parentRoute && parentRoute.snapshot) {
      parentRouteName = parentRoute.snapshot.routeConfig?.path || '';
    }

    return parentRouteName;
  }

  getViewType() {
    this.toggle.getMobSideBarContent().subscribe((val: string) => {
      this.viewType = val;
    });
  }
  getMobSideBarState() {
    this.toggle.getMobileSideBarState().subscribe((val: boolean) => {
      this.mobSideBarState = val;
    });
  }
  checkCurrentStates() {
    this.toggle.getBrowseMobSidebarState().subscribe((res: any) => {
      this.browseNav = res;
      // console.log('res',res)
      if (res == false) {
        document.body.classList.remove('overflow-hidden');
      }
    })
    this.toggle.getProfileMobSidebarState().subscribe((res: any) => {
      this.ProfileNav = res;
      if (res == false) {
        document.body.classList.remove('overflow-hidden');
      }
    })
    this.toggle.getChatMobSidebarState().subscribe((res: any) => {
      this.ChatNav = res;
      if (res == false) {
        document.body.classList.remove('overflow-hidden');
      }
    })
  }
  gotoHome() {
    this.closeMobSideBar();
    this.router.navigateByUrl('/home/lobby');
    if (this.parentRouteName === 'home') {
      const pageWrapper = document.querySelector(
        '.page-wrapper'
      ) as HTMLElement;
      if (pageWrapper) {
        pageWrapper.scrollTop = 0;
      }
    }
  }


  openMobSidebar(type: string) {

    if (this.mobSideBarState && this.viewType === type) {
      this.closeMobSideBar();
    }
  }
  gotoOrignalSite() {
    this.closeMobSideBar();
  }

  // Wrapper functions for specific sidebar types
  openBrowseMobSidebar() {
    setTimeout(() => {
      this.toggle.setProfileMobSidebarState(false);
      this.toggle.setChatMobSidebarState(false);
    }, 700);


    this.toggle.setBrowseMobSidebarState(!this.browseNav);
    if (this.browseNav) {
      document.body.classList.add('overflow-hidden');
    }
  }

  getIndex(index: any) {
    this.navItemIndex = (this.navItemIndex === index) ? null : index;
    this.toggle.setMobileNavState(this.navItemIndex)
    if (!this.browseNav && !this.ProfileNav && !this.ChatNav) {
      this.toggle.setMobileNavState(null)
      this.navItemIndex  = null
    }
  }

  openProfileMobSidebar() {
    setTimeout(() => {
      this.toggle.setBrowseMobSidebarState(false);
      this.toggle.setChatMobSidebarState(false);
    }, 700);
    this.toggle.setProfileMobSidebarState(!this.ProfileNav);
    if (this.ProfileNav) {
      document.body.classList.add('overflow-hidden');
    }
  }

  openChatMobSidebar() {
    setTimeout(() => {
      this.toggle.setBrowseMobSidebarState(false);
      this.toggle.setProfileMobSidebarState(false);
    }, 700);
    this.toggle.setChatMobSidebarState(!this.ChatNav);
    if (this.ChatNav) {
      document.body.classList.add('overflow-hidden');
    }


  }
  closeMobSideBar() {
    document.body.classList.remove('overflow-hidden');
    this.toggle.setBrowseMobSidebarState(false);
    this.toggle.setProfileMobSidebarState(false);
    this.toggle.setChatMobSidebarState(false);
  }

}
