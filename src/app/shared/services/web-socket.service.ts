import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
 
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;
  constructor(){
    setInterval(()=>{
      this.newmessage="hello"
      console.log("dsssssssssssssss");
      this.sendMessage() 
    },100000000)
  }
  ngOnInit() {

    this.connect();
  }
  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }
  connect() {
    const  socket=new SockJS("http://localhost:8089/api/testchat")
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/start/initial', function(hello){
        console.log(JSON.parse(hello.body));
        _this.showMessage(JSON.parse(hello.body));
      });
   });
  }
  sendMessage() {
    console.log(this.newmessage);
    
    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = "";
  }
  showMessage(message) {
    this.greetings.push(message);
  }
  
}