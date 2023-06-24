import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./core/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: "room",
    component: RoomComponent
  },{
    path:"register",
    component:RegisterComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
