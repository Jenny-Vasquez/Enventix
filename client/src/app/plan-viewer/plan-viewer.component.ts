import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plan-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-viewer.component.html',
  styleUrls: ['./plan-viewer.component.css']
})
export class PlanViewerComponent implements OnInit {
  design: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchDesign(id);
    }
  }




  fetchDesign(id: string) {
    this.http.get(`http://localhost:8000/api/viewPlan/${id}`)
      .subscribe({
        next: (data) => {
          this.design = data;
        },
        error: (err) => {
          console.error('Error al cargar el diseño:', err);
        }
      });
  }


}