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
  students: User[];
  mentors: User[];
  pendingUsers: User[];

  //
  studentsSource: LocalDataSource;
  mentorsSource: LocalDataSource;
  pendingUsersSource: LocalDataSource;

  studentsSettings = {
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
      group: {
        title: 'Groupe'
      },
      homePhoneNumber1: {
        title: 'Téléphone (maison #1)'
      },
      homePhoneNumber2: {
        title: 'Téléphone (maison #2)'
      },
      mobilePhoneNumber: {
        title: 'Téléphone (mobile)'
      },
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
    noDataMessage: "Aucun élève n'a été trouvé."
  };

  mentorsSettings = {
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
      professionalTitle: {
        title: 'Titre professionel'
      },
      mobilePhoneNumber: {
        title: 'Téléphone (mobile)'
      },
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
    noDataMessage: "Aucun mentor n'a été trouvé.",
  };

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
    this.studentsSource = new LocalDataSource();
    this.mentorsSource = new LocalDataSource();
    this.pendingUsersSource = new LocalDataSource();
  }

  ngOnInit() {
    //
    this.dbService.getStudents().subscribe(students => {
      this.students = students;
      this.studentsSource.load(students);
    });

    //
    this.dbService.getMentors().subscribe(mentors => {
      this.mentors = mentors;
      this.mentorsSource.load(mentors);
    })

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

  onSearchStudent(query: string = '') {
    this.studentsSource.setFilter([
      {
        field: 'firstName',
        search: query
      }
    ], false); 
  }

  onSearchMentor(query: string = '') {
    this.mentorsSource.setFilter([
      {
        field: 'firstName',
        search: query
      }
    ], false); 
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
