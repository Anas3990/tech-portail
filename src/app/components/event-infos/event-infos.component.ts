import { Component, OnInit } from '@angular/core';

//
import { Router, ActivatedRoute, Params } from '@angular/router';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { FirebaseService } from './../../services/database/firebase.service';

//
import { Event } from './../../models/Event';
import { Attendance } from './../../models/Attendance';

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.css']
})
export class EventInfosComponent implements OnInit {
  //
  timeStart: Date;
  timeEnd: Date;

  //
  attendances: Attendance[];
  nonAttendances: Attendance[];

  //
  author: any;
  timestamp: any;
  startDate: Date;
  endDate: Date;
  title: string;
  body: string;
  event: any;

  //
  private attendancesCollection: AngularFirestoreCollection<Attendance>;

  constructor(private router: Router, private route: ActivatedRoute, private dbService: FirebaseService, private afs: AngularFirestore) { }

  ngOnInit() {
    //
    this.route.data.subscribe((data: { eventObject: Event }) => {
      this.author = data.eventObject.author;
      this.timestamp = data.eventObject.timestamp;
      this.startDate = data.eventObject.startDate;
      this.endDate = data.eventObject.endDate;
      this.title = data.eventObject.title;
      this.body = data.eventObject.body;
      this.event = data.eventObject;
    });
    
    //
    this.dbService.getAttendances('eL0i6yN1f0hKRnbys8o0').subscribe(attendances => {
      this.attendances = attendances;
    });
    
    this.dbService.getNonAttendances('eL0i6yN1f0hKRnbys8o0').subscribe(nonAttendances => {
      this.nonAttendances = nonAttendances;
    });
  }

  postAttendance() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()


  }
}
