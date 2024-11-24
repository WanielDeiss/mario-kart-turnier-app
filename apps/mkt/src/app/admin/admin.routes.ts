import { Route } from '@angular/router';
import { AdminStartpagePage } from './pages/startpage/admint-startpage.page';
import { AdminShell } from './layout/admin.shell';
import { TournamentPage } from './pages/tournament/tournament.page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AdminShell,
    children: [
      { path: '', component: AdminStartpagePage },
      { path: 'tournament', component: TournamentPage },
    ],
  },
];
