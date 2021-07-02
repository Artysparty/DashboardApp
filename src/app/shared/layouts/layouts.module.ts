import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
