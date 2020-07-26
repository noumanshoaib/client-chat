import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from "./home/home.component";

import { AuthGuardService } from "./services/auth-guard.service";
import { IsSignedInGuardService } from "./services/is-signed-in-guard.service";;

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [IsSignedInGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsSignedInGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
