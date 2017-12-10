import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

//
import { FirebaseService } from './../../services/database/firebase.service';

//
import { User } from './../../models/User';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  //
  students: User[];
  mentors: User[];


  constructor(private dbService: FirebaseService) { }

  ngOnInit() {
    //
    this.dbService.getStudents().subscribe(students => {
      this.students = students;
    });

    //
    this.dbService.getMentors().subscribe(mentors => {
      this.mentors = mentors;
    })
  }
}