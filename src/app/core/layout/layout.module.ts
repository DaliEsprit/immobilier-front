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
import { VerifyMailComponent } from 'src/app/components/auth/verify-mail/verify-mail.component';
import { UpdatePasswordComponent } from 'src/app/components/auth/update-password/update-password.component';
import { GoogleSigninButtonDirective, SocialLoginModule } from '@abacritt/angularx-social-login';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChatComponent } from 'src/app/chat/chat.component';
import { RoomDashboardComponent } from 'src/app/room-dashboard/room-dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { FormImmobilierComponent } from 'src/app/form-immobilier/form-immobilier.component';
import { GestionImmobilierComponent } from 'src/app/gestion-immobilier/gestion-immobilier.component';
import { ModifierImmobilierComponent } from 'src/app/modifier-immobilier/modifier-immobilier.component';

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
    RoomsComponent,
    VerifyMailComponent,
    UpdatePasswordComponent,
    ChatComponent,
    RoomDashboardComponent,
    FormImmobilierComponent,
    GestionImmobilierComponent,
    ModifierImmobilierComponent
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
    SocialLoginModule,
    PasswordModule,
    OverlayPanelModule,    
    DialogModule,
  RouterModule.forChild(routes),
  AgmCoreModule.forRoot({
    apiKey: ''
  })
  ]
})
export class LayoutModule { }
