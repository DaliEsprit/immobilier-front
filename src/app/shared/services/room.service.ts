import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Room } from '../models/Room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  Room:Room=new Room();
  listRooms:Room=new Room();
  protected readonly BASE_URI=environment.baseUri+"room/";

  constructor(private http:HttpClient) { }
  addRoom(room:Room){
    return this.http.post(this.BASE_URI+"add-room",room);
  }
  updateRoom(room:Room){
    return this.http.put(this.BASE_URI+"modify-room",room);
  }
  getallroom(){
    return this.http.get(this.BASE_URI+"retrieve-all-room");
  }
  deleteRoom(roomId:number){
    return this.http.delete(this.BASE_URI+"remove-room/"+roomId)
  }
  getUsersbyRoom(roomId:number){
    return this.http.get(this.BASE_URI+"retrieve-users-by-room/"+roomId)
  }
  AssignUserToRoom(roomId:number,userId:number){
    return this.http.put(this.BASE_URI+"assign-user-to-room/"+roomId+"/"+userId,null);
  }
  AssignImmobiliereToRoom(userId:number,immobiliereId:number,roomId:number){
    return this.http.put(this.BASE_URI+"assign-immobiliere-to-room/"+userId+"/"+immobiliereId+"/"+roomId,null)
  }
  getImmobiliereByRoom(idRoom:number){
    return this.http.get(this.BASE_URI+"get-immobilier-by-room/"+idRoom);
  }
  getRoom(idRoom:number){
    return this.http.get(this.BASE_URI+ "retrieve-room-by-id/"+idRoom)
  }
  ExitRoom(idUser:string){
    return this.http.put(this.BASE_URI+"exit-room/"+idUser,null)
  }
}
