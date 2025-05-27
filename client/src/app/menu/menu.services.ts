import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }


    getUser(): Observable<any> {
        const token = localStorage.getItem('authToken');
        const headers = token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : undefined;

        return this.http.get(`${this.apiUrl}/user`, { headers });
    }

    updateUser(data: any): Observable<any> {
        const token = localStorage.getItem('authToken');
        const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
        return this.http.put(`${this.apiUrl}/user`, data, { headers });
    }
}
