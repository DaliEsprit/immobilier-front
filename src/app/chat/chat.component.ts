import { Component, OnInit } from '@angular/core';
import { Client, over } from 'webstomp-client';
import * as SockJS from 'sockjs-client/dist/sockjs'; // Update the import statement for SockJS
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private client: Client;
  messages: string[] = [];
  messageInput: string;
  data: any[] = [];

  constructor() { }

  ngOnInit() {
    this.client = over(new SockJS('http://localhost:8089/api/ws'));
    this.client.connect({}, () => {
      this.client.subscribe('/topic/messages', (message) => {
        console.log(message);
        this.messages.push(JSON.parse(message.body).content);
      });
    });
  }

  sendMessage() {
      this.client.send('/app/chat', JSON.stringify({
        content: this.messageInput,
        sender: 'user'
      }))

    this.client.commit(this.messageInput)
    console.log(this.data);
    this.messageInput = '';
  }
}