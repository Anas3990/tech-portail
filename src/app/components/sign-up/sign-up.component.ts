import { Component, OnInit } from '@angular/core';

//
import { BsModalService } from 'ngx-bootstrap/modal';

//
import { AuthService } from './../../services/authentification/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  //
  email: string;
  password: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
