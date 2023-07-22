import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  //protected readonly BASE_URI=environment.baseUri+"position/"
  private apiServerUrl = environment.baseUri;
  constructor(private http:HttpClient) { 


  }

  public getPositionbyId(id: number):any{
    return this.http.get<any>(`${this.apiServerUrl}position/retrieve-position/`+id);
  }
  public removePosition(idMob:number): any{
    return this.http.delete<any>(`${this.apiServerUrl}immobilier/remove-immobilier/`+idMob);
   }
}
