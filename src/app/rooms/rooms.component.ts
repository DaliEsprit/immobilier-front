import { Component } from '@angular/core';
import { Room } from '../shared/models/Room.model';
import { Router } from '@angular/router';
import { RoomService } from '../shared/services/room.service';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from '../shared/services/user.service';
import { ThemeService } from '../shared/services/teme.service';
import { JetonService } from '../shared/services/jeton.service';
import { Jeton } from '../shared/models/Jeton.model';

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
  constructor(private router: Router, private roomserv: RoomService, private userServ: UserService, public themeService: ThemeService, private jetonServ: JetonService) { }
  ngOnInit(): void {
    this.roomserv.getallroom().subscribe({
      next: (data: any) => { this.listRooms = data;this.listRooms=this.listRooms.filter(rm=>rm.approvedRoom==true);console.log(this.listRooms) }
    })
    this.themeService.theme$.subscribe(theme => {
      this.theme = theme
    })
    
  }
  navToRoom(roomId: number) {
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
              })
              // console.log( this.jetonServ.getJetonByUser(1)
              this.router.navigateByUrl("/room/"+roomId);

            }
            else {
              this.router.navigateByUrl("/payment")
            }
          }
        })
      }
    })

  }
}
