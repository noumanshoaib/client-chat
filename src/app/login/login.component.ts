import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CustomHttpClientService } from '../services/custom-http-client.service';
import { CustomLocalStorageService } from "../services/custom-local-storage.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  
  @Output() 
  isLoginSuccess = new EventEmitter();

  constructor(private _customHttpClient: CustomHttpClientService, private _customLocalStorage : CustomLocalStorageService) { }

  ngOnInit(): void {
    this.email = "";
    this.password = "";
  }

  async login() {
    var param = {
      email : this.email,
      password: this.password
    }
    
    var response =  await this._customHttpClient.postRequest('login' ,param);
    
    response.status == true ? 
    (this._customLocalStorage.setItem('user',response.data.user), this._customLocalStorage.setItem('token',response.data.token))  : alert(response.message);
    
    this.isLoginSuccess.emit(response.status);

  }
}
