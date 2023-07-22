import { Component } from '@angular/core';
import { RoomService } from '../shared/services/room.service';
import { UserService } from '../shared/services/user.service';
import { Room } from '../shared/models/Room.model';
import { User } from '../shared/models/user.model';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { immobilier } from '../shared/models/Immobiliers.model';
import { ImmobilierService } from '../shared/services/immobilier.service';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent {
  listRooms: Room[] = [];
  listDisapprovedRooms: Room[] = [];
  user: User;
  open: number;
  closed: number;
  notstarted: number;
  approved: number;
  Editvisible: boolean;
  AddVisible: boolean;
  RoomToAdd: Room = new Room();
  RoomToEdit: Room;
  goldRoom: boolean;
  goldchekedValue: boolean;
  basicCheckedValue: boolean;
  premiumcheckedValue: boolean;
  premiumRoom: boolean;
  approveModel: boolean;
  listImmobiliere: immobilier[];
  immobilierename: string = "";
  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Angular Pie Chart in Material UI Tabs',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'pie',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
        ],
      },
    ],
  };
  constructor(private roomService: RoomService, private userservice: UserService, private router: Router, private immoServ: ImmobilierService) {

  }
  ngOnInit(): void {
    this.getAllRooms();
    this.getAllImmobiliere();
  }
  getAllImmobiliere() {
    this.userservice.getCurrent().subscribe({
      next: (user: User) => {
        this.user = user;
        this.immoServ.getImmobiliereByUser(parseInt(this.user.id)).subscribe({
          next: (immobilier: immobilier[]) => {
            this.listImmobiliere = immobilier
            console.log(this.listImmobiliere)
          }
        })
      }
    })
  }

  getAllRooms() {
    this.userservice.getCurrent().subscribe({
      next: (user: User) => {
        this.user = user;
        if (this.user.role == "ROLE_SELLER") {
          this.roomService.getRoomsByUser(user.id).subscribe({
            next: (rooms: Room[]) => {
              this.listRooms = rooms
              this.listRooms.forEach(room => {
                this.roomService.getUserbyRoomCreated(room.id).subscribe({
                  next: (user: User) => {
                    room.user = user;
                  }
                })
              })
              this.open = rooms.filter(r => r.roomStatus == "Open").length
              this.closed = rooms.filter(r => r.roomStatus == "Closed").length
              this.notstarted = rooms.filter(r => r.roomStatus == "NotStarted").length
              this.approved = rooms.filter(r => r.approvedRoom == true).length
            }
          })
        }
        else if (this.user.role == "ROLE_ADMIN") {
          this.roomService.getallroom().subscribe({
            next: (rooms: Room[]) => {
              this.listRooms = rooms
              this.listDisapprovedRooms = rooms.filter(r => r.approvedRoom == false)
              this.open = rooms.filter(r => r.roomStatus == "Open").length
              this.closed = rooms.filter(r => r.roomStatus == "Closed").length
              this.notstarted = rooms.filter(r => r.roomStatus == "NotStarted").length
              this.approved = rooms.filter(r => r.approvedRoom == true).length
              this.listRooms.forEach(room => {
                this.roomService.getUserbyRoomCreated(room.id).subscribe({
                  next: (userf: User) => {
                    room.user = userf;
                  }
                })
              })
            }
          })
        }
      }
    })
  }
  deleteRoom(roomId: number) {
    this.roomService.deleteRoom(roomId).subscribe({
      next: () => this.getAllRooms()
    })
  }
  navToRoom(roomId: number) {
    this.router.navigateByUrl("/room/" + roomId)
  }
  openEditWrap(roomId: number) {
    this.AddVisible = false
    this.Editvisible = true
    this.approveModel = false
    this.roomService.getRoom(roomId).subscribe({
      next: (room: Room) => {
        this.RoomToEdit = room;
        if (this.RoomToEdit.premiumRoom == true && this.RoomToEdit.goldRoom == false) {
          this.premiumcheckedValue = true;
          this.goldchekedValue = false
          this.basicCheckedValue = false
        }
        else if (this.RoomToEdit.goldRoom == true && this.RoomToEdit.premiumRoom == false) {
          this.goldchekedValue = true;
          this.premiumcheckedValue = false;
          this.basicCheckedValue = false;
        }
        else if (this.RoomToEdit.goldRoom == false && this.RoomToEdit.premiumRoom == false) {
          this.basicCheckedValue = true;
          this.goldchekedValue = false
          this.premiumcheckedValue = false
        }
      }
    })

  }
  editRoom() {
    this.RoomToEdit.user = this.user;
    this.roomService.updateRoom(this.RoomToEdit).subscribe({
      next: () => {
        this.immoServ.getImmobiliereByName(this.immobilierename).subscribe({
          next: (immobilier: immobilier) => {
            this.roomService.AssignImmobiliereToRoom(parseInt(this.user.id),immobilier.id,this.RoomToEdit.id).subscribe({
              next:()=>this.immobilierename=""
            })
          }
        })
        this.getAllRooms()
        this.Editvisible = false
      }
    })
  }
  editDisapprovedRoom() {
    this.listDisapprovedRooms.forEach(room => {
      this.roomService.updateRoom(room).subscribe({
        next: () => {
          this.getAllRooms()
        }
      })
    })
  }
  hide() {
    this.Editvisible = false
  }
  openAddRoomWrap() {
    this.Editvisible = false
    this.AddVisible = true
    this.approveModel = false
  }
  AddRoom() {
    console.log(this.immobilierename)

    this.roomService.addRoom(this.RoomToAdd, this.user.id).subscribe({
      next: (RoomAddded:any) => {
        this.getAllRooms()
        this.AddVisible = false
        this.RoomToAdd.minAmount = 0
        this.RoomToAdd.timeRoom = 0
        this.approveModel = true;
      }
    })
  }
  onItemChange(value) {
    console.log(" Value is : ", value);
    if (value == "BasicRoom") {
      this.RoomToAdd.premiumRoom = false;
      this.RoomToAdd.goldRoom = false
    }
    else if (value == "goldRoom") {
      this.RoomToAdd.premiumRoom = false;
      this.RoomToAdd.goldRoom = true;
    }
    else if (value == "premiumRoom") {
      this.RoomToAdd.premiumRoom = true;
      this.RoomToAdd.goldRoom = false
    }

  }
  onItemUpdateChange(value) {
    console.log(" Value is : ", value);
    if (value == "BasicRoom") {
      this.RoomToEdit.premiumRoom = false;
      this.RoomToEdit.goldRoom = false
    }
    else if (value == "goldRoom") {
      this.RoomToEdit.premiumRoom = false;
      this.RoomToEdit.goldRoom = true;
    }
    else if (value == "premiumRoom") {
      this.RoomToEdit.premiumRoom = true;
      this.RoomToEdit.goldRoom = false
    }

  }
  checkapprove(value) {
    console.log(value)
    // console.log(this.RoomToEdit.approvedRoom)
  }

}
