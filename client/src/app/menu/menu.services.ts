import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders | undefined {
        const token = localStorage.getItem('authToken');
        return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    }

    getUser(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get(`${this.apiUrl}/user`, { headers });
    }

    updateUser(data: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put(`${this.apiUrl}/user`, data, { headers });
    }
}
