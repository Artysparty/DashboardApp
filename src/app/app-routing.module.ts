import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyLayoutComponent } from './shared/layouts/empty-layout/empty-layout.component';
import { InnerLayoutComponent } from './shared/layouts/inner-layout/inner-layout.component';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AuthGuard } from './shared/services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        component: EmptyLayoutComponent,
        children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
        ],
      },
      {
        path: 'error',
        component: EmptyLayoutComponent,
        children: [
          { path: '', redirectTo: '/error/not-found', pathMatch: 'full' },
          { path: 'not-found', component: NotFoundComponent }
        ]
      },
      {
        path: 'app', 
        component: InnerLayoutComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent }
        ]
      }
    ],
  },
  {
    path: '**', redirectTo: '/error/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
