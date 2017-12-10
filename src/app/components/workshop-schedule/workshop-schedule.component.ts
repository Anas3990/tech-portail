import { Component, OnInit } from '@angular/core';

//
import { FirebaseService } from '../../services/database/firebase.service';

//
import { Event } from '../../models/Event';

@Component({
  selector: 'app-workshop-schedule',
  templateUrl: './workshop-schedule.component.html',
  styleUrls: ['./workshop-schedule.component.css']
})
export class WorkshopScheduleComponent implements OnInit {
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
