import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { CustomLocalStorageService } from "./services/custom-local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-chat';
  isLogin;
  
  constructor(private _customLocalStorage: CustomLocalStorageService, private router: Router){}

  ngOnInit(): void {
    if(this._customLocalStorage.hasItem('token')){
      this.isLogin = true;
    }
    else{
      this.isLogin = false;
    }
  }
  logOut(): void{
    this._customLocalStorage.clear();
    this.isLogin = false;
  }
  onActivate(event) {
    if(event.isLoginSuccess)
    {
      event.isLoginSuccess.subscribe((data) => {
        if(data){
          this.isLogin = true;
          window.location.href = '/home';
        }
      });
    }
 }
}
