import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./core/layout/layout.module').then(m => m.LayoutModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
