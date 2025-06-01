import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from "../components/event-card/event-card.component";
import { EventService } from '../event.service';
import { EventModel } from 'src/app/models/event.model';
import { EventFormComponent } from '../../event-form/event-form.component';

@Component({
  standalone: true,
  selector: 'app-event-dashboard',
  imports: [
    CommonModule,
    EventCardComponent,
    EventFormComponent,
  ],
  templateUrl: './event-dashboard.component.html',
  styleUrl: './event-dashboard.component.css',
})
export class EventDashboardComponent implements OnInit {
  events: EventModel[] = [];
  showEventForm = false; 

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error(err)
    });
  }

  toggleEventForm(): void {
    this.showEventForm = !this.showEventForm;
  }

  onEventCreated(): void {
    this.loadEvents();
    this.showEventForm = false;
  }
}
