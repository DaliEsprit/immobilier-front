import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  protected readonly BASE_URI=environment.baseUri+"position/"

  constructor(private http:HttpClient) { }
}
