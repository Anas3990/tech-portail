import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//
import { AuthService } from './../../services/authentification/auth.service';

//
import { User } from '../../models/User';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  //
  user: User;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
  }

}
