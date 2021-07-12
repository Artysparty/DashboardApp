import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DataRequestDTO, DataResponseDTO } from '../models/data.dto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly baseUrl = 'http://localhost:5000/api/data';

  constructor(private http: HttpClient) {}

  getData(data: DataRequestDTO): Observable<DataResponseDTO> {
    return this.http.put<DataResponseDTO>(this.baseUrl, data);
  }
}
