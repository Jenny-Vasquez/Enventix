import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event-front/event.service';
import { EventCardComponent } from "../../event-front/components/event-card/event-card.component";
import { EventModel } from 'src/app/models/event.model';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css',
})
export class MyEventsComponent implements OnInit {
  myEvents: EventModel[] = [];

  constructor(
  private eventService: EventService,
  private authService: AuthService,
  private http: HttpClient
) { }

ngOnInit(): void {
  this.authService.getUserId().subscribe({
    next: (userId) => {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>(`http://localhost:8000/api/myEvents`, { headers }).subscribe({
        next: (events) => {
          console.log('Eventos recibidos de laravel: ', events );
          this.myEvents = events.map(event => ({
            ...event,
            organizer: typeof event.organizer === 'string' ? JSON.parse(event.organizer) : event.organizer
          }));
        },
        error: (err) => console.error('Error cargando eventos del usuario:', err)
      });
    },
    error: (err) => console.error('Error obteniendo el ID del usuario:', err)
  });
}


  

}

