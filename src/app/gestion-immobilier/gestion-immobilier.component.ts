import { Component } from '@angular/core';
import { immobilier } from '../shared/models/Immobiliers.model';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { ImmobilierService } from '../shared/services/immobilier.service';
import { UserService } from '../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Attachements } from '../shared/models/Attachments.model';
import { AttachementsService } from '../shared/services/attachments.service';
import { UploadFileService } from '../shared/services/upload-file-service.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gestion-immobilier',
  templateUrl: './gestion-immobilier.component.html',
  styleUrls: ['./gestion-immobilier.component.scss']
})
export class GestionImmobilierComponent {
  listImmobliere:immobilier[]=[];
listAttachment:Attachements[]=[];

  constructor( private sanitizer: DomSanitizer,private auth:AuthService,private router:Router, private uploadfileService: UploadFileService, private attachmentService:AttachementsService, private immobilierService:ImmobilierService, private userServ: UserService){}
  
  validateUser(){
    if(this.auth.getToken()!=null)
    return true
    else{
      this.router.navigateByUrl("/login");
    return false
    };
  }
 
  // google maps zoom level
  zoom: number = 8;
  image:  Array<any> =[];
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  markers = [
      {
          lat: 51.673858,
          lng: 7.815982,
          label: "A",
          draggable: true
      },
      
  ]
  ngOnInit(): void {
   
    this.getImmobilier();
   
    //this.navToRoom();
 
    //this.navToRoom();
  
    
  }
 

  public deleteImmobilier(idImmobilier:number):void{
    this.immobilierService.removeImmobiliere(idImmobilier).subscribe(
     (response: immobilier[]) =>{this.listImmobliere = response;
      this.getImmobilier()}
    , 
    (error:HttpErrorResponse) =>{alert(error.message)}
    );
   }

  public  updateImmobiliere(Immobilier: immobilier):void{
    this.immobilierService.updateImmobiliere(Immobilier).subscribe(
     (response: immobilier[]) =>{this.listImmobliere = response;}
    , 
    (error:HttpErrorResponse) =>{alert(error.message)}
    );
   }
  public addImmobilier(){
    this.router.navigateByUrl("/formImmobilier")  
  }
  navToImmobiliereDetails(idImmobilier:number){
    this.listImmobliere.filter(im=>{
      if(im.id==idImmobilier)
      im.nbClick=im.nbClick+1;
    })
    
    return this.router.navigateByUrl("/immobiliereDetails/"+idImmobilier)
  }
  
  // google maps zoom level
  

  
  public getImmobilier():void{
   this.immobilierService.getImmobilier().subscribe(
    (response: immobilier[]) =>{this.listImmobliere = response;
      {this.listImmobliere.forEach(im=>{
   
   
    this.attachmentService.getAttachement(im.id).subscribe(
     (response: Attachements[]) =>{response.forEach(sm=>{
      im.attachement = response
     
     console.log(response)
     console.log(sm)
     console.log(im.attachement[0].path)
     console.log(sm.name)
     this.uploadfileService.getFiles(sm.name).subscribe(

     (response: any) =>{ 
      console.log(response);
    
      let objectURL = URL.createObjectURL(response);
      im["images"] = [this.sanitizer.bypassSecurityTrustUrl(objectURL)];
 }
    , 
  (error:HttpErrorResponse) =>{alert(error.message)}
  );
     })}
    , 
    
    );
    
   }
   , 
   (error:HttpErrorResponse) =>{alert(error.message)}
   );
  }})}
  
  
  
  navToRoom() {
    this.userServ.getCurrent().subscribe({
      next: (data: any) => {
              console.log(data)
          
            
              this.router.navigateByUrl("/immobilier")
            
          }
        })
      
  
  
  }
}
