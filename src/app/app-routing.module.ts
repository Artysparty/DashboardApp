import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { EmptyLayoutComponent } from './shared/layouts/empty-layout/empty-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        component: EmptyLayoutComponent,
        children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent, pathMatch: 'full' },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
