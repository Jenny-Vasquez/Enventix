import { Routes } from '@angular/router';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { LayoutEventsComponent } from './layout-events/layout-events.component';
import { EditAccountComponent } from '../menu/edit-account/edit-account.component';
import { EventBuyComponent } from './event-buy/event-buy.component';
import { PayFormComponent } from './pay-form/pay-form.component';

export const eventRoutes: Routes = [
  // {
  //   path: 'event-dashboard',
  //   component: EventDashboardComponent,
  // },
  // {
  //   path: '**',
  //   redirectTo: 'event-dashboard',
  // },

  {

    path: 'layout-event',
    component: LayoutEventsComponent,
    children: [
      {
        path: '',
        component: EventDashboardComponent
      },
    
    ],
  },
  {
    path: 'myAccount',
    component: EditAccountComponent
  },
  {
    path: 'myTickets',
    loadComponent: () => import('../menu/tickets/tickets.component').then(m => m.TicketsComponent)
  },
  {
    path: 'EventBuy/:id',
    component: EventBuyComponent
  },
  {
    path: 'PayForm/:id',
    component: PayFormComponent
  }



];

export default eventRoutes;
