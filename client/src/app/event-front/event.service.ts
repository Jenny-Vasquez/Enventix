import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel, EventToCreate } from '../models/event.model';

// export interface EventModel {
//   id: string;
//   title: string;
//   location: string;
//   organizer: string;
//   tags: string[];
//   date: string;
//   description: string;
// }

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}/events`);
  }

  getMyEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}/myEvents`);
  }

  getEventById(id: string) {
    return this.http.get<EventModel>(`${this.apiUrl}/events/${id}`);
  }

  getEventsUser(): Observable<EventModel[]> {
    return this.http.get<any>(`${this.apiUrl}/tickets`);
  }

  getSoldSeats(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${eventId}/sold-seats`);
  }

  getSoldSeatsByEventId(eventId: string) {
    return this.http.get<any[]>(`http://localhost:8000/api/tickets/event/${eventId}`);
  }


}
