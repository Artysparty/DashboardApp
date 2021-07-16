import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notifications.service';

describe('DataService', () => {
  let service: NotificationService;

  const mockMatSnackBar = {
      open: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ NotificationService , {provide: MatSnackBar, useValue: mockMatSnackBar}],
    });
    service = TestBed.get(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run method', () => {
      const spy = jest.spyOn(service, 'openSnackBar');
      service.openSnackBar('sad', true);
      expect(spy).toHaveBeenCalled();
  })
});
