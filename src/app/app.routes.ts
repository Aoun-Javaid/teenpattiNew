import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path:'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  },
    {
        path: "",
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            redirectTo: "dashboard",
            pathMatch: "full", // Ensures that only the exact empty path redirects
          },
          {
            path: "player-list",
            loadComponent: () => import('./components/player-list/player-list.component').then(m => m.PlayerListComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "operator-list",
            loadComponent: () => import('./components/operator-list/operator-list.component').then(m => m.OperatorListComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "bet-reports",
            loadComponent: () => import('./components/bet-reports/bet-reports.component').then(m => m.BetReportsComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "pl-report-user-wise",
            loadComponent: () => import('./components/pl-report-user-wise/pl-report-user-wise.component').then(m => m.PlReportUserWiseComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "pl-report-game-wise",
            loadComponent: () => import('./components/pl-report-game-wise/pl-report-game-wise.component').then(m => m.PlReportGameWiseComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "market-analysis",
            loadComponent: () => import('./components/market-analysis/market-analysis.component').then(m => m.MarketAnalysisComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "lobby-settings",
            loadComponent: () => import('./components/lobby-settings/lobby-settings.component').then(m => m.LobbySettingsComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "results",
            loadComponent: () => import('./components/results/results.component').then(m => m.ResultsComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "invoice",
            loadComponent: () => import('./components/invoice/invoice.component').then(m => m.InvoiceComponent),
            canActivate: [AuthGuard],
          },
          {
            path: "settings",
            loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent),
            canActivate: [AuthGuard],
          },
        ],
      },
];
