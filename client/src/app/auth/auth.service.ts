import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  
  register(userData: { name: string, email: string, password: string, password_confirmation: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  
  login(credentials: { name: string, email: string, password: string, password_confirmation: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }
}
