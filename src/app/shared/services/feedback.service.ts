import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { feedback } from '../models/Feedback';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  listFeedback:feedback[]=[];
  protected readonly BASE_URI=environment.baseUri+"feedback/"
  constructor(private http:HttpClient) { 
  }
  getFeedback(){
   return this.http.get<feedback[]>(this.BASE_URI+"retrieve-all-feedback");
  }
  addFeedback(feedback:any){
    return this.http.post(this.BASE_URI+"add-feedback",feedback);
  }
  removeFeedback(idF:number){
    return this.http.delete(this.BASE_URI+"remove-feedback/"+idF);
  }
  updateFeedback(feedback:feedback){
    return this.http.put(this.BASE_URI+"modify-feedback",feedback);
  }
  addbyuser(f:any, id: number): Observable<feedback> {
    const url = `${this.BASE_URI}/${id}`;

    return this.http.post<feedback>(url, f, this.httpOptions);
  } 
}
