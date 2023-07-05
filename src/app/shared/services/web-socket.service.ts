import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket=new SockJS("http://localhost:8089/api/ws")
  stompClient=Stomp.over(this.socket);
  constructor() { }
}
