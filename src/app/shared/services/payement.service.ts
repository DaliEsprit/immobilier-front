import { Injectable } from '@angular/core';
import { Payement } from '../models/Payement.model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayementService {
  listPayements:Payement[]=[];
  protected readonly BASE_URI=environment.baseUri+"payement/"
  constructor(private http:HttpClient) { 
  }

  getPayement(){
    return this.http.get<Payement[]>(this.BASE_URI+"retrieve-all-payement");
   }
   addPayement(payement:Payement){
    return this.http.post(this.BASE_URI+"add-payement",payement);
  }
  
}
