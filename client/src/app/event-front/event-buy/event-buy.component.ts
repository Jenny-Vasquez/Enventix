import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { FrontNavbarComponent } from '../components/front-navbar/front-navbar.component';
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FrontNavbarComponent, RouterLink],
  templateUrl: './event-buy.component.html',
  styleUrls: ['./event-buy.component.css']
})
export class EventBuyComponent implements OnInit, AfterViewInit {
  @ViewChild('planGrid') planGridRef!: ElementRef;

  evento: any;
  plan: any = null;
  selectedSeats: any[] = [];
  soldSeats: any[] = [];
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private planService: PlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe((data) => {
        this.evento = data;
        if (this.evento.plan_id) {
          this.loadPlan(this.evento.plan_id, this.evento.id);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.adjustPlanHeight(), 100); // Asegura que DOM esté listo
  }

  adjustPlanHeight(): void {
    if (!this.planGridRef?.nativeElement) return;

    let maxBottom = 0;
    const zones = this.planGridRef.nativeElement.querySelectorAll('.zone') as NodeListOf<HTMLElement>;

    zones.forEach((zone) => {
      const bottom = zone.offsetTop + zone.offsetHeight;
      if (bottom > maxBottom) {
        maxBottom = bottom;
      }
    });

    // Ajusta el contenedor del plano con algo de padding extra
    this.planGridRef.nativeElement.style.minHeight = `${maxBottom + 40}px`;
  }

  loadPlan(planId: string, eventId: string) {
    this.planService.getPlanById(planId).subscribe({
      next: (response: any) => {
        this.plan = response.plan || response;
        if (typeof this.plan.zones === 'string') {
          try {
            this.plan.zones = JSON.parse(this.plan.zones);
          } catch (e) {
            console.error('Error al parsear zonas:', e);
            this.plan.zones = [];
          }
        }
        this.loadSoldSeats(eventId);
        setTimeout(() => this.adjustPlanHeight(), 150); // También re-ajusta tras cargar plano
      },
      error: (err) => console.error('Error al cargar el plano', err)
    });
  }

  loadSoldSeats(eventId: string) {
    this.eventService.getSoldSeatsByEventId(eventId).subscribe({
      next: (sold: any[]) => {
        this.soldSeats = sold;
        this.markSoldSeats();
      },
      error: (err) => console.error('Error al cargar asientos vendidos', err)
    });
  }

  markSoldSeats() {
    if (!this.plan || !this.plan.zones) return;

    for (const zone of this.plan.zones) {
      for (const row of zone.seatRows) {
        for (const seat of row) {
          const match = this.soldSeats.find(
            (s) => s.number === seat.seatNumber && s.zoneName === zone.name
          );
          if (match) {
            seat.status = 'vendido';
          }
        }
      }
    }
  }

  toggleSeat(seat: any, zone: any) {
    const index = this.selectedSeats.findIndex(
      (s) => s.seatNumber === seat.seatNumber && s.zoneName === zone.name
    );

    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push({ ...seat, zoneName: zone.name });
    }
  }

  isSeatSelected(seat: any): boolean {
    return this.selectedSeats.some(
      (s) => s.seatNumber === seat.seatNumber && s.zoneName === seat.zoneName
    );
  }

  isSelectable(seat: any): boolean {
    return ['disponible', 'vip', 'preferencial'].includes(seat.status);
  }

  getSeatWithZone(seat: any, zoneName: string) {
    return { ...seat, zoneName };
  }

  get totalSelectedPrice(): number {
    return this.selectedSeats.reduce(
      (sum, seat) => sum + (seat.price || 0),
      0
    );
  }

  confirmSelection() {
    this.router.navigate(['/event-front/PayForm', this.evento.id], {
      state: {
        selectedSeats: this.selectedSeats,
        totalPrice: this.totalSelectedPrice
      }
    });
  }
}
