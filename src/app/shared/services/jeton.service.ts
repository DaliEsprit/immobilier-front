import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Jeton } from '../models/Jeton.model';
import { Observable, Subscription, catchError, lastValueFrom, map ,tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JetonService {
  jeton: Jeton = new Jeton();
  private subscription: Subscription;
  protected readonly BASE_URI = environment.baseUri + "jeton/"
  constructor(private http: HttpClient) { }
  addJeton(jeton: Jeton) {
    return this.http.post(this.BASE_URI + "add-jeton", jeton);
  }
  updateJeton(jeton: Jeton,idUser:number,idRoom:number) {
    return this.http.put(this.BASE_URI + "modify-jeton/"+idUser+"/"+idRoom, jeton);
  }
  getJeton() {
    return this.http.get(this.BASE_URI + "retrive-all-jeton");
  }
  deleteJeton(idJet: number) {
    return this.http.delete(this.BASE_URI + "remove-jeton/" + idJet);
  }
  getJetonByUser(idUser: number) {
    return this.http.get<Jeton>(this.BASE_URI + "getJetonByUser/" + idUser);
  }
  updateJetonBidValue(idJeton:number,amount:any){
    return this.http.put(this.BASE_URI+"update-jeton-bid-value/"+idJeton+"/"+amount,null)
  }

}
