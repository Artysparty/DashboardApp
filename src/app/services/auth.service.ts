import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserAuthDTO } from 'src/app/models/user-auth.DTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'https://localhost:5000/api/login';

  constructor(private http: HttpClient) {}

  postUserAuth(userAuth: UserAuthDTO): Observable<UserAuthDTO> {

    const body = {username: userAuth.username, password: userAuth.password}; 
    return this.http.post<UserAuthDTO>(this.baseUrl, body);
  }
}