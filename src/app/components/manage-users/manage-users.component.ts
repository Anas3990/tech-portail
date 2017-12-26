import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

//
import { AngularFirestore } from 'angularfire2/firestore';

//
import { LocalDataSource } from 'ng2-smart-table';

//
import { DomSanitizer } from '@angular/platform-browser';

//
import { FirebaseService } from './../../services/database/firebase.service';
import { AuthService } from './../../services/authentification/auth.service';

//
import { User } from './../../models/User';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
   //
  asyncSelected: string;

  //
  alerts: any = [];

  //
  pendingUsers: User[];

  //
  pendingUsersSource: LocalDataSource;
 
  pendingUsersSettings = {
    columns: {
      name: {
        title: 'Nom',
      },
      firstName: {
        title: 'Prénom',
      },
      email: {
        title: 'Courriel',
        editable: false
      },
      approved: {
        title: 'Approuver'
      }
    },
    edit: {
      editButtonContent: "Modifier",
      saveButtonContent: "Sauvegarder",
      cancelButtonContent: "Annuler",
      confirmSave: true
    },
    actions: {
      delete: false
    },
    pager: {
      display: false
    },
    hideSubHeader: true,
    noDataMessage: "Aucun utilisateur à approuver."
  };

  constructor(private db: AngularFirestore, private dbService: FirebaseService, private authService: AuthService) { 
    this.pendingUsersSource = new LocalDataSource();
  }

  ngOnInit() {
    //
    this.dbService.getPendingUsers().subscribe(pendingUsers => {
      this.pendingUsers = pendingUsers;
      this.pendingUsersSource.load(pendingUsers);
    })
  }

  editUser(event) {
    this.db.doc('users/' + event.data.uid).update(event.newData)
    .then(_ => {
      this.alerts.push({
        type: 'success',
        msg: "L'utilisateur a été modifié avec succès !"
      })
    })
      .catch(error => {
        this.alerts.push({
        type: 'danger',
        msg: "Une erreur est survenue lors de la tentative de modification de l'utilisateur !"
      })
    });
  }

  onSearchPendingUsers(query: string = '') {
    this.pendingUsersSource.setFilter([
      {
        field: 'email',
        search: query
      }
    ], false); 
  }
}
