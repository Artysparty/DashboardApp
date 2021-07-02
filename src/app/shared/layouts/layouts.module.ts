import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';

@NgModule({
  declarations: [
    EmptyLayoutComponent,
  ],
  imports: [
    RouterModule,
  ],
  exports: [
    EmptyLayoutComponent
  ]
})
export class LayoutsModule { }
