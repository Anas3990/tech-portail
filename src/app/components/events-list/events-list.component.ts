import { Component, OnInit } from '@angular/core';

//
import { FirebaseService } from '../../services/database/firebase.service';
import { AuthService } from '../../services/authentification/auth.service';

//
import { Event } from '../../models/Event';
import { User } from '../../models/User';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  //
  upComingEvents: Event[];
  pastEvents: Event[];

  //
  user: User;

  constructor(private dbService: FirebaseService, public authService: AuthService) { }

  ngOnInit() {
    this.dbService.getUpComingEvents().subscribe(upComingEvents => {
      this.upComingEvents = upComingEvents;
    });

    this.dbService.getPastEvents().subscribe(pastEvents => {
      this.pastEvents = pastEvents;
    });

    //
    this.authService.user.subscribe(user => {
      this.user = user;
    })
  }

}
