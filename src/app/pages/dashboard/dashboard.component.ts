import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

import { Subscription } from 'rxjs';

import { DataService } from 'src/app/shared/services/data.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

import {
  ChartDTO,
  DataResponseDTO,
  MultiDTO,
  OperationDTO,
} from 'src/app/shared/models/data.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  response!: DataResponseDTO;
  responseOperations!: OperationDTO[];

  //dates
  form = this.fb.group({
    range: this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
    }),
  });

  chartData: ChartDTO[] = [];
  fullChartData: MultiDTO[] = [];

  //table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'authorizationCode',
    'operationDate',
    'amount',
    'balance',
    'transactionDescription',
  ];
  dataSource!: MatTableDataSource<OperationDTO>;

  private subscriptions$ = new Subscription();

  constructor(
    private dataService: DataService,
    private storageService: SessionStorageService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private fb: FormBuilder,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  submit(): void {
    const user = this.storageService.getUser();
    this.subscriptions$.add(
      this.dataService
      .getData({ user, ...this.form.value.range })
      .subscribe((response: DataResponseDTO) => {
        this.response = response;
        this.responseOperations = response.operations;
        this.dataSource = new MatTableDataSource(response.operations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        response.operations.forEach((opertion) => {
          let op: ChartDTO = {
            value: opertion.balance,
            name: this.formatDate(opertion.operationDate) ?? '',
          };
          this.chartData.push(op);
        });
        const fullChartDataLine = {
          name: 'balance',
          series: this.chartData,
        };

        this.fullChartData = [...[fullChartDataLine]];
      })
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(operation: OperationDTO): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = operation;
    this.dialog.open(DialogComponent, dialogConfig);
  }

  formatDate(data: string): string | null {
    return this.datePipe.transform(data, 'dd.MM.yyyy');
  }
}
