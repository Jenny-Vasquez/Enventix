import { Routes } from '@angular/router';
import { PlanDesignerComponent } from './plan-designer/plan-designer.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import { EventFormComponent } from './event-form/event-form.component';

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
    component: PlanDesignerComponent,
  },
  {
    path: 'ver-evento/:id',
    loadComponent: () => import('./plan-viewer/plan-viewer.component').then(m => m.PlanViewerComponent),
  },
  {
    path: 'myPlans',
    loadComponent: () => import('./plan-list/plan-list.component').then(m => m.PlanListComponent),
  },
  {
    path: 'createEvent',
    loadComponent: () => import('./event-form/event-form.component').then(m => m.EventFormComponent),
  }

];