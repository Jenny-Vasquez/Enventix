import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css',
})
export class IncidenciasComponent implements OnInit {
  incidencias: any[] = [];
  userRole: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole !== 'super-admin') {
      alert('No tienes permisos para ver las incidencias.');
      return;
    }

    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    this.http.get('http://localhost:8000/api/contact', { headers }).subscribe({
      next: (data: any) => {
        console.log('Incidencias cargadas:', data);
        this.incidencias = data;
      },
      error: err => {
        console.error('Error al cargar incidencias:', err);
        alert('No se pudieron cargar las incidencias. Revisa tu sesión o el servidor.');
      }
    });
  }
}