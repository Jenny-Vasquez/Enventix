import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Event, Seat } from '../models/event.model';
import { Review } from '../models/review.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {
  event!: Event;
  selectedSeats: Seat[] = [];

  newReview: Review = {
    user: 'Invitado',
    rating: 5,
    comment: '',
    date: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const events = JSON.parse(localStorage.getItem('event_designs') || '[]');
    this.event = events.find((e: any) => e.id === id);

    if (!this.event) {
      alert('Evento no encontrado.');
    } else {
      if ((this.event as any).zones) {
        (this.event as any).design = (this.event as any).zones;
      }

      if (!this.event.design) {
        alert('El evento no tiene zonas definidas.');
      }
    }
  }

  toggleSelection(seat: Seat): void {
    if (seat.status !== 'disponible') return;

    const index = this.selectedSeats.indexOf(seat);
    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }
  }
/**
 * Reserva de asiento, cambio en el estado de libre a ocupado,
 * para que no se vuelva a seccionar tras la reserva
 * 
 */
  reserveSeats(): void {
    if (this.selectedSeats.length === 0) return;

    // Marcar como ocupados
    for (let seat of this.selectedSeats) {
      seat.status = 'ocupado';
      seat.price = 0;
    }

    // Guardar cambios en localStorage
    const saved = JSON.parse(localStorage.getItem('event_designs') || '[]');
    const index = saved.findIndex((e: any) => e.id === this.event.id);
    if (index !== -1) {
      saved[index] = this.event;
      localStorage.setItem('event_designs', JSON.stringify(saved));
    }

    alert(`Has reservado ${this.selectedSeats.length} asiento(s).`);
    this.selectedSeats = [];
  }

  submitReview(): void {
    if (!this.newReview.comment.trim()) return;

    this.newReview.date = new Date().toISOString();

    if (!this.event.reviews) this.event.reviews = [];
    this.event.reviews.push({ ...this.newReview });

    this.saveReviewToStorage();
    this.newReview.comment = '';
  }

  saveReviewToStorage(): void {
    const saved = JSON.parse(localStorage.getItem('event_designs') || '[]');
    const index = saved.findIndex((e: any) => e.id === this.event.id);
    if (index !== -1) {
      saved[index] = this.event;
      localStorage.setItem('event_designs', JSON.stringify(saved));
    }
  }
}
