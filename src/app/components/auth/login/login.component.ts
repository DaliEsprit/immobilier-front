import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form:FormGroup

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){
  this.form=fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  }

  login(){
    this.authService.loginUser(this.form.value).subscribe(user=>{
      if(user["accessToken"]!=null){
      localStorage.setItem("token",user["accessToken"]);
      localStorage.setItem("useremail",user["email"]);
      this.router.navigateByUrl("");
      console.log(user)
      }
      else
        alert("user is invalid")
    })
  }
}
