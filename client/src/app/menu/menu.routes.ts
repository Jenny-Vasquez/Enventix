import { Routes } from "@angular/router";
import { EditAccountComponent } from "./edit-account/edit-account.component";
import { LayoutMenuComponent } from "./layout-menu/layout-menu.component";
import { MyEventsComponent } from "./my-events/my-events.component";
import { PlanListComponent } from "./plan-list/plan-list.component";
import { IncidenciasComponent } from "../admin/incidencias/incidencias.component";


export const menuRoutes: Routes = [
  {
     path: '',
    component: LayoutMenuComponent,
    children: [
      { path: 'myAccount', component: EditAccountComponent },
      { path: 'myTickets',  loadComponent: () => import('./tickets/tickets.component').then(m => m.TicketsComponent) },
      { path: 'myEvents', loadComponent: () => import('./my-events/my-events.component').then(m => m.MyEventsComponent) },
      {path: 'myPlans', loadComponent: () => import('./plan-list/plan-list.component').then(m => m.PlanListComponent)},
      { path: 'reviews', loadComponent: () => import('./my-reviews/my-reviews.component').then(m => m.MyReviewsComponent) },
      { path: 'incidencias',  loadComponent: () => import('../admin/incidencias/incidencias.component').then(m => m.IncidenciasComponent)},
      { path: '', redirectTo: '/event-front', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },


]

export default menuRoutes;