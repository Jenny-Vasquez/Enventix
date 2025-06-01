import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.css',
})
export class MyReviewsComponent implements OnInit {
  myReviews: any[] = [];
  eventsToReview: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:8000/api/user/reviews', { headers }).subscribe({
      next: (res) => (this.myReviews = res),
      error: (err) => console.error('Error al cargar reseñas', err)
    });

    this.http.get<any[]>('http://localhost:8000/api/events/without-review', { headers }).subscribe({
      next: (res) => (this.eventsToReview = res),
      error: (err) => console.error('Error al cargar eventos sin reseña', err)
    });
  }

  submitReview(event: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = {
      comment: event.comment,
      rating: event.rating
    };

    this.http.post(`http://localhost:8000/api/events/${event._id}/reviews`, payload, { headers }).subscribe({
      next: (res) => {
        console.log('Reseñas recibidas:', res); 
        this.ngOnInit(); // recarga listas
      },
      error: (err) => console.error('Error al enviar reseña', err)
    });
  }
}
