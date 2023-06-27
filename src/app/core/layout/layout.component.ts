import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarVisible:boolean=false
  routerLink:string="/"
  constructor(public sidebarService:SidebarService,public router:Router){
    
  }
  validateHomeRoute(){
    if (this.router.url=="/")
    return true ;
    else
    return false;
  }
}
