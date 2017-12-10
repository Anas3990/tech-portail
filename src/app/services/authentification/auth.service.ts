import { Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Permet d'utiliser les fonctions d'AngularFire afin de pouvoir authentifier un utilisateur
import { AngularFireAuth } from 'angularfire2/auth';

//
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

// Permet d'utiliser le SDK de Firebase classique
import * as firebase from 'firebase/app';

// Permet d'utiliser les fontions du Service afin de pouvoir enregistrer les token des utilisateurs et ainsi leur envoyer des notifications
import { CloudMessagingService } from '../FCM/cloud-messaging.service';
import { User } from '../../models/User';

@Injectable()
export class AuthService {

  //
  user: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, private cloudMsgService: CloudMessagingService) { 
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>('users/' + user.uid).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
  }

  // Fonction qui sert à créer un utilisateur sur Firebase
  signUpWith(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(_ => {
        console.log("L'utilisateur a été crée avec succès")
      })
      .catch(error => console.log(error))
  }

  // Fonction qui sert à connecter un utilisateur à Firebase
  signInWith(email: string, password: string, rememberMe: boolean) {
    if (rememberMe == true) {
      // Si la case "Se rappeler de moi" est cochée, garder la session active jusqu'à se que l'utilisateur indique implicitement qu'il veut qu'on mette fin à sa session
      this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(_ => {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          this.router.navigate(['/dashboard'])
          this.cloudMsgService.saveMessagingDeviceToken()
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
    } else {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          this.router.navigate(['/dashboard'])
          this.cloudMsgService.saveMessagingDeviceToken()
        })
        .catch(error => console.log(error))
    }
  }

  // Fonction sert à déconnecter un utilisateur de l'application
  logout() {
    this.afAuth.auth.signOut()
      .then(_ => this.router.navigate(['/user-login']))
      .catch(error => console.log(error))
  }

  // Fonction qui permet à d'envoyer un courriel de réinitialisation de mot passe
  sentPasswordResetEmail(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(_ => console.log("Le message a été envoyé avec succès"))
      .catch(error => console.log(error))
  }

  // Fonction qui permet à un utilisateur de réinitialiser son mot de passe
  resetPassword(newPassword: string, newPasswordConfirmed: string) {
    const user = this.afAuth.auth.currentUser;


    if (newPassword != newPasswordConfirmed) {
      console.log("Les deux mots de passes ne correspondent pas")
      
    } else {
      user.updatePassword(newPassword)
        // Si l'opération est un succès, rediriger l'utiisateur vers sa page de profil et afficher un message comme quoi l'opération a été un succès
        .then(_ =>  {
          this.router.navigate(['/profile']);
        })
        // Afficher un message d'erreur à l'utilisateur comme quoi le mot de passe n'a pas pu être modifié
        .catch(error => {
          console.warn(error)
        })
    }
  }
}