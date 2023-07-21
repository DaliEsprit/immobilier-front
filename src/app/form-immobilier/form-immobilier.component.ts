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
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
@Component({
  selector: 'app-form-immobilier',
  templateUrl: './form-immobilier.component.html',
  styleUrls: ['./form-immobilier.component.scss']
})
export class FormImmobilierComponent implements OnInit {
  immobiliers:immobilier=new immobilier();
  response1 = 0;
   response2 = 0;
   currentUser:User;
  @Input()
    requiredFileType:string;
    Attachement: Attachements= new Attachements();
    fileName = '';
    uploadProgress:number;
    uploadSub: Subscription;
    idUser: number;
  constructor(private userServ: UserService, private _location: Location,private router:Router, private AttachmentService:AttachementService ,private immobilierService:ImmobilierService, private fileuploadingService: UploadFileService,private http: HttpClient){}

  private baseUrl = 'http://localhost:8089/api/up/upload/';
  private path = "file:/Users/imen/Desktop/ProjectMission/gestion-immobilier/uploads/"
    
   
 
   selectedFiles?: FileList;
   currentFile?: File;
   progress = 0;
   message = '';
   

   fileInfos?: Observable<any>;
 
  
   ngOnInit() {
   //this.fileInfos = this.fileuploadingService.getFiles();
   this.userServ.getCurrent().subscribe({
    next:(user:User)=>this.currentUser=user
   })
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
   public addImmobilier():void{
   this.upload();
   
    this.Attachement.name = this.currentFile.name;
    this.Attachement.path = this.path + this.currentFile.name;
    
   this.AttachmentService.addAttachement(this.Attachement).subscribe(
    (response: number) =>{ this.response2 =response;  this.immobilierService.addImmobiliere(this.immobiliers, this.idUser ).subscribe(
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
}
