import { Component } from '@angular/core';
import { Room } from '../shared/models/Room.model';
import { Router } from '@angular/router';
import { RoomService } from '../shared/services/room.service';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from '../shared/services/user.service';
import { ThemeService } from '../shared/services/teme.service';
import { JetonService } from '../shared/services/jeton.service';
import { Jeton } from '../shared/models/Jeton.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  listRooms: Room[] = [];
  room: Room = new Room();
  private userId!: number;
  theme: string;
  listUsers: User[] = [];
  joined: boolean = false;
  visible: boolean = false
  selfJoined: boolean = false;
  constructor(private router: Router, private roomserv: RoomService, private userServ: UserService, public themeService: ThemeService, private jetonServ: JetonService) { }
  ngOnInit(): void {
    this.roomserv.getallroom().subscribe({
      next: (data: any) => {
        this.listRooms = data;
        this.listRooms.forEach(room => room.joined = false)
        this.listRooms = this.listRooms.filter(rm => rm.approvedRoom == true);
        this.listRooms.forEach(room => this.VerifyUserRoom(room.id))
      }
    })
    this.themeService.theme$.subscribe(theme => {
      this.theme = theme
    })

  }
  verUsRo() {
    for (let i = 0; i < this.listRooms.length; i++) {
      if (this.listRooms[i].joined == true) {
        this.visible = true
        break;
      }
    }
    return this.visible
  }
  navToRoom(roomId: number) {
    this.listRooms.forEach(room => {
      this.roomserv.getUsersbyRoom(room.id).subscribe({
        next: (data: User[]) => {
          data.forEach(user => {
            this.userServ.getCurrent().subscribe({
              next: (me: User) => {
                if (me.id == user.id) {
                  this.selfJoined = true
                }
                for (let i = 0; i < this.listRooms.length; i++) {
                  if (this.listRooms[i].joined == true) {
                    this.visible = true
                  }
                }
              }
            })
          })
        }
      })
    })
    if (this.selfJoined|| ! this.visible) {
      this.userServ.getCurrent().subscribe({
        next: (data: any) => {
          this.userId = data.id
          this.roomserv.AssignUserToRoom(roomId, data.id).subscribe({
            next: (dt: any) => {
              if (dt.message == "Access Granted") {
                this.listRooms.forEach(p => {
                  p.clientNumber = p.clientNumber + 1;
                  if (p.id == roomId) this.roomserv.Room = p;
                  this.roomserv.updateRoom(p).subscribe({ next: (data: any) => console.log(data) });
                  // console.log( this.jetonServ.getJetonByUser(1)
                  this.router.navigateByUrl("/room/" + roomId);
                })
              }
              else {
                this.router.navigateByUrl("/payment");
              }
            }
          })
        }
      }
      )
    }
    else {
      this.visible = true
    }
  }


  VerifyUserRoom(roomId: number) {
    this.roomserv.getUsersbyRoom(roomId).subscribe({
      next: (data: any) => {
        this.listUsers = data;
        this.listUsers.forEach(user => {
          this.userServ.getCurrent().subscribe({
            next: (userMe: any) => {
              if (userMe.id == user.id) {
                this.roomserv.getRoom(roomId).subscribe({
                  next: (rm: Room) => {
                    this.listRooms.forEach(room => {
                      if (room.id == rm.id) {
                        room.joined = true
                      }
                    })
                  }
                })
              }
            }
          })
        })
      }
    })
  }
  exitRoom() {
    this.userServ.getCurrent().subscribe({
      next: (user: User) => {
        this.roomserv.ExitRoom(user.id).subscribe({
          next: () => {
            this.listRooms.forEach(room => room.joined = false)

          }
        })
      }
    })

  }
}