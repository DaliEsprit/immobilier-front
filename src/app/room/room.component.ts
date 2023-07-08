import { Component } from '@angular/core';
import { HeaderComponent } from '../core/layout/header/header.component';
import { RoomService } from '../shared/services/room.service';
import { User } from '../shared/models/user.model';
import { immobilier } from '../shared/models/Immobiliers.model';
import { Room } from '../shared/models/Room.model';
import { JetonService } from '../shared/services/jeton.service';
import { Observable } from 'rxjs';
import { Jeton } from '../shared/models/Jeton.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  listUsers: User[] = [];
  immobilier: immobilier = new immobilier();
  room: Room = new Room();
  userAmountBid: any = 0;
  jeton: Jeton = new Jeton();
  id: string;
  bidValue: any = 0;
  currentRoomAmount: any;
  user:User;
  constructor(private RoomSer: RoomService, private jetonServ: JetonService, private route: ActivatedRoute,private userServ:UserService) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.RoomSer.getRoom(parseInt(this.id)).subscribe({ next: (rm: Room) => this.room = rm });
    this.getUsers(parseInt(this.id));
    this.testRoom(parseInt(this.id));
  }
  getUsers(id: number) {
    this.RoomSer.getUsersbyRoom(id).subscribe({
      next: (data: any) => { this.listUsers = data }
    })
  }
  getUserBidAmount(idUser: string): any {
    var x = parseInt(idUser)
    this.jetonServ.getJetonByUser(x).subscribe({
      next: (data: any) => {
        this.jeton = data; this.bidValue = this.jeton.bidValue;
        this.listUsers.forEach(user => {
          if (idUser == user.id) {
            user.bidValue = this.jeton.bidValue
          }
        })
      }
    })
    console.log(this.jeton.bidValue)
    return this.jeton.bidValue!;
  }
  testRoom(id: number) {
    this.listUsers.forEach(user => { this.getUserBidAmount(user.id) });
    this.RoomSer.getUsersbyRoom(id).subscribe({
      next: (user: any) => {
        this.listUsers = user;
        this.listUsers.forEach(us => this.getUserBidAmount(us.id))
      }
    })
  }
  updateBid() {
    console.log(this.currentRoomAmount);
    this.userServ.getCurrent().subscribe({
      next:(data:any)=>{this.user=data}
    })
    console.log(this.user)
  }
}



