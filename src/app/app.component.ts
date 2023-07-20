import { Component, ViewChild } from '@angular/core';
import { RoomService } from './shared/services/room.service';
import { Room } from './shared/models/Room.model';
import { Subscription, interval } from 'rxjs';
import { JetonService } from './shared/services/jeton.service';
import { User } from './shared/models/user.model';
import { AuthService } from './core/auth/auth.service';
import { WebSocketService } from './shared/services/web-socket.service';
// import { initializeGoogleSignIn } from './utils/google.initializer';
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class:
      'block h-full bg-zinc-50 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900',
  },
})
export class AppComponent {
  private listRooms: Room[] = []
  private subscription: Subscription;
  private startTime: number;
  private duration: number = 0; // Duration in seconds (3 minutes)
  public elapsedTime: string;
  initialduration: number;
  private listUsers:User[];
  constructor(private authService:AuthService,private roomService: RoomService, private jetonService: JetonService,private s:WebSocketService) {
   this.authService.socialSignOn()
   s.connect()
  }
  ngOnInit(): void {
   
    this.roomService.getallroom().subscribe({
      next: (data: Room[]) => {
        this.listRooms = data;
        this.listRooms = this.listRooms.filter(room => room.approvedRoom == true && room.roomStatus == "Open");
        this.listRooms.forEach(room => {
          this.roomService.getRoomTime(room.id).subscribe({
            next: (time: number) => {
              if (room.roomStatus != "Open") {
                this.initialduration = time;
              }
              else if (time <= 0 && this.listRooms.length!=0)
                this.start(room);
            }
          })
        })
      }
    })
    this.listRooms.forEach(room=>{
      if(room.clientNumber>0){
        this.roomService.getUsersbyRoom(room.id).subscribe({
          next:(users:User[])=>{
            this.listUsers=users;
            this.listUsers.forEach(user=>{
              console.log(user)
            })
          }
        })
      }
    })
  }
  handleCredentialResponse(response: any) {
    // Handle the response after the user signs in
    console.log(response);
  }
  start(room: Room) {
    setInterval(() => {
      room.timeRoom--;
      this.roomService.updateRoomTime(room.id, room.timeRoom).subscribe({
        next: () => {
          console.log(room.timeRoom)
        }
      })
      if (room.timeRoom <= 0 && room.roomStatus == "Open") {
        room.roomStatus = "Closed"
        var idUser=this.roomService.userIdRoom
        this.roomService.updateRoom(room,idUser).subscribe({
          next: () => console.log(room)
        })

      }
    }, 1000);
  }
}
