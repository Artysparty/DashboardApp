import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
    ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatCardModule],
})
export class AppMaterialModule {}
