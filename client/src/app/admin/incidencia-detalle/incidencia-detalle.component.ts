import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-incidencia-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './incidencia-detalle.component.html',
})
export class IncidenciaDetalleComponent implements OnInit {
  incidencia: any;
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMsg = 'No hay token. Redirigiendo al login...';
      console.warn(this.errorMsg);
      this.router.navigate(['/auth/login']);
      return;
    }

    this.http.get(`/api/contact/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.incidencia = data;
        console.log('✅ Incidencia cargada:', this.incidencia);
      },
      error: err => {
        console.error('❌ Error al cargar la incidencia:', err);
        this.errorMsg = 'No se pudo cargar la incidencia. Verifica si tienes permisos o si el ID es correcto.';
        alert(this.errorMsg);
      }
    });
  }

  resuelta() {
    if (!this.incidencia?._id) {
      alert('ID de incidencia no encontrado.');
      return;
    }

    const confirmacion = confirm('¿Estás seguro de que esta incidencia está resuelta?');
    if (!confirmacion) return;

    const token = localStorage.getItem('token');

    this.http.delete(`/api/contact/${this.incidencia._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
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
