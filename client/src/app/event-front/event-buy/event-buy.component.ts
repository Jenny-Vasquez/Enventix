import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { FrontNavbarComponent } from "../components/front-navbar/front-navbar.component";
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FrontNavbarComponent, RouterLink],
  templateUrl: './event-buy.component.html',
  styleUrls: ['./event-buy.component.css']
})

export class EventBuyComponent implements OnInit {
  evento: any;
  googleMapsUrl: string = '';
  plan: any = null;
  selectedSeats: any[] = [];
  soldSeats: any[] = [];
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private planService: PlanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.eventService.getEventById(id).subscribe(data => {
    //     this.evento = data;
    //     if (this.evento.plan_id) {
    //       this.loadPlan(this.evento.plan_id);
    //     }
    //     this.loadSoldSeats(this.evento.id);
    //   });
    // }

    // if (id) {
    //   this.eventService.getEventById(id).subscribe(data => {
    //     this.evento = data;
    //     if (this.evento.plan_id) {
    //       this.loadPlan(this.evento.plan_id);
    //       this.loadSoldSeats(this.evento.id);
    //     }
    //   });
    // }

    if (id) {
      this.eventService.getEventById(id).subscribe(data => {
        this.evento = data;
        if (this.evento.plan_id) {
          this.loadPlan(this.evento.plan_id, this.evento.id);
        }
      });
    }
  }

  // loadPlan(planId: string) {
  //   this.planService.getPlanById(planId).subscribe({
  //     next: (response: any) => {
  //       this.plan = response.plan || response;
  //       if (typeof this.plan.zones === 'string') {
  //         try {
  //           this.plan.zones = JSON.parse(this.plan.zones);
  //           console.log("todo salió bien");
  //         } catch (e) {
  //           console.error('Error al parsear zonas:', e);
  //           this.plan.zones = [];
  //         }
  //       }
  //     },
  //     error: (err) => console.error('Error al cargar el plano', err)
  //   });
  // }

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
      },
      error: (err) => console.error('Error al cargar el plano', err)
    });
  }

  loadSoldSeats(eventId: string) {
    this.eventService.getSoldSeatsByEventId(eventId).subscribe({
      next: (tickets: any[]) => {
        // Extraemos todos los seatNumbers vendidos
        this.soldSeats = tickets.flatMap(ticket =>
          (ticket.seats && Array.isArray(ticket.seats))
            ? ticket.seats.map((s: any) => ({ seatNumber: s.seatNumber, zoneName: s.zoneName }))
            : []
        );

        this.markSoldSeats();
      },
      error: (err) => console.error('Error al cargar los asientos vendidos', err)
    });
  }

  // markSoldSeats() {
  //   for (const zone of this.plan.zones) {
  //     for (const row of zone.seatRows) {
  //       for (const seat of row) {
  //         const sold = this.soldSeats.find(s => s.seatNumber === seat.seatNumber && s.zoneName === zone.name);
  //         if (sold) {
  //           seat.status = 'vendido';
  //         }
  //       }
  //     }
  //   }
  // }

  markSoldSeats() {
    if (!this.plan || !this.plan.zones) {
      console.warn('Plano no disponible aún al intentar marcar asientos vendidos.');
      return;
    }

    for (const zone of this.plan.zones) {
      for (const row of zone.seatRows) {
        for (const seat of row) {
          const sold = this.soldSeats.find(
            s => s.seatNumber === seat.seatNumber && s.zoneName === zone.name
          );
          if (sold) {
            seat.status = 'vendido';
          }
        }
      }
    }
  }

  isSeatSold(seat: any): boolean {
    return this.soldSeats.some(
      s => s.zone === seat.zone && s.row === seat.row && s.number === seat.number
    );
  }

  toggleSeat(seat: any, zone: any) {
    const index = this.selectedSeats.findIndex(
      s => s.seatNumber === seat.seatNumber && s.zoneName === zone.name
    );

    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
      console.log('Seat removed:', seat);  // Imprime solo el asiento deseleccionado
    } else {
      this.selectedSeats.push({
        ...seat,
        zoneName: zone.name
      });
      console.log('Seat added:', seat);  // Imprime solo el asiento seleccionado
    }

    console.log('Selected Seats:', this.selectedSeats);
  }

  isSeatSelected(seat: any): boolean {
    return this.selectedSeats.some(
      selectedSeat => selectedSeat.seatNumber === seat.seatNumber && selectedSeat.zoneName === seat.zoneName
    );
  }


  get totalSelectedPrice(): number {
    return this.selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0);
  }


  confirmSelection() {
    console.log('Asientos seleccionados:', this.selectedSeats);
    const selectedSeats = this.selectedSeats;
    const totalPrice = this.selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0);

    this.router.navigate(['/event-front/PayForm', this.evento.id], {
      state: { selectedSeats, totalPrice }
    });
  }
}