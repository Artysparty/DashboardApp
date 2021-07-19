import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { DataRequestDTO, DataResponseDTO } from '../models/data.dto';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;
  const data: DataRequestDTO = {
    user: { id: 1, firstName: 'Test', lastName: 'Test', email: 'test@test.ru' },
    fromDate: new Date('16/06/2021'),
    toDate: new Date('17/06/2021'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returned Observable should match the right data', () => {
    const resp: DataResponseDTO = {
      amount: 1234,
      debit: 1234,
      fromDate: '11.10.1959',
      operations: [
        {
          operationDate: '11.10.1959',
          processingDate: '11.10.1959',
          amount: 123,
          authorizationCode: '123',
          balance: 123,
          category: 'Category',
          transactionDescription: 'Description',
        },
      ],
      refill: 123,
      toDate: '11.10.1959',
    };

    service.getData(data).subscribe((response) => {
      expect(response.amount).toBeInstanceOf(Number);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:5000/api/data'
    );

    expect(req.request.method).toEqual('PUT');

    req.flush(resp);
  });
});
