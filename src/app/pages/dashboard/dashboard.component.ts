import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {
  ChartDTO,
  DataResponseDTO,
  MultiDTO,
  OperationDTO,
} from 'src/app/shared/models/data.dto';
import { DataService } from 'src/app/shared/services/data.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  response!: DataResponseDTO;
  responseOperations!: OperationDTO[];

  //dates
  form = new FormGroup({
    range: new FormGroup({
      fromDate: new FormControl([null, [Validators.required]]),
      toDate: new FormControl([null, [Validators.required]]),
    }),
  });

  //graphics
  view: any = [700, 400];
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Дата операции';
  yAxisLabel: string = 'Баланс';
  timeline: boolean = false;
  tooltipDisabled: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  chartData: ChartDTO[] = [];
  fullChartData: MultiDTO[] = [];

  //table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'Код авторизации',
    'Дата операции',
    'Сумма операции, ₽',
    'Баланс, ₽',
    'Описание транзакции',
  ];
  dataSource!: MatTableDataSource<OperationDTO>;
  constructor(
    private dataService: DataService,
    private storageService: SessionStorageService,
    private dialog: MatDialog
  ) {}

  submit() {
    const user = this.storageService.getUser();
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
            name: opertion.operationDate,
          };
          this.chartData.push(op);
        });
        this.fullChartData[0] = {
          name: 'balance',
          series: this.chartData,
        };

        this.fullChartData = [...this.fullChartData];
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(operation: OperationDTO) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = operation;
    this.dialog.open(DialogComponent, dialogConfig);
  }
}
