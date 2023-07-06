import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form:FormGroup
  loginError=false
  constructor(private alert:SweatAlertService,private userService:UserService,private fb:FormBuilder,private authService:AuthService,private router:Router){
  this.form=fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
  }
  ngOnInit(): void {
    this.form.valueChanges.subscribe(res=>{
      this.loginError=false
    })
  }

  login(){
    this.authService.loginUser(this.form.value).subscribe({
      next:user=>{ 
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
      else
        alert("user is invalid")
    },
  error:err=>{
    this.loginError=true
  }})
  }
}
