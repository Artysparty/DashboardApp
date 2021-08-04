import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from 'src/app/shared/app-material.module';

import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { InnerLayoutComponent } from './inner-layout/inner-layout.component';

@NgModule({
  declarations: [
    EmptyLayoutComponent,
    InnerLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
  ],
  exports: [
    EmptyLayoutComponent,
    InnerLayoutComponent,
  ],
})
export class LayoutsModule { }
