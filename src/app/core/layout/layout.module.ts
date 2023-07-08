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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RoomComponent } from 'src/app/room/room.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { UserDetailsComponent } from 'src/app/components/user-details/user-details.component';
import { ImmobiliereComponent } from 'src/app/components/immobiliere/immobiliere.component';
import { ImmobiliereDetailsComponent } from 'src/app/components/immobiliere-details/immobiliere-details.component';
import { DialogModule } from 'primeng/dialog';
import { RoomsComponent } from 'src/app/rooms/rooms.component';
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
    RegisterComponent,
    LoginComponent,
    UserDetailsComponent,
    ImmobiliereComponent,
    ImmobiliereDetailsComponent,
    RoomsComponent
  ],
  imports: [
    ReactiveFormsModule,
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
    DialogModule,
  RouterModule.forChild(routes),
  ]
})
export class LayoutModule { }
