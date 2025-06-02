import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 esto es esencial
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 importa aquí FormsModule
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  form = {
    email: '',
    telefono: '',
    asunto: '',
    descripcion: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  enviarFormulario() {
    this.http.post('/api/contact', this.form).subscribe({
      next: () => {
        alert('Incidencia enviada correctamente');
        this.router.navigate(['/event-front']);
      },
      error: err => {
        alert('Error al enviar la incidencia');
        console.error(err);
      }
    });
  }
}
