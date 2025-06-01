import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from "../components/event-card/event-card.component";
import { EventService } from '../event.service';
import { EventModel } from 'src/app/models/event.model';
import { EventFormComponent } from 'src/app/event-form/event-form.component';

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
  filteredEvents: EventModel[] = [];
  tags: string[] = ['Concert', 'Theatre', 'Comedy', 'Sport'];
  selectedTag: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = data;
      },
      error: (err) => console.error('Error fetching events:', err)
    });
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;
    if (!tag) {
      
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(event =>
        event.tags && event.tags.includes(tag)
      );
      console.log(this.filteredEvents);
    }
  }
}