import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket=new SockJS("http://localhost:8089/api/ws")
  ws=new WebSocket("http://localhost:8089/api/ws");

  constructor() { }


  connect(){
    this.ws.onmessage=function(data){
      console.log(data);
      addToUi(data)
    }
  }

}
function addToUi(message:any) {
  var jsonMsg = JSON.parse(message);
  document.querySelector('#messages').innerHTML += "<tr><th>" + jsonMsg.status.id + "</th><th>"+jsonMsg.status.text+"</th></tr>";}

