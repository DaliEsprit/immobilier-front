import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Attachements } from 'src/app/shared/models/Attachments.model';
import { immobilier } from 'src/app/shared/models/Immobiliers.model';
import { AttachementService } from 'src/app/shared/services/attachement.service';
import { AttachementsService } from 'src/app/shared/services/attachments.service';
import { ImmobilierService } from 'src/app/shared/services/immobilier.service';
import { UserService } from 'src/app/shared/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFileService } from 'src/app/shared/services/upload-file-service.service';

@Component({
  selector: 'app-immobiliere',
  templateUrl: './immobiliere.component.html',
  styleUrls: ['./immobiliere.component.scss']
})
export class ImmobiliereComponent implements OnInit {
listImmobliere:immobilier[]=[];
listAttachment:Attachements[]=[];
constructor(private sanitizer: DomSanitizer, private uploadfileService: UploadFileService,  private auth:AuthService,private router:Router, private immobilierService:ImmobilierService, private attachmentService:AttachementService, private userServ: UserService){}

validateUser(){
  if(this.auth.getToken()!=null)
  return true
  else{
    this.router.navigateByUrl("/login");
  return false
  };
}
navToImmobiliereDetails(idImmobilier:number){
  console.log(idImmobilier)
  this.listImmobliere.filter(im=>{
    if(im.id==idImmobilier)
    im.nbClick=im.nbClick+1;
  })
  
  return this.router.navigateByUrl("/immobiliereDetails/"+idImmobilier)
}

// google maps zoom level
zoom: number = 8;

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

}


navToRoom() {
  this.userServ.getCurrent().subscribe({
    next: (data: any) => {
            console.log(data)
        
          
            this.router.navigateByUrl("/immobilier")
          
        }
      })
    
}

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
 
}
