import { Directive, Input, ElementRef, OnInit, TemplateRef, ViewContainerRef, Renderer2, ChangeDetectorRef } from '@angular/core'; 
import { AuthService } from '../core/auth/auth.service';

@Directive({
  selector: '[showIfLogged]'
}) 
  export class GuardDirective implements OnInit {
    @Input() showIfLogged!: boolean;
    constructor(
      private authService: AuthService, 
      private templateRef: TemplateRef<any>,
      private viewContainerRef: ViewContainerRef,
      private cdr:ChangeDetectorRef
    ) {}
  
    ngOnInit() {
     this.authService.loggedIn.subscribe(status=>{   
        if ((status && this.showIfLogged) || (!status && !this.showIfLogged) ) {
          this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainerRef.clear();
          }
          this.cdr.detectChanges()
      });
     
    }
  }