import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginResponseDTO } from 'src/app/shared/models/user.dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  hide = true;

  private subscriptions$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: SessionStorageService,
    private router: Router,
    public loadingService: LoadingService
  ) {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.subscriptions$.add(
      this.authService
        .login(this.form.value)
        .subscribe((response: LoginResponseDTO) => {
          if (response) {
            this.storageService.saveUser(response);
            this.router.navigate(['/app/dashboard']);
          }
        })
    );
  }
}
