import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { SweatAlertService } from 'src/app/utils/swalsGeniric/sweat-alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users:any[]=[]

  constructor(private userService: UserService,private alert:SweatAlertService){}


  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.userService.getAll().subscribe((res:any)=>{
      console.log(res);
      
      this.users=res
    })
  }

  disableUser(user){
    this.userService.disable(user.id).subscribe((res:any)=>{
      console.log(res);
      this.getAll()
      this.alert.show("success",`user ${user.enabled?'disabled':'enabled'} successfully`)

    })
  }
}
