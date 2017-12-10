import { Observable } from 'rxjs/Observable';
import { Component, SecurityContext } from '@angular/core';

//
import { Router } from '@angular/router';

//
import { DomSanitizer } from '@angular/platform-browser';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { AuthService } from './../../services/authentification/auth.service';

//
import { Event } from './../../models/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  //
  alerts: any = [];

  //
  userEmail: string;
  userName: string;
  userId: string;

  //
  private eventsCollection: AngularFirestoreCollection<Event>;

  //
  title: string;
  body: string;
  startDate: Date;
  endDate: Date;

  constructor(private router: Router, public authService: AuthService, private afs: AngularFirestore, public sanitizer: DomSanitizer) { 
    //
    this.authService.user.subscribe(user => {
      this.userEmail = user.email
      this.userName = user.firstName + " " + user.name
      this.userId = user.uid
    });

    // 
    this.eventsCollection = afs.collection('events');

    this.alerts = this.alerts.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  addEvent() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()
  
    if (this.body == undefined) {
      this.eventsCollection.add({
        'title': this.title,
        'body': "Aucune description n'a été fournie.",
        'author': {
          'email': this.userEmail,
          'name': this.userName,
          'uid': this.userId
        },
        'past': false,
        'startDate': this.startDate,
        'endDate': this.endDate,
        'timestamp': timestamp
      }).then(_ => {
        this.router.navigate(['/events']);
      }).catch(error => {
        this.alerts.push({
          type: 'danger',
          msg: "Une erreur est survenue lors de la tentative de publication de l'évènement : " + error
        })
      });
    } else {
      this.eventsCollection.add({
        'title': this.title,
        'body': this.body,
        'author': {
          'email': this.userEmail,
          'name': this.userName,
          'uid': this.userId
        },
        'past': false,
        'startDate': this.startDate,
        'endDate': this.endDate,
        'timestamp': timestamp
      }).then(_ => {
        this.router.navigate(['/events']);
      }).catch(error => {
        this.alerts.push({
          type: 'danger',
          msg: "Une erreur est survenue lors de la tentative de publication de l'évènement : " + error
        })
      });
    }
  }
}
