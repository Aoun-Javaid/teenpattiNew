import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { UniverseOriginalsComponent } from './pages/universe-originals/universe-originals.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthComponent } from './auth/auth.component';
import { BetStakesComponent } from './pages/bet-stakes/bet-stakes.component';
import { BetsComponent } from './pages/bets/bets.component';
import { MybetsComponent } from './pages/mybets/mybets.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CasinoOriginalsComponent } from './pages/casino-originals/casino-originals.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundError } from 'rxjs';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TeenpattiComponent } from './casino/teenpatti/teenpatti.component';
import { TeenpattiNewComponent } from './newCasino/teenpatti-new/teenpatti-new.component';
import {DragonTigerComponent} from "./newCasino/dragon-tiger/dragon-tiger.component";

import { LiveBaccaratComponent } from './newCasino/live-baccarat/live-baccarat.component';

import { SicBoComponent } from './newCasino/sic-bo/sic-bo.component';
import { BaccaratComponent } from './casino/baccarat/baccarat.component';
import {VirtualDtComponent} from "./virtualCasino/virtual-dt/virtual-dt.component";
import { VirtualTeenpattiComponent } from './virtualCasino/virtual-teenpatti/virtual-teenpatti.component';
import {TopCardComponent} from "./newCasino/top-card/top-card.component";
import { VirtualDragonComponent } from './virtualCasino/virtual-dragon/virtual-dragon.component';
import { VirtualTopcardsComponent } from './virtualCasino/virtual-topcards/virtual-topcards.component';
import { LiveRouletteComponent } from './newCasino/live-roulette/live-roulette.component';
import { LauncherComponent } from './auth/launcher/launcher.component';
import { CanvasIframesComponent } from './components/canvas-iframes/canvas-iframes.component';



export const routes: Routes = [
  {
    path: 'maintenance',
    component:MaintenanceComponent
  },
  {
    path: 'unauthorized',
    component:UnauthorizedComponent
  },
  {
    path: 'not-found',
    component:PageNotFoundComponent
  },
  {
    path: 'authentication/:token',
    component: AuthComponent
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        component: HomeComponent,

        children: [
          { path: '', redirectTo: 'lobby', pathMatch: 'full' },
          {
            path: 'lobby',
            component: LobbyComponent,
          },
          {
            path: 'universe-originals/:name',
            component: UniverseOriginalsComponent,
          },
          {
            path: 'providers',
            component: ProvidersComponent,
          },
        ],
      },
      {
        path: 'stakes',
        component:BetStakesComponent
      },
      {
        path: 'mybets',
        component:MybetsComponent
      },
      {
        path: 'notifications',
        component:NotificationsComponent
      },
      {
        path: 'originals/:name',
        component:CasinoOriginalsComponent
      },
      {
        path: 'transactions',
        component:TransactionsComponent
      },
      {
        path:'teenpatti',
        component:TeenpattiComponent
      },
      {
        path: 'baccarat',
        component: BaccaratComponent
      },
      {
        path:'dt',
        component:TeenpattiComponent
      },
      {
        path:'Nteenpatti',
        component:TeenpattiNewComponent
      },
      {
        path:'Ndt',
        component:DragonTigerComponent
      },
      {
        path: 'sic-bo',
        component: SicBoComponent
      },
      {
        path:'live-baccarat',
        component:LiveBaccaratComponent
      },
      {
        path:'Ntopcards',
        component:TopCardComponent
      },
      {
        path:'Vdt',
        component:VirtualDtComponent
      },
      {
        path:'Vteenpatti',
        component:VirtualTeenpattiComponent
      },
      {
        path: 'virtual-dragon',
        component: VirtualDragonComponent
      },
      {
        path: 'Vtopcards',
        component: VirtualTopcardsComponent
      },
      {
        path: 'live-roulette',
        component: LiveRouletteComponent
      },
      {
        path: 'casino',
        component: CanvasIframesComponent
      },
      {
        path: 'launch',
        component: LauncherComponent
      },

      {
        path: '**',
        component:PageNotFoundComponent
      },
    ],
  },

];
