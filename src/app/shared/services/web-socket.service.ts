import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import { Room } from '../models/Room.model';
import { RoomService } from './room.service';
import { User } from '../models/user.model';
import { JetonService } from './jeton.service';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  listRooms: Room[] = [];
  listUsers: User[] = [];
  haja: any[] = [];
  listuserBids: any[] = [];
  private socket: WebSocket;
  private socket$: WebSocketSubject<any>;
  private readonly url = 'ws://localhost:8089/api/testchat/937/0l5xxd00/websocket';

  private stompClient = null;
  constructor(private Roomserv: RoomService, private jetonser: JetonService) {
    setInterval(() => {
      this.newmessage = "hello"
      this.Roomserv.getallroom().subscribe({
        next: (listRooms: Room[]) => {
          this.listRooms = listRooms.filter(romm => romm.approvedRoom == true && romm.roomStatus == "Open")
          this.listRooms.forEach(room => {
            this.Roomserv.getUsersbyRoom(room.id).subscribe({
              next: (users: User[]) => {
                this.listUsers = users;
                this.listUsers.forEach(user => {
                  this.jetonser.getJetonByUser(parseInt(user.id)).subscribe({
                    next: (datajet: any) => {
                      user.bidValue = datajet.bidValue;
                      if (!this.listuserBids.includes("userId: " + user.id))
                        this.listuserBids.push("userId: " + user.id, "userBid: " + user.bidValue)
                    }
                  })
                })
                this.sendMessage(this.listuserBids)

              }
            })
          })
        }
      })

    }, 1000)
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
    const socket = new SockJS("http://localhost:8089/api/testchat")
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/start/initial', function (hello) {
        console.log(JSON.parse(hello.body));
      });
    });
  }
  sendMessage(listuserBids: any) {
    console.log(this.newmessage);

    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify({
        listuserBids
      })
    );
    this.socket$ = new WebSocketSubject<any>("'ws://localhost:8089/api/testchat/937/0l5xxd00/websocket'");
    this.newmessage = "";
  }
  showMessage(message) {
    this.greetings.push(message);
  }
}