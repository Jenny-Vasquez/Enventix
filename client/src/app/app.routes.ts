import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/welcome',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'event-front',
    loadChildren: () => import('./event-front/event.routes').then(m => m.eventRoutes),
  },
  {
    path: 'menu',
     loadChildren: () => import('./menu/menu.routes').then(m => m.menuRoutes),
  }
];
