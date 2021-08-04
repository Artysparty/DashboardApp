import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, flag: boolean): void {
    this.snackBar.open(message, undefined, { duration: 5000, panelClass: flag ? 'bg-success' : 'bg-error' });
  }
}
