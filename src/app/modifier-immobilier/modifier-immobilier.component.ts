import { Component, Input, OnInit } from '@angular/core';
import { ImmobilierService } from '../shared/services/immobilier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { immobilier } from '../shared/models/Immobiliers.model';
import { Observable, Subscription, finalize } from 'rxjs';
import { UploadFileService } from '../shared/services/upload-file-service.service';
import { Attachements } from '../shared/models/Attachments.model';
import { environment } from 'src/environments/environment.development';
import { AttachementService } from '../shared/services/attachement.service';
import {Location} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-immobilier',
  templateUrl: './modifier-immobilier.component.html',
  styleUrls: ['./modifier-immobilier.component.scss']
})
export class ModifierImmobilierComponent {

  immobiliers:immobilier=new immobilier();
  response1 = 0;
   response2 = 0;
  @Input()
    requiredFileType:string;
    Attachement: Attachements= new Attachements();
    fileName = '';
    uploadProgress:number;
    uploadSub: Subscription;
  constructor(private attachmentService:AttachementService, private sanitizer: DomSanitizer,private uploadfileService: UploadFileService, private _location: Location,private router:Router, private AttachmentService:AttachementService ,private immobilierService:ImmobilierService, private fileuploadingService: UploadFileService,private http: HttpClient, private route:ActivatedRoute){}

  private baseUrl = 'http://localhost:8089/api/up/upload/';
  private path = "file:/Users/imen/Desktop/ProjectMission/gestion-immobilier/uploads/"
  Immobliere:immobilier;
selectedAttachment:any[]=[]
selectedImage:string= ''
   
   _value = '';
   selectedFiles?: FileList;
   currentFile?: File;
   progress = 0;
   message = '';
   

   fileInfos?: Observable<any>;
 
   id:number=0;
   ngOnInit() {
   //this.fileInfos = this.fileuploadingService.getFiles();
   console.log(this.route)
   this.id = this.route.snapshot.params['id'];
   this.getImmobilierbyId(this.id)
   console.log(this.Immobliere.attachement);
   }
 
   selectFile(event: any) {
   this.selectedFiles = event.target.files;
   }
   
 
   upload(): void {
   this.progress = 0;
   
   if (this.selectedFiles) {
     const file: File | null = this.selectedFiles.item(0);
   
     if (file) {
     this.currentFile = file;
   
     this.fileuploadingService.upload(this.currentFile).subscribe(
       (event: any) => {
       if (event.type === HttpEventType.UploadProgress) {
         this.progress = Math.round(100 * event.loaded / event.total);
        
       } else if (event instanceof HttpResponse) {
         this.message = event.body.message;
        
       }
       },
       (err: any) => {
       console.log(err);
       this.progress = 0;
   
       if (err.error && err.error.message) {
         this.message = err.error.message;
       } else {
         this.message = 'Could not upload the file!';
       }
   
       this.currentFile = undefined;
       });
     }
   
     this.selectedFiles = undefined;
   }
   }
   public updateImmobiliere():void{
   this.upload();

    this.Attachement.name = this.currentFile.name;
    this.Attachement.path = this.path + this.currentFile.name;
  
   this.AttachmentService.addAttachement(this.Attachement).subscribe(
    (response: number) =>{ this.response2 =response;  this.immobilierService.updateImmobiliere(this.immobiliers, this.id).subscribe(
      (response: number) =>{ this.response1 =response; this.AttachmentService.assignttachement(this.response2,this.response1).subscribe(
        (response: Attachements) =>{  }
       , 
       (error:HttpErrorResponse) =>{alert(error.message)}
       ) }
     , 
     (error:HttpErrorResponse) =>{alert(error.message)}
     ) }
   , 
   (error:HttpErrorResponse) =>{alert(error.message)}
   )
    
    
    
   }
   backClicked() {
    this._location.back();
  }

  public deleteAttachment(name: string):void{
    let cout: number =0;
    this.attachmentService.deleteAttachementbyName(name).subscribe(
     (response: Attachements) =>{
      console.log(response)
     
      , 
      (error:HttpErrorResponse) =>{alert(error.message)}}
      );}

  public getImmobilierbyId(id: number):void{
    
    let cout: number =0;
    this.immobilierService.getImmobilierbyId(this.id).subscribe(
     (response: immobilier) =>{
      this.Immobliere = response;
      this._value = this.Immobliere.etat;
       
    console.log(response)
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
   console.log(this.Immobliere.attachement);
   }
  public set Value(val: any) {
    this._value = val;
  }
  get Value(): string {
    return this._value;
  }
 
  
}

