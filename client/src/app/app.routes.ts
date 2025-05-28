import { Routes } from '@angular/router';
import { EventDesignerComponent } from './event-designer/event-designer.component';
import { EventViewerComponent } from './event-viewer/event-viewer.component';
import { EventListComponent } from './event-list/event-list.component';

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
  },
  {
    path: 'designer',
    component: EventDesignerComponent,
  },
  {
    path: 'ver-evento/:id',
    loadComponent: () => import('./event-viewer/event-viewer.component').then(m => m.EventViewerComponent),
  },
  {
    path: 'eventos',
    loadComponent: () => import('./event-list/event-list.component').then(m => m.EventListComponent),
  }
];
