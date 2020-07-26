import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CustomHttpClientService } from "../services/custom-http-client.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public errors : string [];

  constructor(private _customHttpClient: CustomHttpClientService,private router: Router) { }

  ngOnInit(): void {
  }

  async register(){
    if(this.password != this.confirmPassword){
      alert('your Password should match with confirm password');
      return; 
    }
    else{
      var param = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      var response = await this._customHttpClient.postRequest('register',param);

      response.status == true? (alert('you have been successfully registered'),this.router.navigateByUrl('login')): alert(response.message);

      
    }
    
  }

}
