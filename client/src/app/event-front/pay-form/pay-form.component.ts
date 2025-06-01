// pay-form.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { TimerService } from './timer.service';
import { PaymentValidatorService } from './payment-validator.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})

export class PayFormComponent implements OnInit, OnDestroy {
  paymentForm!: FormGroup;
  evento: any;
  displayTime: string = '';
  timeSub?: Subscription;
  selectedSeats: any[] = [];
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private timerService: TimerService,
    private paymentValidator: PaymentValidatorService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    // Leer los datos del state
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state;

    if (state) {
      this.selectedSeats = state['selectedSeats'] || [];
      this.totalPrice = state['totalPrice'] || 0;
      console.log('Asientos recibidos:', this.selectedSeats);
      console.log('Precio total:', this.totalPrice);
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadEvento();
    this.startTimer();


  }

  ngOnDestroy(): void {
    this.timerService.stop();
    this.timeSub?.unsubscribe();
  }

  buildForm() {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiry: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\\/([0-9]{2})')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      email: ['', [Validators.email]]
    });
  }

  startTimer() {
    this.timeSub = this.timerService.time$.subscribe(t => (this.displayTime = t));
    this.timerService.start(() => {
      this.router.navigate(['/event-front/EventBuy', this.evento.id]);
    });
  }

  loadEvento() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(data => {
        this.evento = data;
      });
    }
  }

  get f() {
    return this.paymentForm.controls;
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const data = this.paymentForm.value;
    const isValid = this.paymentValidator.validateCard(data.cardNumber);

    if (!isValid) {
      alert('Tarjeta rechazada');
      return;
    }


    confirm('Do you want to confirm the payment?');
    console.log('Datos de pago:', data);


    const payload = {
      event_id: this.evento.id,
      amount: this.selectedSeats.length,
      seats: this.selectedSeats.map(seat => ({
        number: seat.seatNumber,     
        price: seat.price,
        zoneName: seat.zoneName         
      }))
    };
    console.log("payload de pay-form ", payload);

    // Enviar solicitud POST para crear la entrada
    this.http.post('http://localhost:8000/api/tickets', payload, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }).subscribe(
      (response: any) => {
        console.log('Entrada creada:', response);
        // this.router.navigate(['/event-front/myTickets']);
        this.router.navigate(['/event-front/EventBuy', this.evento.id]);

      },
      err => {
        console.error('Error al crear la entrada:', err.error);
        alert('Error: ' + JSON.stringify(err.error));
      }

    );
  }
}