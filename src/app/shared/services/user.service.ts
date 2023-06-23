import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected readonly BASE_URI=environment.baseUri+"users"
  
  constructor(private http: HttpClient) { }
  getUserByToken() {
    const url = `${this.BASE_URI}?token=${localStorage.getItem("token")}`;
    return this.http.get(url);
  }
}
