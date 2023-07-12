import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit{

  constructor(private alert:SweatAlertService ,private userService:UserService, private authService:AuthService,private route:ActivatedRoute,private router:Router) {

  }
  

ngOnInit(): void {
  this.verify()
}
verify(){
  this.route.params.subscribe(params=>{
    this.authService.verifyUser(params['token']).then(user=>{
      this.authService.loggedIn=true
      this.alert.show("success","login success")
      
    if(user["accessToken"]!=null){
    localStorage.setItem("token",user["accessToken"]);
    Promise.resolve()
    this.userService.getCurrent().subscribe((next:any)=>{
      localStorage.setItem("user",JSON.stringify(next) );
    })
    localStorage.setItem("useremail",user["email"]);
    this.router.navigateByUrl("");
    }
    }).catch(err=>{        
      this.router.navigateByUrl("/error/404")
    })
  })
   
}
}
