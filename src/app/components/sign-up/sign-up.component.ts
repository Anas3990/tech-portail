import { Component, OnInit, SecurityContext } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

//
import { DomSanitizer } from '@angular/platform-browser';

//
import { AuthService } from './../../services/authentification/auth.service';
import { NotifyService } from './../../services/visual-feedback/notify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  //
  signupForm: FormGroup;
  detailForm: FormGroup;

  constructor(public authService: AuthService, public notifyService: NotifyService, public fb: FormBuilder, sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
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
    });

    this.detailForm = this.fb.group({
      'firstName': ['', [ Validators.required ] ],
      'name': ['', [ Validators.required ] ],
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get firstName() {
    return this.detailForm.get('firstName');
  }
  
  get name() {
    return this.detailForm.get('name');
  }

  signup() {
    return this.authService.signUpWith(this.email.value, this.password.value);
  }

  setAdditionalData(user) {
    return this.authService.updateUser(user, {
      firstName: this.firstName.value,
      name: this.name.value
    });
  } 
}
