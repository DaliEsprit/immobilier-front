import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

form:FormGroup
registerError=false
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
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, { validator: this.passwordMatchValidator });
}
getControls(){
  return Object.keys(this.form.controls)
}
ngOnInit(): void {
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
  let user = this.form.value
  user.age=this.getAge(new Date(user.age))
  delete user.confirmPassword
  this.userService.save(user).subscribe({
    next:user=>{
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
