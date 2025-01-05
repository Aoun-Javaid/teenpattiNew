import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleService } from '../../services/toggle.service';

@Component({
  selector: 'app-mob-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mob-navigation.component.html',
  styleUrl: './mob-navigation.component.css',
})
export class MobNavigationComponent implements OnInit {
  mobSideBarState: boolean = false;
  viewType = 'Profile';

  constructor(private toggle: ToggleService) {}
  ngOnInit(): void {
    this.getMobSideBarState();
    this.getViewType();
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
  openBrowseMobSidebar() {
    if (this.mobSideBarState && this.viewType === 'Profile') {
      this.toggle.setMobSideBarContent('Game');
    } else if (this.mobSideBarState && this.viewType === 'Game') {
      this.closeMobSideBar();
    } else {
      this.toggle.setMobSideBarState(!this.mobSideBarState);
      this.toggle.setMobSideBarContent('Game');
    }
  }

  openProfileMobSidebar() {
    if (this.mobSideBarState && this.viewType === 'Game') {
      this.toggle.setMobSideBarContent('Profile');
    } else if (this.mobSideBarState && this.viewType === 'Profile') {
      this.closeMobSideBar();
    } else {
      this.toggle.setMobSideBarState(!this.mobSideBarState);
      this.toggle.setMobSideBarContent('Profile');
    }
  }
  closeMobSideBar() {
    this.toggle.setMobSideBarState(false);
  }
  openChatMobSidebar(){

  }
}
