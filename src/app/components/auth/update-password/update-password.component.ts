import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit{
tokenValid=false
isLoading=true
token:string
form:FormGroup=new FormGroup({
  password:new FormControl("",Validators.required),
  confirmPassword:new FormControl("",[Validators.required, this.passwordMatchValidator()]),
  
})
  constructor(private alert:SweatAlertService ,private userService:UserService, private authService:AuthService,private route:ActivatedRoute,private router:Router) {

  }
  

ngOnInit(): void {
  this.verify()
}
verify(){
  this.route.params.subscribe(params=>{
    this.token=params['token']
    this.authService.verifyPasswordToken(params['token']).then(user=>{
      this.isLoading=false
      this.tokenValid=true
    }).catch(err=>{       
     this.isLoading=false 
      this.tokenValid=false
    })
  })
   
}

updatePassword(){
  if(this.form.invalid){
    this.form.markAllAsTouched()
    return
  }
  this.authService.updatePwd(this.token,this.form.get("password").value).subscribe({
    next:res=>{
    this.alert.show("success","Password updated successfully!")
    this.router.navigateByUrl("")
  },
error:err=>{
  this.alert.show("error","Cannot update password")
}})
}

passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const confirmPassword = this.form?.get('password')?.value;
console.log(this.form?.get('password'));

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
}
