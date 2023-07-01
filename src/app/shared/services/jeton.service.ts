import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Jeton } from '../models/Jeton.model';

@Injectable({
  providedIn: 'root'
})
export class JetonService {
  jeton:Jeton={idJeton:1,value:"dgsgsdgsdg",idUser:3};
  protected readonly BASE_URI=environment.baseUri+"jeton/"
  constructor(private http:HttpClient) { }
  addJeton(jeton:Jeton){
    return this.http.post(this.BASE_URI+"add-jeton",jeton);
  }
  updateJeton(jeton:Jeton){
    return this.http.put(this.BASE_URI+"modify-jeton",jeton);
  }
  getJeton(){
    return this.http.get(this.BASE_URI+"retrive-all-jeton");
  }
  deleteJeton(idJet:number){
    return this.http.delete(this.BASE_URI+"remove-jeton/"+idJet);
  }


}
