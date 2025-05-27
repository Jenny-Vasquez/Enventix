import { Component } from '@angular/core';
import { FrontNavbarComponent } from "../components/front-navbar/front-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-layout-events',
  imports: [FrontNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout-events.component.html',
  styleUrl: './layout-events.component.css',
})
export class LayoutEventsComponent { }
