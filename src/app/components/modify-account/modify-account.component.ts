import { Observable } from 'rxjs/Observable';
import { Component, SecurityContext } from '@angular/core';

//
import { Router } from '@angular/router';

//
import { DomSanitizer } from '@angular/platform-browser';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

//
import { AuthService } from './../../services/authentification/auth.service';

//
import { User } from 'firebase';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css']
})
export class ModifyAccountComponent {
  //
  alerts: any = [];

  //
  accountMobilePhoneNumber: string;
  accountHomePhoneNumber1: string;
  accountHomePhoneNumber2

  //
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, public sanitizer: DomSanitizer, public authService: AuthService,) { 
    // 
    this.usersCollection = afs.collection('users');
    
    this.alerts = this.alerts.map((alert: any) => ({
      type: alert.type,
       msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  updateAccountInfos() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()
    let uid = firebase.auth().currentUser.uid

    this.usersCollection.doc(uid).update({
      homePhoneNumber1: this.accountHomePhoneNumber1,
      homePhoneNumber2: this.accountHomePhoneNumber2,
      mobilePhoneNumber: this.accountMobilePhoneNumber
    })
    .then(_ => {
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      this.alerts.push({
        type: 'danger',
        msg: "Une erreur est survenue lors de la tentative de modification de votre compte : " + error
      })
    });
  }
}
