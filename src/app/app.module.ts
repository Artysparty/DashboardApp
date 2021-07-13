import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/app-material.module';
import { LayoutsModule } from './shared/layouts/layouts.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { HttpConfigInterceptor } from './shared/services/interceptors/error-interceptor';
import { LoadingInterceptor } from './shared/services/interceptors/loading.interceptor';
import { AuthGuard } from './shared/services/guards/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    LoginComponent,
    DialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgbModule,
    AppRoutingModule,
    AppMaterialModule,
    LayoutsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
    AuthGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
