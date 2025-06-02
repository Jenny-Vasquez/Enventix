import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './incidencias.component.html'
})
export class IncidenciasComponent implements OnInit {
  incidencias: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    this.http.get('http://localhost:8000/api/contact', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data: any) => {
        console.log('✅ Incidencias cargadas:', data);
        this.incidencias = data;
      },
      error: err => {
        console.error('❌ Error al cargar incidencias:', err);
        alert('No se pudieron cargar las incidencias. Revisa tu sesión o el servidor.');
      }
    });
  }
}
