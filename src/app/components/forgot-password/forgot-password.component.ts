import { Component, OnInit, SecurityContext } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

//
import { DomSanitizer } from '@angular/platform-browser';

//
import { AuthService } from './../../services/authentification/auth.service';
import { NotifyService } from './../../services/visual-feedback/notify.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  sendPasswordResetMailForm: FormGroup;

  constructor(public authService: AuthService, public notifyService: NotifyService, public fb: FormBuilder, sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sendPasswordResetMailForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ]
    });
  }

  get email() {
    return this.sendPasswordResetMailForm.get('email');
  }

  sendResetMail() {
    return this.authService.sentPasswordResetEmail(this.email.value);
  }
}
