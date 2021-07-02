import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';

@NgModule({
  declarations: [
    EmptyLayoutComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class LayoutsModule { }
