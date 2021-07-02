import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LoginResponseDTO } from 'src/app/shared/models/user.dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  form: FormGroup;
  private subscriptions$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ssService: SessionStorageService,
  ) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit() {
    this.subscriptions$.add(
      this.authService
        .login(this.form.value)
        .subscribe((response: LoginResponseDTO) => {
          console.log('response: ' + JSON.stringify(response));
          this.ssService.saveData(response);
          console.log(this.ssService.getUserId());
        })
    );
  }
}
