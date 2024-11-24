import { Route } from '@angular/router';
import { AdminStartpagePage } from './pages/admint-startpage.page';
import { AdminShell } from './layout/admin.shell';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AdminShell,
    children: [{ path: '', component: AdminStartpagePage }],
  },
];