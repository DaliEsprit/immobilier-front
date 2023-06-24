import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Attachements } from '../models/Attachments.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachementService {
  protected readonly BASE_URI=environment.baseUri+"attachement/"
  listAttachment:Attachements[]=[];
  constructor(private http:HttpClient) { }
  getAttachement(){
    return this.http.get<Attachements[]>(this.BASE_URI+"retrieve-all-attachment");
  }
  addAttachement( attachement:Attachements){
    return this.http.post(this.BASE_URI+"add-attachement",attachement);
  }
  modifyAttachment(attachement:Attachements){
    return this.http.put(this.BASE_URI+"modify-attachement",attachement);
  }
  deleteAttachment(idAtt:number){
    return this.http.delete(this.BASE_URI+"remove-attachment/"+idAtt);
  }
  

}
