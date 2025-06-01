import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-designer',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './plan-designer.component.html',
  styleUrls: ['./plan-designer.component.css']
})
export class PlanDesignerComponent implements OnInit {
  zones: any[] = [];
  selectedZone: any = null;
  nextId = 1;
  planName: string = '';
  designs: any[] = [];
  seatsPerRow: number = 10;
  readonly padding = 50;
  readonly gridSize = 20;

  constructor(private router: Router, private http: HttpClient, private planService: PlanService) { }

  ngOnInit() {
    this.loadDesigns();
  }

  get gridWidth(): number {
    return Math.max(...this.zones.map(z => z.x + z.width), 800) + this.padding;
  }

  get gridHeight(): number {
    return Math.max(...this.zones.map(z => z.y + z.height), 600) + this.padding;
  }

  get totalSeats(): number {
    return this.zones.reduce((total, zone) => {
      const seats = zone.seatRows?.flat() || [];
      return total + seats.length;
    }, 0);
  }

  get totalRevenue(): number {
    return this.zones.reduce((sum: number, zone: any) => {
      const seats = zone.seatRows?.flat() || [];
      return sum + seats.reduce((zoneSum: number, seat: any) => zoneSum + (seat.price || 0), 0);
    }, 0);
  }

  addZone() {
    this.zones.push({
      id: this.nextId++,
      name: `Zona ${this.nextId - 1}`,
      x: 20,
      y: 20,
      width: 200,
      height: 100,
      color: '#87a0b9',
      capacity: 0,
      normalPrice: 10,
      preferencialPrice: 20,
      vipPrice: 30,
      seatRows: []
    });
  }

  removeZone(id: number) {
    this.zones = this.zones.filter(z => z.id !== id);
    if (this.selectedZone?.id === id) {
      this.selectedZone = null;
    }
  }

  selectZone(zone: any) {
    this.selectedZone = zone;
  }

  onDragEnd(plan: CdkDragEnd, zone: any) {
    const pos = plan.source.getFreeDragPosition();
    const snappedX = Math.round(pos.x / this.gridSize) * this.gridSize;
    const snappedY = Math.round(pos.y / this.gridSize) * this.gridSize;

    zone.x = Math.max(0, Math.min(snappedX, this.gridWidth - zone.width));
    zone.y = Math.max(0, Math.min(snappedY, this.gridHeight - zone.height));
  }

  duplicateZone() {
    if (!this.selectedZone) return;
    const copy = JSON.parse(JSON.stringify(this.selectedZone));
    copy.id = this.nextId++;
    copy.name += ' (copia)';
    copy.x += 30;
    copy.y += 30;
    this.zones.push(copy);
  }

  addSeatRow() {
    if (!this.selectedZone) return;

    const currentSeats = this.selectedZone.seatRows.flat().length;
    const remainingSeats = this.selectedZone.capacity - currentSeats;

    if (remainingSeats <= 0) {
      alert('Capacidad máxima alcanzada.');
      return;
    }

    const seatsToAdd = Math.min(this.seatsPerRow, remainingSeats);

    const newRow = Array.from({ length: seatsToAdd }, (_, i) => ({
      seatNumber: currentSeats + i + 1,
      status: 'disponible',
      price: this.selectedZone.normalPrice // usa el precio normal
    }));

    this.selectedZone.seatRows.push(newRow);

    const rowHeight = 28;
    const seatWidth = 28;

    this.selectedZone.height = this.selectedZone.seatRows.length * rowHeight + 40;
    this.selectedZone.width = Math.max(
      this.selectedZone.width,
      seatsToAdd * seatWidth + 40
    );
  }

  removeSeatRow() {
    if (this.selectedZone?.seatRows?.length > 0) {
      this.selectedZone.seatRows.pop();
    }
  }

  toggleSeat(seat: any) {
    const next = {
      disponible: 'preferencial',
      preferencial: 'vip',
      vip: 'disponible',
    };

    seat.status = next[seat.status as keyof typeof next];

    switch (seat.status) {
      case 'disponible':
        seat.price = this.selectedZone.normalPrice;
        break;
      case 'preferencial':
        seat.price = this.selectedZone.preferencialPrice;
        break;
      case 'vip':
        seat.price = this.selectedZone.vipPrice;
        break;
    }
  }


  saveCurrentDesign() {
      if (!this.planName.trim()) {
    alert('Debes ingresar un nombre para el plano.');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.planName);
  formData.append('zones', JSON.stringify(this.zones));

  this.planService.createPlan(formData).subscribe({
    next: (response: any) => {
      alert('Diseño guardado en el servidor.');

      
      const planId = response.plan?.id ?? response.plan?._id;
      if (planId) {
        this.router.navigate(['/ver-evento', planId]);
      } else {
        console.warn('ID del plano no encontrado en la respuesta');
      }
    },
    error: (error) => {
      console.error('Error al guardar el diseño:', error);
      alert('Error al guardar el diseño en el servidor.');
    }
  });
}


  loadDesigns() {
    this.designs = JSON.parse(localStorage.getItem('event_designs') || '[]');      // Esto hay que cambiarlo
  }

  loadDesign(design: any) {
    this.zones = design.zones;
    this.planName = design.name;
    this.selectedZone = null;
  }

  onDesignSelect(event: Event) {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    const selectedDesign = this.designs[index];
    this.loadDesign(selectedDesign);
  }

  onPriceChange() {
    for (let zone of this.zones) {
      for (let row of zone.seatRows || []) {
        for (let seat of row) {
          switch (seat.status) {
            case 'disponible':
              seat.price = zone.normalPrice;
              break;
            case 'preferencial':
              seat.price = zone.preferencialPrice;
              break;
            case 'vip':
              seat.price = zone.vipPrice;
              break;
          }
        }
      }
    }
  }

}
