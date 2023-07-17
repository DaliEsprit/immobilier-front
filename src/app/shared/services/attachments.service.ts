import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Attachements } from '../models/Attachments.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachementsService {
  private apiServerUrl = environment.baseUri;

  constructor(private http:HttpClient) { }
  getAttachement(idImmobilier:any):any{
    return this.http.get<Attachements[]>(`${this.apiServerUrl}attachement/retrieve-all-attachements/`+idImmobilier);
  }
  
}
