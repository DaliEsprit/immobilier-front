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
   addPayement(payement:Payement,paymentStatus:string){
    return this.http.post(this.BASE_URI+"add-payement/"+paymentStatus,payement);
  }
  getPaymentbyId(pid:number){
    return this.http.get(this.BASE_URI+"retrieve-pay-by-id/"+pid)
  }

  updatePayement(pay:Payement,id:number){
    return this.http.put(this.BASE_URI+"update-payement/"+pay,id);
  }
  
}
