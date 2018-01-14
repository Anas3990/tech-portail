import { Component, OnInit } from '@angular/core';

//
import { AuthService } from './../../services/authentification/auth.service';

//
import { FirebaseService } from '../../services/database/firebase.service';

//
import { New } from './../../models/new';
import { Event } from './../../models/Event';
import { User } from './../../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //
  currentEvents: Event[];
  events: Event[];
  news: New[];

  constructor(public authService: AuthService, private dbService: FirebaseService) { }

  ngOnInit() {
    this.dbService.getNews().subscribe(news => {
      this.news = news;
    });

    this.dbService.getUpComingEvents().subscribe(events => {
      this.events = events;
    });
  }
}