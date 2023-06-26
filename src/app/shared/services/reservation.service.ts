import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Reservation } from '../models/Reservation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  protected readonly BASE_URI=environment.baseUri+"reservation/";
  listReservations:Reservation[]=[];
  constructor(private http:HttpClient) { }
  addReservation(reservation:Reservation){
    return this.http.post(this.BASE_URI+"add-reservation",reservation);
  }
  modifyReservation(reservation:Reservation){
    return this.http.put(this.BASE_URI+"modify-reservation",reservation);
  }
  getReservations(){
    return this.http.get<Reservation[]>(this.BASE_URI+"retrieve-all-reservations");
  }
  deleteReservarion(idRes:number){
    return this.http.delete(this.BASE_URI+"remove-reservation/"+idRes);
  }
}
