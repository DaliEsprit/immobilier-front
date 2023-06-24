import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

form:FormGroup

constructor(private fb:FormBuilder,private userService:UserService){
this.form=fb.group({
  firstName:'',
  lastName:'',
  email:'',
  age:'',
  password:'',
  confirmPassword:'',
  phoneNumber:'',
  cin:'',
  address:''
})
}

ngOnInit(): void {
}

save(){
  let user = this.form.value
  delete user.confirmPassword
  this.userService.save(user).subscribe(user=>{
    console.log(user);
    
  })
}
}
