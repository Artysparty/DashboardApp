import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { LoginRequestDTO, LoginResponseDTO } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  hide = true;
  form!: FormGroup;

  loginRequestData!: LoginRequestDTO;
  private subscriptions$ = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      usernameField: [''],
      passwordField: [''],
    });
  }

  ngOnInit(): void {
    this.loginRequestData.password = this.form.controls.passwordField.value;
    this.loginRequestData.username = this.form.controls.usernameField.value;
    this.subscriptions$.add(
      this.authService
        .postUserAuth(this.loginRequestData)
        .subscribe((response: LoginResponseDTO) => {

        })
    );
  }
}
