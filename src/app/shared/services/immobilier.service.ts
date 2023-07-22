import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { immobilier } from '../models/Immobiliers.model';

@Injectable({
  providedIn: 'root'
})
export class ImmobilierService {
   private apiServerUrl = environment.baseUri;
  constructor(private http:HttpClient) { 

  }
  public getImmobilier(): any{
    return this.http.get<immobilier[]>(`${this.apiServerUrl}immobilier/retrieve-all-immobilier`);
  }
  public addImmobiliere(immobilier:immobilier, idUser:number,long,lat){
    console.log(`${lat}`)
    return this.http.post<any>(`${this.apiServerUrl}immobilier/add-immobilier/${idUser}?long=${long}&&lat=${lat}` ,immobilier);
  }
  public removeImmobiliere(idMob:number): any{
   return this.http.delete<any>(`${this.apiServerUrl}immobilier/remove-immobilier/`+idMob);
  }
  public updateImmobiliere(immobliere:immobilier, id: number): any{
    return this.http.put(`${this.apiServerUrl}immobilier/modify-immobilier/`+ id,immobliere);
  }
  public getImmobilierbyId(id: number):any{
    return this.http.get<any>(`${this.apiServerUrl}immobilier/get-by-id/`+id);
  }

}
