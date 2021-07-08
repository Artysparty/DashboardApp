import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperationDTO } from '../../models/data.dto';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  description!: string;
  operationDate!: Date;
  balance!: number;
  category!: string;
  authorizationCode!: string;
  amount!: number;
  processingDate!: Date;
  transactionDescription!: string;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.operationDate = data.operationDate;
    this.balance = data.balance;
    this.amount = data.amount;
    this.authorizationCode = data.authorizationCode;
    this.processingDate = data.processingDate;
    this.transactionDescription = data.transactionDescription;
    this.category = data.category;
  }

  close() {
    this.dialogRef.close();
  }
}
