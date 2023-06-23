import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GuardDirective } from '../utils/guard.directive';
import { ProductCardComponent } from './components/product-card/product-card.component';  

@NgModule({
  declarations: [  
    GuardDirective,
    ProductCardComponent
  ],
  imports: [   
    RouterModule
  ], exports:[
    GuardDirective,
    ProductCardComponent
  ]
})
export class SharedModule { }
