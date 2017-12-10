import { Component, OnInit } from '@angular/core';

//
import { AuthService } from '../../services/authentification/auth.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {
  
  //
  newPassword: string;
  newPasswordConfirmed: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
