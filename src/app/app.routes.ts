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
import { TimerComponent } from './shared/timer/timer.component';
import {DragonTigerComponent} from "./newCasino/dragon-tiger/dragon-tiger.component";

import { LiveBaccaratComponent } from './newCasino/live-baccarat/live-baccarat.component';

import { SicBoComponent } from './newCasino/sic-bo/sic-bo.component';
import { BaccaratComponent } from './casino/baccarat/baccarat.component';
import {VirtualDtComponent} from "./virtualCasino/virtual-dt/virtual-dt.component";
import { VirtualTeenpattiComponent } from './virtualCasino/virtual-teenpatti/virtual-teenpatti.component';



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
            path: 'timer',
            component: TimerComponent,
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
        path:'teenpatti/:id',
        component:TeenpattiComponent
      },
      {
        path: 'baccarat/:id',
        component: BaccaratComponent
      },
      {
        path:'dt/:id',
        component:TeenpattiComponent
      },
      {
        path:'Nteenpatti/:id',
        component:TeenpattiNewComponent
      },
      {
        path:'Ndt/:id',
        component:DragonTigerComponent
      },
      {
        path: 'sic-bo',
        component: SicBoComponent
      },
      {
        path:'live-baccarat/:id',
        component:LiveBaccaratComponent
      },
      {
        path:'Vdt/:id',
        component:VirtualDtComponent
      },
      {
        path:'Vteenpatti',
        component:VirtualTeenpattiComponent
      },
      {
        path: '**',
        component:PageNotFoundComponent
      },
    ],
  },

];
