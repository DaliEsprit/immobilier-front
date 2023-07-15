import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
user:any
form:FormGroup
registerError=false
showGUestAlert=false
constructor(private authService:AuthService,private alert:SweatAlertService,private fb:FormBuilder,private userService:UserService,private router:Router){
  this.form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
    role: ['', Validators.required],
    cin: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
    address: '',
    password: ['', ], 
  });
}
getControls(){
  return Object.keys(this.form.controls)
}
ngOnInit(): void {
 this.user = JSON.parse(localStorage.getItem("user"))
 Object.keys(this.user).forEach(att=>{
  if(att!="password")
  this.form.get(att)?.setValue(this.user[att])
 })

 
 this.form.get("email").disable()
 if(this.user.role=="ROLE_GUEST"){
  this.form.get("password").setValidators(Validators.required)
 }
  this.form.valueChanges.subscribe(res=>{
   console.log( this.form);
   
  })
}
passwordMatchValidator(form: FormGroup) {
  const password = form.get('password').value;
  const confirmPassword = form.get('confirmPassword').value;

  if (password !== confirmPassword) {
    form.get('confirmPassword').setErrors({ passwordMismatch: true });
  } else {
    form.get('confirmPassword').setErrors(null);
  }
}
getAge(date) { 
  let diff = Date.now() - date.getTime();
  let age = new Date(diff); 
  return Math.abs(age.getUTCFullYear() - 1970);
}
save(){
  console.log(this.form);
  
  if(this.form.invalid){
    this.form.markAllAsTouched()
    return
  }
  let user = this.form.value
  user.age=this.getAge(new Date(user.age))
  user.email=this.user.email
  user.id=this.user.id
  user.socialId=this.user.socialId
  delete user.confirmPassword
  this.userService.update(user).subscribe({
    next:user=>{
   localStorage.setItem("user",JSON.stringify(user))
   this.authService.isGuest=false
   this.router.navigateByUrl("")
  },
error:err=>{
  this.alert.show("error",err.error.message)
  this.registerError=true
}})
}

getErrorMessage(control: AbstractControl): string {
  if (control.hasError('required')) {
    return 'This field is required.';
  }
  console.log(control.errors);
  if (control?.hasError('email')) {
    return 'Invalid email format.';
  }
  if (control.hasError('passwordMismatch')) {
    return 'Password and confirm password do not match.';
  }

  return '';
}
}

