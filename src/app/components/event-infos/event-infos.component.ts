import { Component, OnInit } from '@angular/core';

//
import { Router, ActivatedRoute, Params } from '@angular/router';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { AngularFireAuth } from 'angularfire2/auth';

//
import { FirebaseService } from './../../services/database/firebase.service';
import { AuthService } from './../../services/authentification/auth.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private dbService: FirebaseService, private authService: AuthService, private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

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
    this.dbService.getAttendances('W1A4LJaP4LHYGCTEeQ6y').subscribe(attendances => {
      this.attendances = attendances;
    });
    
    this.dbService.getNonAttendances('W1A4LJaP4LHYGCTEeQ6y').subscribe(nonAttendances => {
      this.nonAttendances = nonAttendances;
    });
  }

  postAttendance() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()


  }

  postNonAttendance() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    this.afs.collection("events").doc('W1A4LJaP4LHYGCTEeQ6y').collection("attendances").doc(this.afAuth.auth.currentUser.uid).set({
      'nonAttendantName': "Anas Merbouh", 
      'present': false, 
      'confirmedAt': timestamp
    })
  }
}
