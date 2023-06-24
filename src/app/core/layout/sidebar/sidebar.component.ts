import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { ThemeService } from 'src/app/shared/services/teme.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
@Input() sidebarVisible:boolean=false
constructor(public sideBarService:SidebarService,public themeService:ThemeService){
    
}
ngOnInit() {
   
}
}
