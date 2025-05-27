import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {
  design: any;
  selectedSeats: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const designs = JSON.parse(localStorage.getItem('event_designs') || '[]');
    this.design = designs.find((d: any) => d.id === id);

    if (!this.design) {
      alert('Evento no encontrado.');
    }
  }

  toggleSelection(seat: any): void {
    if (seat.status !== 'disponible') return;

    const index = this.selectedSeats.indexOf(seat);
    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  reserveSeats(): void {
    alert(`Has reservado ${this.selectedSeats.length} asiento(s).`);
    console.log('Asientos seleccionados:', this.selectedSeats);
  }
}
