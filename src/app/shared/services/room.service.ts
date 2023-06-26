import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Room } from '../models/Room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
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
}
