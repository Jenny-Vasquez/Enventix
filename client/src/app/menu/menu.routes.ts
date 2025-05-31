import { Routes } from "@angular/router";
import { EditAccountComponent } from "./edit-account/edit-account.component";
import { LayoutMenuComponent } from "./layout-menu/layout-menu.component";
import { MyEventsComponent } from "./my-events/my-events.component";


export const menuRoutes: Routes = [
  {
     path: '',
    component: LayoutMenuComponent,
    children: [
      { path: 'myAccount', component: EditAccountComponent },
      { path: 'myTickets',  loadComponent: () => import('./tickets/tickets.component').then(m => m.TicketsComponent) },
      { path: 'myEvents', loadComponent: () => import('./my-events/my-events.component').then(m => m.MyEventsComponent) },
      { path: '', redirectTo: '/event-front', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },


]

export default menuRoutes;