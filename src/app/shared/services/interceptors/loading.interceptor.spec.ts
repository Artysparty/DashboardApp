import { TestBed } from '@angular/core/testing';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Overlay } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from 'src/app/shared/services/loading.service';

const testUrl = '/data';

interface Data {
  name: string;
}

describe('LoadingInterceptor', () => {
  describe('intercept', () => {
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let loadingMock = { isLoading: new BehaviorSubject<boolean>(false) };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
          },
          { provide: LoadingService, useValue: loadingMock },
          LoadingInterceptor,
          Overlay,
        ],
        imports: [HttpClientTestingModule],
      });

      httpClient = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
      loadingMock = TestBed.inject(LoadingService);
    });

    it('Should toggle isLoading when loading', () => {
      const emsg = '200 OK';
      httpClient.get<Data>(testUrl).subscribe(
        (res) => {
          expect(loadingMock.isLoading.next).toHaveBeenCalledWith(true);
        },
        (next: HttpHandler) => {
          expect(loadingMock.isLoading.next).toHaveBeenCalledWith(false);
        }
      );
      const req = httpMock.expectOne(testUrl);
      req.flush(emsg, { status: 200, statusText: 'OK' });
    });
  });
});
