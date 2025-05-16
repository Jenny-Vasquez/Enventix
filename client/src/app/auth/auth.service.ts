import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/register'; // URL de la API en tu backend Laravel

  constructor(private http: HttpClient) { }

  // Función para registrar un nuevo usuario
  register(userData: { name: string, email: string, password: string, password_confirmation: string, role: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
