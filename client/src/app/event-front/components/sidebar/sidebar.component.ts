import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit{ 
   userRole: string | null = null;

     constructor(
       private authService: AuthService,
       private router: Router
     ) {}
   
     logout(): void {
       this.authService.logout();
       this.router.navigate(['/']); 
     }

   ngOnInit() {
       this.userRole = localStorage.getItem('userRole');
     }
}
