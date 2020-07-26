import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CustomLocalStorageService } from "../services/custom-local-storage.service";
import { PusherClientService } from "../services/pusher-client.service";
import { CustomHttpClientService } from "../services/custom-http-client.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  private scrollContainer: any;


  user: any;
  newMessage:string;
  selectedUser :any = {
    id: '',
    name: '',
  };


  messages:any =[];
  friends:any = [];

  constructor(private _customLocalStorage: CustomLocalStorageService,private _pusherClient: PusherClientService, private _customHttpClient: CustomHttpClientService) {
    this.user = this._customLocalStorage.getItem('user');
    this.newMessage = '';
   }

  async ngOnInit() {
    
   var response =  await this._customHttpClient.getRequestAuth('friend');

   this.friends = response.status == true ? response.data : (this._customLocalStorage.clear());
   this.selectedUser.id = this.friends.length > 0 ? this.friends[0].user.id : '';
   this.selectedUser.name =  this.friends.length > 0 ? this.friends[0].user.name : '';

   this.getMessageByUser();

   const channel = this._pusherClient.subscribe('private-chat');
  
    channel.bind('NewMessageNotification',
        (data:any) =>  {
        if(data.message.from == this.selectedUser.id){
          this.messages.push(data.message);
          this.chatScrollDown();
        }
        else{
          alert(this.friends.find(x => x.user.id === data.message.from).user.name + " has messaged you");
        }
      }
    );
  }

  ngAfterViewInit()
  {
    this.scrollContainer = this.scrollFrame.nativeElement;  
  }

  async sendMessage(){
    if(this.newMessage != ""){
        var messageObject = {
          'to' : this.selectedUser.id,
          'message': this.newMessage
        };

        var response = await this._customHttpClient.postRequestAuth('message',messageObject);
        
        response.status == true ? (this.newMessage = '',this.messages.push(response.data)): null;
        this.chatScrollDown();
    }
  }

  chatScrollDown(){
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  changeUser(id:number,name:string){
    this.selectedUser.id == id ? null : (this.selectedUser.id = id,this.selectedUser.name = name, this.getMessageByUser());
  }
  async getMessageByUser(){
   var response = await this._customHttpClient.getRequestAuth('message/'+this.selectedUser.id);
   this.messages = response.status == true ? response.data : (this._customLocalStorage.clear());
  }

}
