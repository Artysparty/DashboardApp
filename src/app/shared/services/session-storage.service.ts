import { Injectable } from '@angular/core';
import { LoginResponseDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  
    saveData(user: LoginResponseDTO) {
        sessionStorage.setItem('id', JSON.stringify(user.id));
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('firstname', user.firstName);
        sessionStorage.setItem('lastname', user.lastName);
    }

    getUserId() {
        return sessionStorage.getItem('id');
    }
}