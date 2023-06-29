import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { immobilier } from 'src/app/shared/models/Immobiliers.model';

@Component({
  selector: 'app-immobiliere',
  templateUrl: './immobiliere.component.html',
  styleUrls: ['./immobiliere.component.scss']
})
export class ImmobiliereComponent {
  listImmobliere:immobilier[]=[
    {id:1,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:2,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:3,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:4,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:5,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:6,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:7,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:8,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:9,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:10,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:11,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:12,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:13,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:14,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},
    {id:15,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",nbClick:0},

  ];
constructor(private auth:AuthService,private router:Router){}

validateUser(){
  if(this.auth.getToken()!=null)
  return true
  else{
    this.router.navigateByUrl("/login");
  return false
  };
}
navToImmobiliereDetails(idImmobilier:number){
  this.listImmobliere.filter(im=>{
    if(im.id==idImmobilier)
    im.nbClick=im.nbClick+1;
  })
  return this.router.navigateByUrl("/immobiliereDetails")
}

}
