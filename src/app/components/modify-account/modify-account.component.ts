import { Observable } from 'rxjs/Observable';
import { Component, OnInit, SecurityContext  } from '@angular/core';

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
import { User } from '../../models/User';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css']
})
export class ModifyAccountComponent implements OnInit {
  //
  user: User;

  //
  accountMobilePhoneNumber: string;
  accountHomePhoneNumber1: string;
  accountHomePhoneNumber2

  //
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, public sanitizer: DomSanitizer, public authService: AuthService,) { 
    // 
    this.usersCollection = afs.collection('users');
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
  }
}
