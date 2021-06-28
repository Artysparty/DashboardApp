import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginRequestDTO, LoginResponseDTO } from 'src/app/models/user-auth.DTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'https://localhost:5000/api/login';

  constructor(private http: HttpClient) {}

  postUserAuth(body: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.baseUrl, body);
  }
}