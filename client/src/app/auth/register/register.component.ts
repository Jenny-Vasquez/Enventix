import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, RouterLink],
})
export class RegisterComponent {
  formData = {
    fullName: '',
    rol: 'customer',
    email: '',
    password: '',
    repeatPassword: '',
    terms: false
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.formData.password !== this.formData.repeatPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!this.formData.terms) {
      alert('You must accept the terms');
      return;
    }

    const payload = {
      name: this.formData.fullName,
      email: this.formData.email,
      password: this.formData.password,
      password_confirmation: this.formData.repeatPassword,
      role: this.formData.rol
    };

    this.http.post('http://localhost:8000/api/register', payload)
      .subscribe({
        next: res => alert('Registered!'),
        error: err => {
          console.error('Error:', err);
          alert('Error: ' + JSON.stringify(err.error) || err.message);
        }
      
      });
  }
}
