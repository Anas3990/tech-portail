import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//
import { AuthService } from './../../services/authentification/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    
  }

}
