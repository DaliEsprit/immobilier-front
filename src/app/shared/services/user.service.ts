import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected readonly BASE_URI=environment.baseUri+"user"
  
  constructor(private http: HttpClient) { }
  getCurrent() {
    const url = `${this.BASE_URI}/current`;
    return this.http.get(url);
  }

  save(user:any){
    return this.http.post(this.BASE_URI,user)
  }
}
