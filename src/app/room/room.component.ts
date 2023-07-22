import { Component, NgZone, OnChanges, SimpleChanges } from '@angular/core';
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
import { interval, Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { WebSocketService } from '../shared/services/web-socket.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnChanges {
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
  private subscription: Subscription;
  private startTime: number;
  private duration: number = 0; // Duration in seconds (3 minutes)
  public elapsedTime: string;
  initialduration: number;
  listRooms: Room[];
  listTest: any[] = []
  constructor(private RoomSer: RoomService, private jetonServ: JetonService, private route: ActivatedRoute, private userServ: UserService, private router: Router) {
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    console.log(this.id)
    // console.log(this.webSocketSer.connect());
    this.RoomSer.getRoom(parseInt(this.id)).subscribe({
      next: (rm: Room) => {
        this.room = rm; console.log(this.room);;
      }
    });
    this.RoomSer.RetrieveImmobliereByRoom(parseInt(this.id)).subscribe({
      next: (imo: immobilier) => {this.immobilier = imo; console.log(this.immobilier)}
    })
    this.getUsers(parseInt(this.id));
    this.testRoom(parseInt(this.id));
    this.userServ.getCurrent().subscribe({
      next: (st: any) => this.buyerId = st.id
    })
    this.RoomSer.getRoomTime(parseInt(this.id)).subscribe({
      next: (time: number) => {
        this.duration = time;
        if (this.room.roomStatus != "Open") {
          this.initialduration = time;
        }
        else
          this.start();
      }
    })
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
    this.sortList()
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
                      this.testRoom(parseInt(this.id))
                      this.currentRoomAmount = 0;
                      this.reset();
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
        this.RoomSer.ExitRoom(user.id, parseInt(this.id)).subscribe({
          next: () => {
            this.router.navigateByUrl("/rooms");
          }
        }
        )
      }
    })
  }
  start() {
    if (this.room.roomStatus == "Open") {
      this.startTime = Date.now();
      this.subscription = interval(1000) // Update every second
        .subscribe(() => {
          const currentTime = Date.now();
          const elapsedMilliseconds = currentTime - this.startTime;
          const remainingMilliseconds = Math.max(0, this.duration * 1000 - elapsedMilliseconds);
          this.elapsedTime = this.formatElapsedTime(remainingMilliseconds);
        });
    }
    else {
      console.log("close")
    }
  }

  stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  reset() {
    this.startTime = this.initialduration;
    this.start();
  }

  private formatElapsedTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    this.room.timeRoom = seconds + minutes * 60;
    if (this.room.roomStatus == "Open")
      this.RoomSer.updateRoomTime(parseInt(this.id), this.room.timeRoom).subscribe({
        next: () => {
          if (this.room.timeRoom <= 0 && this.room.roomStatus == "Open" || this.room.roomStatus=="Closed") {
            this.room.roomStatus = "Closed";
             if (this.listUsers.length > 0) {
               this.RoomSer.ReserveRoom(parseInt(this.listUsers[0].id), this.immobilier.id, parseInt(this.id)).subscribe({
                 next: () => console.log(this.listUsers[0])
               })
             }
            var idUser = this.RoomSer.userIdRoom;
            this.RoomSer.updateRoom(this.room).subscribe({
              next: () => {
                this.listUsers.forEach(user => {
                  this.RoomSer.ExitRoom(user.id, parseInt(this.id)).subscribe({
                    next: () => {
                      this.router.navigateByUrl("/rooms")
                    }
                  })
                })
              }
            });
          }
        }
      })
    
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }


  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}



