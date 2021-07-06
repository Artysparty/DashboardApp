import { Injectable } from '@angular/core';
import { LoginResponseDTO } from '../models/user.dto';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

    constructor(private notifService: NotificationService) {}
    
    saveUser(user: LoginResponseDTO): void {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
      try {
        return JSON.parse(sessionStorage.user);
      } catch(e) {
        console.log(e);
      }
    }

    clear(): void {
      sessionStorage.clear();
    }
}