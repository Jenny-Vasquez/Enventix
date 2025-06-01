import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PlanService } from 'src/app/plan.service';


@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  plans: any[] = [];

  constructor(private planService: PlanService, private router: Router) { }

  ngOnInit() {
    this.planService.getUserPlans().subscribe({
    next: (data) => {
      this.plans = data.plans;
      console.log("planos cargados", this.plans);
    },
    error: (err) => {
      console.error('Error al cargar los planos', err);
    }
  });
  }

  viewPlan(id: string) {
    this.router.navigate(['/ver-evento', id]);
  }

  createPlan() {
    this.router.navigate(['/designer']);
  }
}