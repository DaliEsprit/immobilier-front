
  import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from 'src/app/core/auth/auth.service';
  import { UserService } from 'src/app/shared/services/user.service';
  import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';
  import Swal from 'sweetalert2';
  
  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit{
    form:FormGroup
    loginError=false
    role: string = "ROLE_BUYER";
    constructor( private socialAuthService: SocialAuthService,private alert:SweatAlertService,private userService:UserService,private fb:FormBuilder,private authService:AuthService,private router:Router){
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
    facebookLogin(){
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    googleLogin(){
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
    }

  
  checkRole() {
    this.userService.getCurrent().subscribe({next: (data:any)=> {if(this.role == data.role)
      
    return this.router.navigateByUrl("/immobiliereGestion") 

  else return this.router.navigateByUrl("/immobiliere")    }})
  }
    login(){  
      this.authService.loginUser(this.form.value).subscribe({
        next:user=>{ 
          this.getUserLocation()
          this.authService.loggedIn=true
          this.alert.show("success","login success")
          localStorage.setItem("token",user["accessToken"]);
          Promise.resolve()
          localStorage.setItem("user",JSON.stringify(user) );
          localStorage.setItem("useremail",user["email"]);
          this.router.navigateByUrl("");
          this.authService.isGuest=true
      this.router.navigateByUrl("/immobiliere")
      },
    error:err=>{
      this.loginError=true
    }})
    }
    getUserLocation(): void {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
    console.log(longitude,latitude);
    
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
    forgetPassword(){
      Swal.fire({
        title:'Forget Password?',
        text:'saisir votre mail pour la réintialier',
        input:'email',
        confirmButtonText:'envoyer'
      }).then((result) => { 
        if (result.isConfirmed) { 
          this.authService.sendUpdatePwdEmail(result.value).subscribe(res=>{
            this.alert.show("success","reset password mail sent successfully")
          })
        } 
      })
    }
  }