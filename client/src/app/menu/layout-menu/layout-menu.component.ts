import { Component } from '@angular/core';
import { SidebarComponent } from "../../event-front/components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/event-front/components/footer/footer.component';

@Component({
  selector: 'app-layout-menu',
  imports: [SidebarComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout-menu.component.html',
  styleUrl: './layout-menu.component.css',
})
export class LayoutMenuComponent { }
