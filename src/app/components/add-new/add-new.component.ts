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
import { New } from '../../models/New';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent {
  //
  alerts: any = [];

  //
  userEmail: string;
  userName: string;
  userId: string;

  //
  private newsCollection: AngularFirestoreCollection<New>;

  //
  title: string;
  body: string;
  currentDate: Date;

  constructor(private router: Router, public authService: AuthService, private afs: AngularFirestore, sanitizer: DomSanitizer) {
    //
    this.authService.user.subscribe(user => {
      this.userEmail = user.email
      this.userName = user.firstName + " " + user.name
      this.userId = user.uid
    });

    // 
    this.newsCollection = afs.collection('news');

    //
    this.currentDate = new Date();

    this.alerts = this.alerts.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  addNew() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    if (this.body == undefined) {
      this.newsCollection.add({
        'title': this.title,
        'body': "Aucune description n'a été fournie.",
        'author': {
          'email': this.userEmail,
          'name': this.userName,
          'uid': this.userId
        },
        'timestamp': timestamp
      }).then(_ => {
        this.router.navigate(['/news']);
      }).catch(error => {
        this.alerts.push({
          type: 'danger',
          msg: 'Une erreur est survenue lors de la tentative de publication de la nouvelle : ' + error
        })
      });
    } else {
      this.newsCollection.add({
        'title': this.title,
        'body': this.body,
        'author': {
          'email': this.userEmail,
          'name': this.userName,
          'uid': this.userId
        },
        'timestamp': timestamp
      }).then(_ => {
        this.router.navigate(['/news']);
      }).catch(error => {
        this.alerts.push({
          type: 'danger',
          msg: 'Une erreur est survenue lors de la tentative de publication de la nouvelle : ' + error
        })
      });
    }
  }
}