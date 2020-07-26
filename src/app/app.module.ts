import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { CustomHttpClientService } from './services/custom-http-client.service';
import { CustomLocalStorageService } from "./services/custom-local-storage.service";
import { PusherClientService } from "./services/pusher-client.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { IsSignedInGuardService } from "./services/is-signed-in-guard.service";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [ 
    CustomHttpClientService, 
    CustomLocalStorageService,
    PusherClientService,
    AuthGuardService,
    IsSignedInGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
