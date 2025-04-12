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
  private mobNavIndex = new Subject<string>();
  private ChatMobSidebarState = new Subject<string>();
  private quickStakeEditSidebarState = new Subject<string>();

  isRoundStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  bgMusicState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  gameSoundState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  betHistoryModalState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  gameAnimationState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  howToPlayModalState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  detailedRulesModalState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  provablyFairModalState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  provablyFairDetailsState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  freeBetModalState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  provablyFairSettingsState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  changeSeedModalState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  myBetsHistoryModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  gameLimitModalState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  autoPlayOptionsModalState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  changeAvatarModalState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  toasterSuccessData: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  toasterErrorData: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);

  toasterState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private AllBets: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  private mybets: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(
    null
  );
  btnSoundState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cashOutSoundState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private cancelledBet = new Subject<string>();

  private bgSoundState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  private balloonEvents: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private autoPlayState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  stakesChanged: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  getMobileSideBarState() {
    return this.mobSideBarState;
  }

  getStakeChanged() {
    return this.stakesChanged;
  }

  getMobileNavState() {
    return this.mobNavIndex;
  }

  setMobileNavState(value:any) {
    this.mobNavIndex.next(value)
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

  public getQuickStakeEditSidebarState(): Observable<any> {
    return this.quickStakeEditSidebarState.asObservable();
  }

  public setQuickStakeEditSidebarState(message: any): void {
    this.quickStakeEditSidebarState.next(message);
  }


  setMobSideBarState(val: boolean) {
    this.mobSideBarState.next(val);
  }
  setStakeChanged(val:any) {
    this.stakesChanged.next(val);
  }
  setMobSideBarContent(val: string) {
    this.mobSideBarContent.next(val);
  }

  getButtonSoundState() {
    return this.btnSoundState;
  }
  getCashoutSoundState() {
    return this.cashOutSoundState;
  }
  getBgMusicState() {
    return this.bgMusicState;
  }

  getGameSoundState() {
    return this.gameSoundState;
  }
  getProvablyFairModalState() {
    return this.provablyFairModalState;
  }

  getProvablyFairDetails() {
    return this.provablyFairDetailsState;
  }
  getDetailedRuleModalState() {
    return this.detailedRulesModalState;
  }

  getGameAnimationState() {
    return this.gameAnimationState;
  }

  getBetHistoryModalState() {
    return this.betHistoryModalState;
  }

  getFreeBetModalState() {
    return this.freeBetModalState;
  }

  getHowToPlayModalState() {
    return this.howToPlayModalState;
  }

  getProvablyFairSettingState() {
    return this.provablyFairSettingsState;
  }
  getChangeSeedState() {
    return this.changeSeedModalState;
  }

  getToasterSuccessData() {
    return this.toasterSuccessData;
  }

  getToasterErrorData() {
    return this.toasterErrorData;
  }

  getMyBetHistoryModalState() {
    return this.myBetsHistoryModal;
  }
  getGameLimitState() {
    return this.gameLimitModalState;
  }
  getRoundStartState() {
    return this.isRoundStarted;
  }
  setMyBets(mybets: any) {
    this.mybets.next(mybets);
  }
  getMyBets(): BehaviorSubject<any | null> {
    return this.mybets;
  }
  getAutoPlayOptionsModalState() {
    return this.autoPlayOptionsModalState;
  }
  getChangeAvatarModalState() {
    return this.changeAvatarModalState;
  }

  getToasterState() {
    return this.toasterState;
  }

  setHowToPlayModalState(val: boolean) {
    this.howToPlayModalState.next(val);
  }

  setBetHistoryModalState(val: boolean) {
    this.betHistoryModalState.next(val);
  }
  setGameAnimationState(val: boolean) {
    this.gameAnimationState.next(val);
  }
  setGameSoundState(val: boolean) {
    this.gameSoundState.next(val);
  }

  setDetailedRuleModalState(val: boolean) {
    this.detailedRulesModalState.next(val);
  }
  setBgMusicState(val: boolean) {
    this.bgMusicState.next(val);
  }

  setProvablyFairModalState(val: boolean) {
    this.provablyFairModalState.next(val);
  }
  setProvablyFairDetails(val: boolean) {
    this.provablyFairDetailsState.next(val);
  }

  setFreeBetModalState(val: boolean) {
    this.freeBetModalState.next(val);
  }

  setProvablyFairSettingState(val: boolean) {
    this.provablyFairSettingsState.next(val);
  }

  setChangeSeedModalState(val: boolean) {
    this.changeSeedModalState.next(val);
  }
  setMyBetHistoryModalState(val: boolean) {
    this.myBetsHistoryModal.next(val);
  }

  setGameLimitModalState(val: boolean) {
    this.gameLimitModalState.next(val);
  }
  setRoundStartState(val: boolean) {
    this.isRoundStarted.next(val);
  }
  setAutoPlayOptionsModalState(val: boolean) {
    this.autoPlayOptionsModalState.next(val);
  }

  setChangeAvatarModalState(val: boolean) {
    this.changeAvatarModalState.next(val);
  }
  setAllBets(mybets: any) {
    this.AllBets.next(mybets);
  }
  getAllBets(): BehaviorSubject<any | null> {
    return this.AllBets;
  }
  setToasterSuccessData(val: any) {
    this.toasterSuccessData.next(val);
  }
  setToasterErrorData(val: any) {
    this.toasterErrorData.next(val);
  }
  setToasterState(val: boolean) {
    this.toasterState.next(val);
  }
  setcancelledBet(val: any) {
    this.cancelledBet.next(val);
  }
  getcancelledBet(): Observable<any> {
    return this.cancelledBet.asObservable();
  }
  setBtnSoundState(val: boolean) {
    this.btnSoundState.next(val);
  }
  setCashOutSoundState(val: boolean) {
    this.cashOutSoundState.next(val);
  }
  getBalloonEvents() {
    return this.balloonEvents;
  }
  setBalloonEvents(val: any) {
    this.balloonEvents.next(val);
  }
  getAutoPlay() {
    return this.autoPlayState;
  }

  setAutoPlay(val: any) {
    this.autoPlayState.next(val);
  }
  getSoundState() {
    return this.bgSoundState;
  }

  setBgSoundState(val: boolean) {
    this.bgSoundState.next(val);
  }
}
