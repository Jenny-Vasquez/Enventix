import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }


  register(userData: { name: string, email: string, password: string, password_confirmation: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {

          // Guardar el token en localStorage
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole'); 
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserId(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
      map(res => res.id || res.user?.id || res.user?._id)
    );
  }

  getUserName(): string | null {
  const name = localStorage.getItem('userName');
  if (name) return name;

  // 2. Si no está en localstorage, intenta decodificar el JWT 
  const token = this.getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || payload.user?.name || null;
  } catch {
    return null;
  }
}
}