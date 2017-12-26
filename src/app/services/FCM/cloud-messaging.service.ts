import { Injectable }          from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CloudMessagingService {

  user: Observable<firebase.User>;
  currentUser: firebase.User;

  //
  currentMessage = new BehaviorSubject(null)
  messages: Observable<any>

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  // Saves the messaging device token to the datastore.
  saveMessagingDeviceToken() {
    return firebase.messaging().getToken()
      .then((currentToken) => {
        if (currentToken) {
          // Save the Device Token to the datastore.
          firebase.database().ref('/fcmTokens').child(currentToken).set(firebase.auth().currentUser.uid)
        } else {
          // Need to request permissions to show notifications.
          return this.requestNotificationsPermissions();
        }
      }).catch((err) => {
        console.error(err);
      });
  };

  // Requests permissions to show notifications.
  requestNotificationsPermissions() {
    return firebase.messaging().requestPermission()
      // Notification permission granted.
      .then(() => this.saveMessagingDeviceToken())
      .catch((err) => {
        console.error(err);
      });
    };

    receiveMessage() {
      firebase.messaging().onMessage((payload) => {
        this.currentMessage.next(payload);
      });
    }
}
