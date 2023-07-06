import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

form:FormGroup
registerError=false
constructor(private fb:FormBuilder,private userService:UserService,private router:Router){
this.form=fb.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  age:['',Validators.required],
  
  phoneNumber:['',Validators.required],
  role:['',Validators.required],
  cin:['',Validators.required],
  address:'',
  password:['',Validators.required],
  confirmPassword:['',Validators.required],
},
{ validator: this.passwordMatchValidator })
}
getControls(){
  return Object.keys(this.form.controls)
}
ngOnInit(): void {
  this.form.valueChanges.subscribe(res=>{
   console.log( this.form);
   
  })
}
passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
};
getAge(date) { 
  let diff = Date.now() - date.getTime();
  let age = new Date(diff); 
  return Math.abs(age.getUTCFullYear() - 1970);
}
save(){
  let user = this.form.value
  user.age=this.getAge(new Date(user.age))
  delete user.confirmPassword
  this.userService.save(user).subscribe({
    next:user=>{
    console.log(user);
    this.router.navigateByUrl("/login")
  },
error:err=>{
  this.registerError=true
}})
}

getErrorMessage(control: AbstractControl): string {
  if (control.hasError('required')) {
    return 'This field is required.';
  }
  console.log(control.errors);
  
  if (control.hasError('passwordMismatch')) {
    return 'Password and confirm password do not match.';
  }

  return '';
}
}
