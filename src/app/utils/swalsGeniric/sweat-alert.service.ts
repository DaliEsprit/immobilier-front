import { Injectable } from '@angular/core'; 
import Swal, { SweetAlertArrayOptions, SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweatAlertService {
  
  constructor( ) { }


private toast(){
 return Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: "white",
 
  customClass: {
    popup: 'colored-toast'
  },
  
  color:"white",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}
  
public async show(type: SweetAlertIcon,text:string){
 await this.toast().fire({
    icon: type, 
    title:text, 
  })
 
}
 
 

 
}
