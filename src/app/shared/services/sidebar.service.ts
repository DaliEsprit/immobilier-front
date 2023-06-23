import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  private toggle = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }
  toggleSidebar(){
    this.toggle.next(!this.toggle.value);
  }

  get isOpened(){
    return this.toggle.value
  }
  set isOpened(status:boolean){
    this.toggle.next(status)
  }

  getAllCategoryAndSub( ): Observable<any> {
   
      return this.http
        .get(`http://localhost:3000/category`)
        .pipe(tap((_) => console.log(`Searching for: category`)));
     
  }
}
