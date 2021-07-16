import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

import { LoginRequestDTO, LoginResponseDTO } from '../models/user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const body: LoginRequestDTO = { username: 'test', password: 'test' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returned Observable should match the right data', () => {
    const response: LoginResponseDTO = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.ru',
    };

    service.login(body).subscribe((resp) => {
      expect(resp.firstName).toEqual('Test');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:5000/api/login'
    );

    expect(req.request.method).toEqual('POST');

    req.flush(response);
  });

  it('wrong data should return false', () => {
    const response: LoginResponseDTO = {
      id: 2,
      firstName: 'Other',
      lastName: 'Other',
      email: 'other@test.ru',
    };
    const expected = 'Test';
    //Тесты проходят даже при неверном условии, когда они проходить не должны
    service.login(body).subscribe((resp) => {
      expect(resp.email).toEqual(!expected);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:5000/api/login'
    );
    
    //Неверое условие ломает тест, работает верно
    expect(req.request.method).toEqual('POST');

    req.flush(response);
  });
});
