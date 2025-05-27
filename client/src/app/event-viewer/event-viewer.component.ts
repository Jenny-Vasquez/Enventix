import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-event-viewer',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {
  zones: any[] = [];
  selectedSeats: any[] = [];

  ngOnInit(): void {
    const saved = JSON.parse(localStorage.getItem('event_designs') || '[]');
    if (saved.length > 0) {
      this.zones = saved[saved.length - 1].zones;  // último diseño guardado
    }
  }

  toggleSeat(seat: any) {
    if (seat.status !== 'ocupado') {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
      }
    }
  }

  get total(): number {
    return this.selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0);
  }

  confirmPurchase() {
    alert(`¡Compra confirmada!\nAsientos: ${this.selectedSeats.length}\nTotal: $${this.total}`);
    this.selectedSeats = [];
  }
}
