import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  sidebarVisible:boolean=false
  routerLink:string="/"
  showGUestAlert=false
  constructor(private cdr:ChangeDetectorRef,public sidebarService:SidebarService,public router:Router,public authService:AuthService){
    
  }
  ngOnInit(): void {
    this.authService.isGuest.subscribe(res=>{
      this.showGUestAlert=res
this.cdr.detectChanges()  
  })
  }
  validateHomeRoute(){
    if (this.router.url=="/")
    return true ;
    else
    return false;
  }
}
