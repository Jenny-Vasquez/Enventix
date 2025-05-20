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
  readonly gridSize = 20;
  readonly maxGridWidth = 1000;
  readonly maxGridHeight = 700;
  seatsPerRowInput: number = 10;

  ngOnInit() {
    this.loadDesigns();
  }

  addZone() {
    const newZone = {
      id: this.nextId++,
      name: `Zona ${this.nextId - 1}`,
      x: 20,
      y: 20,
      width: 200,
      height: 100,
      color: '#FFD54F',
      capacity: 0,
      price: 10,
      seatRows: []
    };
    this.zones.push(newZone);
  }

  removeZone(zoneId: number) {
    this.zones = this.zones.filter(z => z.id !== zoneId);
    if (this.selectedZone?.id === zoneId) {
      this.selectedZone = null;
    }
  }

  selectZone(zone: any) {
    this.selectedZone = zone;
  }

  onDragEnd(event: CdkDragEnd, zone: any) {
    const pos = event.source.getFreeDragPosition();
    let newX = Math.round(pos.x / this.gridSize) * this.gridSize;
    let newY = Math.round(pos.y / this.gridSize) * this.gridSize;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + zone.width > this.maxGridWidth) newX = this.maxGridWidth - zone.width;
    if (newY + zone.height > this.maxGridHeight) newY = this.maxGridHeight - zone.height;

    zone.x = newX;
    zone.y = newY;
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
    if (!this.selectedZone.seatRows) {
      this.selectedZone.seatRows = [];
    }

    const seatsPerRow = this.seatsPerRowInput || 10;
    const maxCapacity = this.selectedZone.capacity;
    const currentSeats = this.selectedZone.seatRows.flat().length;

    if (currentSeats >= maxCapacity) {
      alert('Capacidad máxima alcanzada.');
      return;
    }

    const remainingSeats = maxCapacity - currentSeats;
    const seatsToAdd = Math.min(seatsPerRow, remainingSeats);

    const newRow = Array.from({ length: seatsToAdd }, (_, i) => ({
      seatNumber: currentSeats + i + 1,
      status: 'disponible',
      price: this.selectedZone.price
    }));

    this.selectedZone.seatRows.push(newRow);

    const rowHeight = 34;
    this.selectedZone.height = this.selectedZone.seatRows.length * rowHeight + 40;
  }

  toggleSeat(seat: any) {
    if (seat.status === 'disponible') seat.status = 'vip';
    else if (seat.status === 'vip') seat.status = 'ocupado';
    else seat.status = 'disponible';
  }

  get gridWidth(): number {
    return this.maxGridWidth;
  }

  get gridHeight(): number {
    return this.maxGridHeight;
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

    alert('Diseño guardado');
    this.loadDesigns();
  }

  loadDesigns() {
    const saved = JSON.parse(localStorage.getItem('event_designs') || '[]');
    this.designs = saved;
  }

  loadDesign(design: any) {
    this.zones = design.zones;
    this.selectedZone = null;
    this.eventName = design.name;
  }

  onDesignSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const selectedDesign = this.designs[selectedIndex];
    this.loadDesign(selectedDesign);
  }
}
