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

export const routes: Routes = [
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
            path: 'universe-originals',
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
        path: 'authentication/:token',
        component: AuthComponent
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
