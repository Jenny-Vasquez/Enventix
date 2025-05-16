import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EventDesignerComponent } from './event-designer/event-designer.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EventDesignerComponent, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  template: `<app-event-designer></app-event-designer>`, // 👈 ¡Esto es lo importante!

  standalone: true,


})
export class AppComponent {
  title = 'Eventix';
}
