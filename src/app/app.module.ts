import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticlesModule } from './components/articles/articles.module';
 import { TokenInterceptor } from './core/interceptors/auth.interceptor'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayementComponent } from './components/payement/payement.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { MatTabsModule } from '@angular/material/tabs';
import * as CanvasJSAngularChart from '../charts/canvasjs.angular.compoenet';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


 @NgModule({
  declarations: [
    AppComponent,
    PayementComponent,
     CanvasJSChart
                            
  ],
  imports: [ 
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ArticlesModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
         
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider:new GoogleLoginProvider(	
              '741902923698-u9oc37rumrk7cj8fl81em73a3hbr9umo.apps.googleusercontent.com'
            ),
            
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider:new FacebookLoginProvider(	
              '3148146335481364'
            ),
            
          }
        ]
      } as SocialAuthServiceConfig,
    },
     {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
