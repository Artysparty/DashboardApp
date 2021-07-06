import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from '../notifications.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private notifService: NotificationService,
    private router: Router) { }
// rename file to kebab-case
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notifService.openSnackBar('401', false);
          this.router.navigate(['/auth/login']);
        } else if (error.status === 404) {
          this.notifService.openSnackBar('404', false);
          this.router.navigate(['/error/not-found']);
        } else {
          this.notifService.openSnackBar('Что-то пошло не так', false)
        }
        return throwError(error);
      })
    );
  }
}
