import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LoginResponseDTO } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent{
  
  hide = true;
  form: FormGroup;
  private subscriptions$ = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit(){
    this.subscriptions$.add(
      this.authService
        .login(this.form.value)
        .subscribe((response: LoginResponseDTO) => {
          console.log(response);
        })
    );
  }
}
