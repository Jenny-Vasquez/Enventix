import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FrontNavbarComponent } from "../event-front/components/front-navbar/front-navbar.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, FrontNavbarComponent], 
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
    this.http.post('http://localhost:8000/api/contact', this.form).subscribe({
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
