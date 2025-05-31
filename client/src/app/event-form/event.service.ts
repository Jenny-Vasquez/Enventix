import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventModel } from '../models/event.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8000/api/eventCreate';


  constructor(private http: HttpClient, private authService: AuthService) { }

  createEvent(eventData: FormData): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.apiUrl, eventData, { headers });
  }
}
