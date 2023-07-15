import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, from, lastValueFrom, map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/shared/models/user.model';  
  
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly BASE_URI = environment.baseUri
    isLoggedIn=false
    private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem("token"));
    private _isGuest: BehaviorSubject<boolean> = new BehaviorSubject<boolean>((JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user"))?.role=="ROLE_GUEST"));

    get isGuest():Observable<boolean> {
      return this._isGuest.asObservable();
    }
   
    set isGuest(val:any) {
         this._isGuest.next((JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user"))?.role=="ROLE_GUEST"));
      }

      get loggedIn() {
        return this._loggedIn.asObservable();
      }
     
      set loggedIn(val:any) {
           this._loggedIn.next(val);
        }
    constructor( private http: HttpClient, private httpBackend: HttpBackend) {
       
         
     }

     loginUser(user:any){
        return this.http.post(`${this.BASE_URI}auth/signIn`, user);
     }
     socialLogin(user:any){
        return this.http.post(`${this.BASE_URI}auth/social-login`, user);
     }
    logout(): Observable<any> {
        return this.http.post(`${this.BASE_URI}logout`, {});
    } 

    getToken(){
        return localStorage.getItem('token')
    }
    
    userInfo(){
        return this.http.get(`${this.BASE_URI}auth/me`);
    }
    verifyUser(token:string){
        return lastValueFrom(this.httpBackend
            .handle(new HttpRequest('GET',`${this.BASE_URI}auth/verify-email/${token}`)).pipe(map((res: any) => {
              return res.body;
            }))); 
    }
    sendUpdatePwdEmail(email:string){
       return this.http.get(`${this.BASE_URI}auth/send-update-pwd/${email}`)
    }
    verifyPasswordToken(token:string){
        return lastValueFrom(this.httpBackend
            .handle(new HttpRequest('GET',`${this.BASE_URI}auth/verify-password-token/${token}`)).pipe(map((res: any) => {
              return res.body;
            }))); 
     }

     updatePwd(token:string,pwd:string){
        return this.http.get(`${this.BASE_URI}auth/update-password?token=${token}&&password=${pwd}`)
     }
}