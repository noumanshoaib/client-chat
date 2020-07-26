import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { CustomLocalStorageService } from "./custom-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuardService implements CanActivate {

  constructor(private _customLocalStorage: CustomLocalStorageService, private router: Router) { }

  canActivate(){
     
    if(this._customLocalStorage.hasItem('token')){
      this.router.navigateByUrl('home');
      return false;
    }
    return true;
}
}
