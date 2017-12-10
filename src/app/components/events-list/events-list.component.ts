import { Component, OnInit } from '@angular/core';

//
import { FirebaseService } from '../../services/database/firebase.service';

//
import { Event } from '../../models/Event';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  upComingEvents: Event[];
  pastEvents: Event[];

  constructor(private dbService: FirebaseService) { }

  ngOnInit() {
    this.dbService.getUpComingEvents().subscribe(upComingEvents => {
      this.upComingEvents = upComingEvents;
    });

    this.dbService.getPastEvents().subscribe(pastEvents => {
      this.pastEvents = pastEvents;
    });
  }

}
