import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-event-designer',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './event-designer.component.html',
  styleUrls: ['./event-designer.component.css']
})
export class EventDesignerComponent implements OnInit {
  zones: any[] = [];
  selectedZone: any = null;
  nextId = 1;
  eventName: string = '';
  designs: any[] = [];
  seatsPerRow: number = 10;
  readonly padding = 50;
  readonly gridSize = 20;

  ngOnInit() {
    this.loadDesigns();
  }

  get gridWidth(): number {
    return Math.max(...this.zones.map(z => z.x + z.width), 800) + this.padding;
  }

  get gridHeight(): number {
    return Math.max(...this.zones.map(z => z.y + z.height), 600) + this.padding;
  }

  addZone() {
    this.zones.push({
      id: this.nextId++,
      name: `Zona ${this.nextId - 1}`,
      x: 20,
      y: 20,
      width: 200,
      height: 100,
    
      color: '#87a0b9 ',
      capacity: 0,
      price: 10,
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

 onDragEnd(event: CdkDragEnd, zone: any) {
  const pos = event.source.getFreeDragPosition();
  
  // Snap automático a gridSize
  const snappedX = Math.round(pos.x / this.gridSize) * this.gridSize;
  const snappedY = Math.round(pos.y / this.gridSize) * this.gridSize;

  // Limitar dentro del contenedor
  zone.x = Math.max(0, Math.min(snappedX, this.gridWidth - zone.width));
  zone.y = Math.max(0, Math.min(snappedY, this.gridHeight
    - zone.height));
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
      price: this.selectedZone.price
    }));
  
    this.selectedZone.seatRows.push(newRow);
  
    // 🔷 Auto-ajustar alto y ancho dinámicamente
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
  }

  saveCurrentDesign() {
    if (!this.eventName.trim()) {
      alert('Debes ingresar un nombre para el evento.');
      return;
    }

    const design = {
      id: 'event-' + Date.now(),
      name: this.eventName,
      zones: this.zones
    };

    const saved = JSON.parse(localStorage.getItem('event_designs') || '[]');
    saved.push(design);
    localStorage.setItem('event_designs', JSON.stringify(saved));
    alert('Diseño guardado.');
    this.loadDesigns();
  }

  loadDesigns() {
    this.designs = JSON.parse(localStorage.getItem('event_designs') || '[]');
  }

  loadDesign(design: any) {
    this.zones = design.zones;
    this.eventName = design.name;
    this.selectedZone = null;
  }

  onDesignSelect(event: Event) {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    const selectedDesign = this.designs[index];
    this.loadDesign(selectedDesign);
  }
}
