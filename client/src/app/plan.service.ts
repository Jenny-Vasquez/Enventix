import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = 'http://localhost:8000/api';


  constructor(private http: HttpClient, private authService: AuthService) { }

  createPlan(eventData: FormData): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/plan-designs`, eventData, { headers });
  }

  getUserPlans(): Observable<{plans: any[]}> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<{plans: any[]}>(`${this.apiUrl}/myPlans`, { headers });
  }

  getPlanById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<any>(`${this.apiUrl}/viewPlan/${id}`, { headers });
  }

}
