import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FrontNavbarComponent } from 'src/app/event-front/components/front-navbar/front-navbar.component';

@Component({
  selector: 'app-incidencia-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FrontNavbarComponent],
  templateUrl: './incidencia-detalle.component.html',
  styleUrl: './incidencia-detalle.component.css',
})
export class IncidenciaDetalleComponent implements OnInit {
  incidencia: any;
  errorMsg: string | null = null;
  userRole: string | null = null;
  incidenciaId: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole !== 'super-admin') {
      alert('No tienes permisos para ver esta incidencia.');
      this.router.navigate(['/']);
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      alert('No hay token. Redirigiendo al login...');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.incidenciaId = this.route.snapshot.paramMap.get('id');
    if (!this.incidenciaId) {
      alert('ID de incidencia no proporcionado.');
      this.router.navigate(['/admin/incidencias']);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get(`http://localhost:8000/api/contact/${this.incidenciaId}`, { headers }).subscribe({
      next: data => {
        if (!data) {
          alert('Incidencia no encontrada.');
          this.router.navigate(['/admin/incidencias']);
          return;
        }
        this.incidencia = data;
        console.log('Incidencia cargada:', this.incidencia);
      },
      error: err => {
        console.error(' Error al cargar la incidencia:', err);
        alert('No se pudo cargar la incidencia.');
      }
    });
  }

  resuelta() {
    if (!this.incidenciaId) {
      alert('ID de incidencia no encontrado.');
      return;
    }

    const confirmacion = confirm('¿Estás seguro de que esta incidencia está resuelta?');
    if (!confirmacion) return;

    const token = this.authService.getToken();
    if (!token) {
      alert('Token no disponible. Redirigiendo al login.');
      this.router.navigate(['/auth/login']);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete(`http://localhost:8000/api/contact/${this.incidenciaId}`, { headers }).subscribe({
      next: () => {
        alert('✅ Incidencia eliminada correctamente');
        this.router.navigate(['/admin/incidencias']);
      },
      error: err => {
        console.error('❌ Error al eliminar la incidencia:', err);
        alert('No se pudo eliminar la incidencia.');
      }
    });
  }
}
