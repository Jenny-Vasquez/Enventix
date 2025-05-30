import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FrontNavbarComponent } from '../components/front-navbar/front-navbar.component';
import { RouterOutlet } from '@angular/router';
import { EventCardComponent } from "../components/event-card/event-card.component";
import { EventService } from '../event.service';
import { EventModel, EventToCreate } from 'src/app/models/event.model';


@Component({
  standalone: true,
  selector: 'app-event-dashboard',
  imports: [CommonModule, EventCardComponent],
  templateUrl: './event-dashboard.component.html',
  styleUrl: './event-dashboard.component.css',
})

export class EventDashboardComponent implements OnInit {
  events: EventModel[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Events received:', data); 
        this.events = data;
      },
      error: (err) => console.error('Error fetching events:', err)
    });
  }
}