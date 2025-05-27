import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'front-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.css',
})
export class FrontNavbarComponent implements OnInit {
  userRole: string | null = null;

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
  }
}
