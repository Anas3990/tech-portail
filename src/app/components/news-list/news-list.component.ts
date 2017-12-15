import { Component, OnInit } from '@angular/core';

//
import { FirebaseService } from '../../services/database/firebase.service';
import { AuthService } from '../../services/authentification/auth.service';

//
import { New } from './../../models/new';
import { User } from '../../models/User';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  //
  p: number = 1;
  
  //
  news: New[];

  //
  user: User;

  constructor(private dbService: FirebaseService, private authService: AuthService) { }
  
  ngOnInit() {
    //
    this.dbService.getNews().subscribe(news => {
      this.news = news;
    });

    //
    this.authService.user.subscribe(user => {
      this.user = user;
    })
  }
}
