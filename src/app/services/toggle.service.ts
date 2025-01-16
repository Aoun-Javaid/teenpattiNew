import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  mobSideBarState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  mobSideBarContent: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Game'
  );

  private BrowseMobSidebarState = new Subject<string>();
  private ProfileMobSidebarState = new Subject<string>();
  private ChatMobSidebarState = new Subject<string>();

  constructor() {}

  getMobileSideBarState() {
    return this.mobSideBarState;
  }

  getMobSideBarContent() {
    return this.mobSideBarContent;
  }
  public getBrowseMobSidebarState(): Observable<any> {
    return this.BrowseMobSidebarState.asObservable();
  }

  public setBrowseMobSidebarState(message: any): void {
    this.BrowseMobSidebarState.next(message);
  }
  public getProfileMobSidebarState(): Observable<any> {
    return this.ProfileMobSidebarState.asObservable();
  }

  public setProfileMobSidebarState(message: any): void {
    this.ProfileMobSidebarState.next(message);
  }
  public getChatMobSidebarState(): Observable<any> {
    return this.ChatMobSidebarState.asObservable();
  }

  public setChatMobSidebarState(message: any): void {
    this.ChatMobSidebarState.next(message);
  }

  setMobSideBarState(val: boolean) {
    this.mobSideBarState.next(val);
  }

  setMobSideBarContent(val: string) {
    this.mobSideBarContent.next(val);
  }
}
