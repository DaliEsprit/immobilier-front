import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

form:FormGroup

constructor(private fb:FormBuilder,private userService:UserService,private router:Router){
this.form=fb.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  age:['',Validators.required],
  password:['',Validators.required],
  confirmPassword:['',Validators.required],
  phoneNumber:['',Validators.required],
  role:['',Validators.required],
  cin:['',Validators.required],
  address:''
})
}

ngOnInit(): void {
  this.form.valueChanges.subscribe(res=>{
   console.log( this.form);
   
  })
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
  this.userService.save(user).subscribe(user=>{
    console.log(user);
    this.router.navigateByUrl("/login")
  })
}
}
