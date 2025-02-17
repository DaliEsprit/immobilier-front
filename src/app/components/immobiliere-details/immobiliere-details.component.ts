import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Attachements } from 'src/app/shared/models/Attachments.model';
import { immobilier } from 'src/app/shared/models/Immobiliers.model';
import { AttachementsService } from 'src/app/shared/services/attachments.service';
import { ImmobilierService } from 'src/app/shared/services/immobilier.service';
import { UploadFileService } from 'src/app/shared/services/upload-file-service.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-immobiliere-details',
  templateUrl: './immobiliere-details.component.html',
  styleUrls: ['./immobiliere-details.component.scss']
})
export class ImmobiliereDetailsComponent implements OnInit {
  
Immobliere:immobilier;
selectedAttachment:any[]=[]
selectedImage:string= '';
selectedPath:string='';
userId: string;
constructor(private userServ: UserService,private sanitizer: DomSanitizer,private uploadfileService: UploadFileService, private attachmentService:AttachementsService,private auth:AuthService,private router:Router,private route:ActivatedRoute, private immobilierService:ImmobilierService){}
setMainAttachemnt(changingThisBreaksApplicationSecurity: String ){
  this.selectedAttachment = this.Immobliere.images.filter(d=>d.changingThisBreaksApplicationSecurity == changingThisBreaksApplicationSecurity); 
  console.log(this.selectedAttachment)
  this.selectedImage= this.selectedAttachment[0].changingThisBreaksApplicationSecurity

  
}
getUserID(){
this.userServ.getCurrent().subscribe({
  next: (data: any) => {
   console.log(data.id)
    this.userId = data.id + ': ' + data.lastName
  }})
  }
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
id:number=0;
ngOnInit(): void {
  console.log(this.route)
  this.id = this.route.snapshot.params['id'];
  this.getImmobilierbyId(this.id)
this.getUserID()
}

public getImmobilierbyId(id: number):void{
  let cout: number =0;
  this.immobilierService.getImmobilierbyId(this.id).subscribe(
   (response: immobilier) =>{
    this.Immobliere = response;
   
  this.attachmentService.getAttachement(id).subscribe(
    (response: Attachements[]) =>{response.forEach(sm=>{
      this.Immobliere.attachement = response
      
    
    this.uploadfileService.getFiles(sm.name).subscribe(

    (response: any) =>{ 
     console.log(response);
     
     let objectURL = URL.createObjectURL(response);

     if (cout == 0) {
     this.Immobliere["images"] = [this.sanitizer.bypassSecurityTrustUrl(objectURL)];
    cout= 1;
    
    }else{
     this.Immobliere["images"].push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
     }
}
   , 
 (error:HttpErrorResponse) =>{alert(error.message)}
 );
    })}
   , 
   
   );}
  , 
  (error:HttpErrorResponse) =>{alert(error.message)}
  );
 
 }


}
