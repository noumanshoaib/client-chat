import { Injectable } from '@angular/core';
import {Router, CanActivate } from '@angular/router';

import { CustomLocalStorageService } from "./custom-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _customLocalStorage : CustomLocalStorageService, private router: Router) { }

  canActivate(){
     
      if(this._customLocalStorage.hasItem('token')){
        return true;
      }
      else{
        this.router.navigateByUrl('');
      }
      return false;
  }
}
