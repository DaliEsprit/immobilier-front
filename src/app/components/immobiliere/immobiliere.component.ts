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
    {id:1,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:2,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:3,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:4,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:5,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:6,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:7,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:8,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:9,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:10,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:11,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:12,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:13,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:14,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},
    {id:15,status:"good",etat:"neuf",description:"gogoogogoggogo",userId:4,roomId:0,attachement:"https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg"},

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
navToImmobiliereDetails(){
  return this.router.navigateByUrl("/immobiliereDetails")
}

}
