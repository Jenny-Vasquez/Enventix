import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'front-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.css',
})
export class FrontNavbarComponent implements OnInit {
  userRole: string | null = null;
  userName: string | null = null;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // o '/' si prefieres
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
     this.userName = this.authService.getUserName();
  }
}
