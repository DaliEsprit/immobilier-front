import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { immobilier } from '../models/Immobiliers.model';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliereService {
  listImmobiliere:immobilier[]=[];
  protected readonly BASE_URI=environment.baseUri+"immobilier/"
  constructor(private http:HttpClient) { 
  }
  getImmobiliere(){
   return this.http.get<immobilier[]>(this.BASE_URI+"retrieve-all-immobilier");
  }
  addImmobiliere(immobilier:immobilier){
    return this.http.post(this.BASE_URI+"add-immobilier",immobilier);
  }
  removeImmobiliere(idMob:number){
    return this.http.delete(this.BASE_URI+"remove-immobilier/"+idMob);
  }
  updateImmobiliere(immobliere:immobilier){
    return this.http.put(this.BASE_URI+"modify-immobilier",immobliere);
  }

}
