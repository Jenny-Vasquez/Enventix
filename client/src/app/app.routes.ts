import { Routes } from '@angular/router';
import { EventDesignerComponent } from './event-designer/event-designer.component';
import { EventViewerComponent } from './event-viewer/event-viewer.component';
import { EventListComponent } from './event-list/event-list.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'designer',
    
    pathMatch: 'full'
  },
  {
    path: 'designer',
    component: EventDesignerComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'ver-evento/:id',
    loadComponent: () => import('./event-viewer/event-viewer.component').then(m => m.EventViewerComponent)
  },
  {
    path: 'eventos',
    loadComponent: () => import('./event-list/event-list.component').then(m => m.EventListComponent)
  }
  
];
