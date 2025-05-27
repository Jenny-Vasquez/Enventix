import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Event {
  id: string;
  title: string;
  location: string;
  organizer: string;
  tags: string[];
  date: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getEventById(id: string) {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`);
  }

  getEventsUser(): Observable<Event[]> {
     return this.http.get<any>(`${this.apiUrl}/tickets`);
  }


}
