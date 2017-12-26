import { Component, OnInit, SecurityContext } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

//
import { DomSanitizer } from '@angular/platform-browser';

//
import { AuthService } from './../../services/authentification/auth.service';
import { NotifyService } from './../../services/visual-feedback/notify.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //
  signinForm: FormGroup;

  constructor(public authService: AuthService, public notifyService: NotifyService, public fb: FormBuilder, sanitizer: DomSanitizer) { }

  ngOnInit() { 
    this.signinForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.minLength(6),
        Validators.required
        ]
      ]
    })
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  signin() {
    return this.authService.signInWith(this.email.value, this.password.value);
  }
}
