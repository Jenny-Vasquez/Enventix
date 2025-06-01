import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  template: `<app-event-designer></app-event-designer>`,

  standalone: true,


})
export class AppComponent {
  title = 'Eventix';

  myReviews: any[] = [];
  eventsToReview: any[] = [];
}
