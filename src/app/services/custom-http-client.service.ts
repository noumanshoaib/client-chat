import { Injectable } from '@angular/core';
import Axios from "axios";
import { CustomLocalStorageService } from "./custom-local-storage.service";



@Injectable({
  providedIn: 'root'
})
export class CustomHttpClientService {

  private _httpClient;

  constructor(private _customLocalStorage: CustomLocalStorageService) { 
    
    this._httpClient = Axios.create({baseURL:'http://127.0.0.1:8000/api/'});

  }

  async postRequest(endPoint: string, param: any){
   var response = await this._httpClient.post(endPoint,param).then(data=>{
      return data.data;
    }).catch(error => {
       if(!error.status && error.response == undefined){
         return {
           status: false,
           message: 'Something wents wrong.',
         }
       }
       return error.response.data;
    });

    return response;
  }


  async postRequestAuth(endPoint: string, param: any){
    var response = await this._httpClient.post(endPoint ,param,{ headers: {
      Authorization: 'Bearer ' + this._customLocalStorage.getItem('token'),
    }} ).then(data=>{
       return data.data;
     }).catch(error => {
      if(!error.status && error.response == undefined){
        return {
          status: false,
          message: 'Something wents wrong.',
        }
      }
        return error.response.data;
     });
 
     return response;
   }


   async getRequestAuth(endPoint: string, param?: any){
    var response = await this._httpClient.get(endPoint,{
      headers: {
        Authorization: 'Bearer ' + this._customLocalStorage.getItem('token'),
      },
      params: param
    }).then(data=>{
       return data.data;
     }).catch(error => {
      if(!error.status && error.response == undefined){
        return {
          status: false,
          message: 'Something wents wrong.',
        }
      }
        return error.response.data;
     });
 
     return response;
   }

   
}
