import { Component } from '@angular/core';
import { HeaderComponent } from '../core/layout/header/header.component';
import { RoomService } from '../shared/services/room.service';
import { User } from '../shared/models/user.model';
import { immobilier } from '../shared/models/Immobiliers.model';
import { Room } from '../shared/models/Room.model';
import { JetonService } from '../shared/services/jeton.service';
import { Observable } from 'rxjs';
import { Jeton } from '../shared/models/Jeton.model';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  listUsers: User[] = [];
  immobilier: immobilier = new immobilier();
  room:Room=new Room();
  userAmountBid:any=0;
  jeton:Jeton=new Jeton();
  constructor(private RoomSer: RoomService,private jetonServ:JetonService) {
  }
  ngOnInit(): void {
    this.testRoom();
    this.room=this.RoomSer.Room;
  }
  testRoom() {
    this.RoomSer.getUsersbyRoom(this.RoomSer.Room.id).subscribe({
      next: (data: any) => { this.listUsers = data; console.log(this.listUsers) }
    })
  }
  getUserBidAmount(idUser :number):Jeton {
    //  this.jetonServ.getJetonByUser(idUser).subscribe({
    //   next:(data:any)=>{this.jeton=data;console.log(data)}
    // })
    console.log(this.jeton)
    return this.jeton;
  }

  
}
