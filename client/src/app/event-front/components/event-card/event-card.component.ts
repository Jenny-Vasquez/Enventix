import { Component, Input } from '@angular/core';
import { EventService, Event  } from '../../event.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})

export class EventCardComponent {
  @Input() event!: Event;
}
