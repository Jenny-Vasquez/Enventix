import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  showPopup = false;
  selectedTicket: any = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.authService.getUserId().subscribe(
      userId => {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get<any[]>(`http://localhost:8000/api/tickets/${userId}`, { headers }).subscribe(
          (tickets) => {

            // Para cada ticket, consulta los datos del evento
            const eventRequests = tickets.map(ticket =>
              this.http.get<any>(`http://localhost:8000/api/events/${ticket.evento_id}`)
            );
            forkJoin(eventRequests).subscribe(
              events => {

                // Asocia los datos del evento a cada ticket
                this.tickets = tickets.map((ticket, i) => ({
                  ...ticket,
                  event: events[i]
                }));
              },
              error => {
                console.error('Error al cargar eventos:', error);
                this.tickets = tickets; // Muestra los tickets aunque no se puedan cargar los eventos
              }
            );
          },
          (error) => {
            console.error('Error al cargar tickets:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  openImagePopup(ticket: any): void {
    this.selectedTicket = ticket;
    this.showPopup = true;
  }

  // Cierra el popup
  closePopup(): void {
    this.showPopup = false;
    this.selectedTicket = null;
  }
}