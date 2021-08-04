import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

import { LoginResponseDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;

  hide = true;

  private subscriptions$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: SessionStorageService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  submit() {
    this.subscriptions$.add(
      this.authService
        .login(this.form.value)
        .subscribe((response: LoginResponseDTO) => {
          this.storageService.saveUser(response);
          this.router.navigate(['/app/dashboard']);
        }),
    );
  }
}
