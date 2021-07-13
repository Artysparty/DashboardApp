import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../notifications.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private notifService: NotificationService,
    private router: Router,
  ) { }
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notifService.openSnackBar('Проверьте имя пользователя или пароль', false);
          this.router.navigate(['/auth/login']);
        } else if (error.status === 400) {
          this.notifService.openSnackBar('Имя пользователя или пароль не могут быть пустыми', false);
        } else if (error.status === 404) {
          this.notifService.openSnackBar('Пользователь не найден', false);
          const url = this.router.url;
          this.router.navigate(['/error/not-found'], {
            queryParams: {
              returnUrl: url,
            }
          });
        } else {
          this.notifService.openSnackBar('Что-то пошло не так', false);
        }
        return throwError(error);
      })
    );
  }
}
