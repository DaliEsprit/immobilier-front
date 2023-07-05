import { Component } from '@angular/core';
import { HeaderComponent } from '../core/layout/header/header.component';
import { RoomService } from '../shared/services/room.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  constructor(private RoomSer:RoomService){
  }
  ngOnInit():void{
    
  }
  testRoom(){
    console.log(this.RoomSer.Room);
  }
}
