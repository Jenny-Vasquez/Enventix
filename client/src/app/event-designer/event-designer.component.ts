import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-designer',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './event-designer.component.html',
  styleUrls: ['./event-designer.component.css']
})
export class EventDesignerComponent {
  zones: any[] = [];
  nextId = 1;
  selectedZone: any = null;
  readonly gridSize = 20;

  addZone() {
    this.zones.push({
      id: this.nextId++,
      name: `Zona ${this.nextId - 1}`,
      x: 20,
      y: 20,
      width: 200,
      height: 100,
      color: '#ffcc00',
      capacity: 50,
      price: 10,
      rows: this.generateRows(5, 10)  // 5 filas de 10 asientos
    });
  }
  
  generateRows(numRows: number, seatsPerRow: number) {
    const rows = [];
    for(let i = 0; i < numRows; i++) {
      const seats = [];
      for(let j = 0; j < seatsPerRow; j++) {
        seats.push({
          id: `R${i+1}S${j+1}`,
          status: 'available'  // puedes tener estados: available, reserved, sold...
        });
      }
      rows.push({ seats });
    }
    return rows;
  }
  

  removeZone(zoneId: number) {
    this.zones = this.zones.filter(z => z.id !== zoneId);
    if (this.selectedZone?.id === zoneId) {
      this.selectedZone = null;
    }
  }

  onDragEnd(event: CdkDragEnd, zone: any) {
    const pos = event.source.getFreeDragPosition();
  
    // Tamaño del grid (fijo en CSS)
    const gridWidth = 800;
    const gridHeight = 600;
  
    // Snap a la cuadrícula
    let newX = Math.round(pos.x / this.gridSize) * this.gridSize;
    let newY = Math.round(pos.y / this.gridSize) * this.gridSize;
  
    // Limitar posición para que no salga fuera del grid (considerando tamaño zona)
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
  
    if (newX + zone.width > gridWidth) newX = gridWidth - zone.width;
    if (newY + zone.height > gridHeight) newY = gridHeight - zone.height;
  
    zone.x = newX;
    zone.y = newY;
  }
  
  

  selectZone(zone: any) {
    this.selectedZone = zone;
  }

  duplicateZone() {
    if (!this.selectedZone) return;
    const copy = { ...this.selectedZone, id: this.nextId++, x: this.selectedZone.x + 20, y: this.selectedZone.y + 20, name: `Zona ${this.nextId - 1}` };
    this.zones.push(copy);
    this.selectedZone = copy;
  }

  getColor(id: number): string {
    const colors = ['#FFD966', '#93C47D', '#E06666', '#6FA8DC', '#D9D2E9'];
    return colors[(id - 1) % colors.length];
  }
}
