import { TestBed } from '@angular/core/testing';
import { LoginResponseDTO } from '../models/user.dto';
import { SessionStorageService } from './session-storage.service';

describe('DataService', () => {
  let service: SessionStorageService;
  const user: LoginResponseDTO = {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.ru',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService],
    });
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user', () => {
    service.saveUser(user);
    expect(sessionStorage.getItem('user')).toBeTruthy();
  });

  it('should get user', () => {
    sessionStorage.setItem('user', JSON.stringify(user));
    expect(service.getUser()).toBeTruthy();
  });

  it('should clear session storage', () => {
    sessionStorage.setItem('user', JSON.stringify(user));
    service.clear();
    expect(sessionStorage.getItem('user')).toBeFalsy;
  });
});
