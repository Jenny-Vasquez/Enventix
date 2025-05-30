import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, RouterLink],
})

export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (!this.formData.email || !this.formData.password) {
      alert('Please fill in all fields');
      return;
    }

    const payload = {
      email: this.formData.email,
      password: this.formData.password
    };

    this.http.post('http://localhost:8000/api/login', payload)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('userRole', res.role);
          // alert('Login successful!');

          this.router.navigateByUrl('/event-front').then(success => {
            console.log('✅ ¿Navegación exitosa?', success);
          });
        },
        error: err => {
          console.error('Login failed:', err);
          alert('Login failed: ' + (err.error?.message || err.message));
        }
      });
  }
}
