import { Router } from '@angular/router';

import { TestBed } from '@angular/core/testing';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

import { HttpConfigInterceptor } from './error-interceptor';

import { NotificationService } from '../notifications.service';

const testUrl = '/data';

interface Data {
  name: string;
}

describe('ErrorInterceptor', () => {
  describe('intercept', () => {
    let errorInterceptor: HttpConfigInterceptor;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;

    let routerMock = { navigate: jest.fn() };
    const notificationMock = { openSnackBar: jest.fn() };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true,
          },
          {
            provide: NotificationService,
            useValue: notificationMock,
          },
          HttpConfigInterceptor,
          MatSnackBar,
          Overlay,
          {
            provide: Router,
            useValue: routerMock,
          },
        ],
        imports: [HttpClientTestingModule],
      });

      httpClient = TestBed.get(HttpClient);
      httpMock = TestBed.get(HttpTestingController);
      routerMock = TestBed.get(Router);
    });

    it('When 401, user is automatically redirect on login page and error is log out in snackBar', () => {
      const emsg = '401 error';
      httpClient.get<Data>(testUrl).subscribe(
        (res) => fail('should have failed with the 401 error'),
        (error: HttpErrorResponse) => {
          expect(notificationMock).toHaveBeenCalledWith(emsg);
          expect(routerMock).toHaveBeenCalledWith(['auth/login']);
        },
      );
      const req = httpMock.expectOne(testUrl);
      req.flush(emsg, { status: 401, statusText: 'Unauthorized' });
    });

    it('When 404, user is automatically redirect on login page and error is log out in snackBar', () => {
      const emsg = '404 error';
      httpClient.get<Data>(testUrl).subscribe(
        (res) => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(notificationMock).toHaveBeenCalledWith(emsg);
          expect(routerMock).toHaveBeenCalledWith(['/error/not-found']);
        },
      );
      const req = httpMock.expectOne(testUrl);
      req.flush(emsg, { status: 404, statusText: 'Not found' });
    });

    it('When 400, error is log out in snackBar', () => {
      const emsg = '400 error';
      httpClient.get<Data>(testUrl).subscribe(
        (res) => fail('should have failed with the 400 error'),
        (error: HttpErrorResponse) => {
          expect(notificationMock).toHaveBeenCalledWith(emsg);
        },
      );
      const req = httpMock.expectOne(testUrl);
      req.flush(emsg, { status: 400, statusText: 'Not found' });
    });
  });
});
