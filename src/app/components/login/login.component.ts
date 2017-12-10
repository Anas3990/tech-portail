import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthService } from "../../services/authentification/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email: string;
  password: string;
  rememberMe: boolean;

  constructor(public authService: AuthService) { }
}
