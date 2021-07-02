import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginRequestDTO, LoginResponseDTO } from 'src/app/shared/models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/api/login';

  constructor(private http: HttpClient) {}

  login(body: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.baseUrl, body);
  }
}