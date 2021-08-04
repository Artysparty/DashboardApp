import { Injectable } from '@angular/core';

import { LoginResponseDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  saveUser(user: LoginResponseDTO): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): LoginResponseDTO | null {
    try {
      return JSON.parse(sessionStorage.user);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  clear(): void {
    sessionStorage.clear();
  }
}
