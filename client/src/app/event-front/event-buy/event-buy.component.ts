import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService} from '../event.service';
import { FrontNavbarComponent } from "../components/front-navbar/front-navbar.component";

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FrontNavbarComponent, RouterLink],
  templateUrl: './event-buy.component.html',
  styleUrls: ['./event-buy.component.css']
})
export class EventBuyComponent implements OnInit {
  evento: any;
  googleMapsUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("Están cargando los datos");
      this.eventService.getEventById(id).subscribe(data => {
        this.evento = data;
        // const encodedLocation = encodeURIComponent(this.evento.location);
        // this.googleMapsUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
      });
    }
  }
}