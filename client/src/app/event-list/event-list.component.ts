import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.events = JSON.parse(localStorage.getItem('event_designs') || '[]');
  }

  goToEvent(id: string) {
    this.router.navigate(['/ver-evento', id]);
  }
}
