import { Component, OnInit } from '@angular/core';

//
import { Router, ActivatedRoute, Params } from '@angular/router';

//
import { New } from './../../models/New';

@Component({
  selector: 'app-new-infos',
  templateUrl: './new-infos.component.html',
  styleUrls: ['./new-infos.component.css']
})
export class NewInfosComponent implements OnInit {
  //
  author: any;
  timestamp: any;
  title: string;
  body: string;
  new: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //
    this.route.data
    .subscribe((data: { newObject: New }) => {
      this.author = data.newObject.author;
      this.timestamp = data.newObject.timestamp;
      this.title = data.newObject.title;
      this.body = data.newObject.body;
      this.new = data.newObject;
    });
  }

}
