import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Routing } from '../router/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardModule } from 'primeng/card'; 
import { SharedModule } from 'src/app/shared/shared.module'; 
import { FooterComponent } from './footer/footer.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms'; 
import { RoomComponent } from 'src/app/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];


@NgModule({
  declarations: [
    FooterComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    RoomComponent,
  ],
  imports: [
    FormsModule,
    AutoCompleteModule,
    PanelMenuModule,
    CardModule,
    CommonModule,
    RouterModule,
    ButtonModule, 
    PanelModule,
    MenubarModule,
    SidebarModule,
    SharedModule ,
  RouterModule.forChild(routes),
  ]
})
export class LayoutModule { }
