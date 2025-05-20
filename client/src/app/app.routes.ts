import { Routes } from '@angular/router';
import { EventDesignerComponent } from './event-designer/event-designer.component';

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
  }
];
