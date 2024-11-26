import { Route } from '@angular/router';
import { Shell } from './layout/shell.shell';
import { StartpagePage } from './pages/startpage.page';
import { TournamentDetailsPage } from './pages/tournament-details.page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: StartpagePage },
      { path: 'tournament/:id', component: TournamentDetailsPage },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.appRoutes),
  },
];
