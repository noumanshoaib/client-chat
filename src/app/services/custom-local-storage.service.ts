import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomLocalStorageService {
  private _customLocalStorage
  constructor () 
  {
     this._customLocalStorage = localStorage;
  }

  setItem (key:string, value){
    this._customLocalStorage.setItem(key,JSON.stringify(value));
  }
  getItem (key:string): JSON
  {
    return JSON.parse(this._customLocalStorage.getItem(key));
  }
  clear (): void
  {
    this._customLocalStorage.clear();
  }
  hasItem (key:string): boolean
  {
    if(this._customLocalStorage.getItem(key) === null){
      return false;
    } 
    else{
      return true;
    }
  }
}
