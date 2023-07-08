import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/components/auth/login/login.component";
import { RegisterComponent } from "src/app/components/auth/register/register.component";
import { ImmobiliereDetailsComponent } from "src/app/components/immobiliere-details/immobiliere-details.component";
import { PayementComponent } from "src/app/components/payement/payement.component";
import { UserDetailsComponent } from "src/app/components/user-details/user-details.component";
import { RoomComponent } from "src/app/room/room.component";

const Routing: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../components/articles/articles-routing.module').then(
        (m) => m.ArticlesRoutingModule
      ),
  } ,
  {
    path: "room",
    component: RoomComponent
  },{
    path:"register",
    component:RegisterComponent
  },{
    path:"login",
    component:LoginComponent
  },{
    path:"userDetails",
    component:UserDetailsComponent
  },{
    path:"immobiliereDetails",
    component:ImmobiliereDetailsComponent
  },{
    path:"payement",
    component:PayementComponent
  }
  ];
  
  export { Routing };