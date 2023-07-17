import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Attachements } from '../models/Attachments.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachementService {
  private apiServerUrl = environment.baseUri;
  listAttachment:Attachements[]=[];
  
  constructor(private http:HttpClient) { }
  getAttachement(idImmobilier:any):any{
    return this.http.get<Attachements[]>(`${this.apiServerUrl}attachement/retrieve-all-attachments`+idImmobilier);
  }

  addAttachement(attachement:Attachements):any{
    return this.http.post<Attachements>(`${this.apiServerUrl}attachement/add-attachement`,attachement);
  }
  assignttachement(idAttachement:any, idImmobilier:any):any{
    
    return this.http.put<Attachements>(`${this.apiServerUrl}attachement/assign-attachement/`+ idAttachement+'/'+idImmobilier, null)
}}
