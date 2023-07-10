import { Component } from '@angular/core';
import { HeaderComponent } from '../core/layout/header/header.component';
import { RoomService } from '../shared/services/room.service';
import { User } from '../shared/models/user.model';
import { immobilier } from '../shared/models/Immobiliers.model';
import { Room } from '../shared/models/Room.model';
import { JetonService } from '../shared/services/jeton.service';
import { Observable } from 'rxjs';
import { Jeton } from '../shared/models/Jeton.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: User;
  buyerId: string
  constructor(private RoomSer: RoomService, private jetonServ: JetonService, private route: ActivatedRoute, private userServ: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.RoomSer.getRoom(parseInt(this.id)).subscribe({ next: (rm: Room) => { this.room = rm; console.log(this.room) } });
    this.getUsers(parseInt(this.id));
    this.testRoom(parseInt(this.id));
    this.userServ.getCurrent().subscribe({
      next: (st: any) => this.buyerId = st.id
    })
    // this.getAllUserBids()
  }
  getUsers(id: number) {
    this.RoomSer.getUsersbyRoom(id).subscribe({
      next: (data: any) => {
        this.listUsers = data;
        console.log(this.listUsers)
      }
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
            user["bidValue"] = this.jeton.bidValue
          }
        })
        this.sortList();
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
  updateBid(userId: string) {
    console.log(this.currentRoomAmount);
    this.userServ.getCurrent().subscribe({
      next: (data: any) => {
        this.user = data;
        (this.listUsers.forEach(singleuser => {
          if (singleuser.bidValue < this.currentRoomAmount) {
            if (userId == singleuser.id) {
              this.jetonServ.getJetonByUser(parseInt(singleuser.id)).subscribe({
                next: (jt: any) => {
                  this.jeton = jt;
                  this.jeton.bidValue = this.currentRoomAmount
                  console.log(this.jeton);
                  this.jetonServ.updateJetonBidValue(this.jeton.idJeton, this.currentRoomAmount).subscribe({
                    next: (updateJeton: Jeton) => {
                      const currentIndex = this.listUsers.findIndex(item => item.id == this.user.id);
                      const elementToMove = this.listUsers.splice(currentIndex, 1)[0];
                      this.listUsers.splice(0, 0, elementToMove);
                      this.getUserBidAmount(this.user.id);
                      this.currentRoomAmount = 0;
                    }
                  })
                }
              })
            }
            else {
              console.log("it's insufficiant")
            }
          }
        }))
      }
    })
  }
  // getAllUserBids():any{
  //   this.listUsers=this.listUsers.forEach(user=>user.bidValue)
  // }
  sortList() {
    this.listUsers.sort((a, b) => {
      // Compare the desired property for sorting (e.g., 'name' or 'value')
      if (a.bidValue < b.bidValue) {
        return 1;
      } else if (a.bidValue > b.bidValue) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  ExitRoom(): void {
    this.userServ.getCurrent().subscribe({
      next: (user: User) => {
        this.RoomSer.ExitRoom(user.id).subscribe({
          next: () => { this.router.navigateByUrl("/rooms"); }
        }
        )
      }
    })
  }
}



