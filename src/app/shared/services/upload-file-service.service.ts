import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8089/api/up';
	
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  
  formData.append('file', file);
   
  const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
  }

  getFiles(file: string ): Observable<any> {
    console.log(file)
    
  return this.http.get<any>(`${this.baseUrl}/files/`+file, { responseType: 'blob' as 'json' });
  }

}