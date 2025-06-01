import { Component } from '@angular/core';
import { EventModel, EventToCreate } from '../models/event.model';
import { EventService } from './event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FrontNavbarComponent } from "../event-front/components/front-navbar/front-navbar.component";
import { PlanService } from '../plan.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [FormsModule, CommonModule, FrontNavbarComponent,],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {
  event: EventToCreate = {
    title: '',
    location: '',
    date: '',
    description: '',
    tags: []
  };

  tagsInput = '';
  selectedImage?: File;
  selectedPlanId: string = '';
  userPlans: any[] = [];

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  constructor(private eventService: EventService, private planService: PlanService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserPlans();
  }

  loadUserPlans() {
    this.planService.getUserPlans().subscribe({
      next: (response: any) => {
        this.userPlans = response.plans;
        console.log('planos encontrados ', this.userPlans);

      },
      error: (err) => {
        console.error('Error al cargar los planos del usuario', err);
      }
    });
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.event.title || '');
    formData.append('location', this.event.location || '');
    formData.append('date', this.event.date || '');
    formData.append('time', (this.event as any).time || '');
    formData.append('description', this.event.description || '');

    if (this.event.tags && this.event.tags.length > 0) {
      this.event.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.selectedPlanId) {
      console.log('Plan ID seleccionado:', this.selectedPlanId);
      formData.append('plan_id', this.selectedPlanId);
    }

    this.eventService.createEvent(formData).subscribe({
      next: (res) => {
        alert('Event created successfully');
        this.router.navigate(['/menu/myEvents']);
      },
      error: (err) => console.error('Error al crear evento', err)
    });
  }
}