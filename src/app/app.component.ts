import { Component, ViewChild } from '@angular/core';
import { RoomService } from './shared/services/room.service';
import { Room } from './shared/models/Room.model';
import { Subscription, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  constructor(private roomService: RoomService,private http:HttpClient) {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
   console.log(res);
   
    });
  }
  ngOnInit(): void {
    //  () => {
    //   return new Promise<void>((resolve, reject) => {
    //     // @ts-ignore
    //     google.accounts.id.initialize({
    //       client_id:
    //         '1044877328330-4ubq5g95p35psru5l07o6l89c5r44bev.apps.googleusercontent.com',
    //       callback: this.handleCredentialResponse,
    //       auto_select: false,
    //       cancel_on_tap_outside: false,
    //       onDemand: true,
    //     });
  
    //     resolve();
    //   });
    // };
    this.roomService.getallroom().subscribe({
      next: (data: Room[]) => {
        this.listRooms = data;
        this.listRooms = this.listRooms.filter(room => room.approvedRoom == true&& room.roomStatus=="Open");
        this.listRooms.forEach(room => {
          this.roomService.getRoomTime(room.id).subscribe({
            next: (time: number) => {
              if (room.roomStatus != "Open") {
                this.initialduration = time;
              }
              else
                this.start(room);
            }
          })
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
      if (room.timeRoom== 0 && room.roomStatus == "Open") {
        room.roomStatus = "Closed"
        this.roomService.updateRoom(room).subscribe({
          next: () => console.log(room)
        })
  
      } 
    }, 1000);
  }
}
