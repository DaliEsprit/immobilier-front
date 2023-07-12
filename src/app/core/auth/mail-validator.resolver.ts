import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot 
} from '@angular/router'; 
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaxpayerResolver implements Resolve<any> {
  constructor(private router:Router,private authService: AuthService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {     
    let data:any
       await this.authService.verifyUser(route.params['token']).then(res=>{
        data=res
      }).catch(err=>{        
        this.router.navigateByUrl("/error/404")
      })
    return data
  }
} 