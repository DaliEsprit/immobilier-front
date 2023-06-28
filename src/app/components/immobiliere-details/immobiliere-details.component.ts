import { Component } from '@angular/core';
import { Attachements } from 'src/app/shared/models/Attachments.model';

@Component({
  selector: 'app-immobiliere-details',
  templateUrl: './immobiliere-details.component.html',
  styleUrls: ['./immobiliere-details.component.scss']
})
export class ImmobiliereDetailsComponent {
  attachmentList:Attachements[]=[
  {idAttachment:1,path:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",name:"",idImmobilier:1},
  {idAttachment:2,path:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",name:"",idImmobilier:1},
  {idAttachment:3,path:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",name:"",idImmobilier:1},
  {idAttachment:4,path:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",name:"",idImmobilier:1},
  {idAttachment:5,path:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",name:"",idImmobilier:1},
  {idAttachment:6,path:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",name:"",idImmobilier:1}
]
selectedAttachment:any[]=[]
selectedImage:string=this.attachmentList[0].path;
constructor(){}
setMainAttachemnt(idM:number){
  this.selectedAttachment=this.attachmentList.filter(d=>d.idAttachment==idM);
  this.selectedImage=this.selectedAttachment[0].path
}

}
