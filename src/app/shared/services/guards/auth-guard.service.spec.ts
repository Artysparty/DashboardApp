import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginResponseDTO } from '../../models/user.dto';
import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let injector: TestBed;
  let guard: AuthGuard;
  const routerMock = { navigateByUrl: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    guard = injector.get(AuthGuard);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate()).toEqual(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });

  it('Should return true when user in sessionStorage', () => {
    const user: LoginResponseDTO = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.ru',
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    expect(guard.canActivate()).toEqual(true);
  });
});
