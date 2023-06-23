import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  protected readonly BASE_URI=environment.baseUri+"articles/sales"
  
  constructor(private http: HttpClient) { }
  getAll(pageIndex:number) { 
    return this.http.get(`${this.BASE_URI}?pageIndex=${pageIndex}`);
  }
}
