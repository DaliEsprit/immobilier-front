import { Component, ViewChild } from '@angular/core';
// import { initializeGoogleSignIn } from './utils/google.initializer';
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class:
      'block h-full bg-zinc-50 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900',
  },
})
export class AppComponent {

  constructor() { 
    // initializeGoogleSignIn() 
  }
  
  
}
