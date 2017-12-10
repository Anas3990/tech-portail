import { Component, OnInit } from '@angular/core';

//
import { FirebaseService } from '../../services/database/firebase.service';

//
import { New } from './../../models/new';

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

  constructor(private dbService: FirebaseService) { }
  
  ngOnInit() {
    //
    this.dbService.getNews().subscribe(news => {
      this.news = news;
    });
  }
}
