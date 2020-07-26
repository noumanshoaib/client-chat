import { Injectable } from '@angular/core';
import Pusher,* as pusher from "pusher-js";
import { CustomLocalStorageService } from "./custom-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PusherClientService {
  private _pusherClient;
  private user:any;

  constructor(private _customLocalStorage: CustomLocalStorageService) {
    this._pusherClient = new Pusher('c0e83590d4f9648c3ce2', {
      cluster: 'ap2',
      authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
      auth: {
        headers: {
          Authorization: 'Bearer ' + this._customLocalStorage.getItem('token'),
        }
      }
    });
    this.user = this._customLocalStorage.getItem('user');
   }
   subscribe(channelname:string){
     var channel = this._pusherClient.subscribe(channelname+'.'+this.user.id);
     return channel;
   }
}
