import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payement } from 'src/app/shared/models/Payement.model';
import { PayementService } from 'src/app/shared/services/payement.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { Jeton } from 'src/app/shared/models/Jeton.model';
import { UserService } from 'src/app/shared/services/user.service';
import { JetonService } from 'src/app/shared/services/jeton.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent {
  priceGold: number = 29.99;
  pricePremium: number = 19.99;
  user: User;
  jeton: Jeton;
  updatePay: Payement;
  userId!: any;
  paymentId:string;
  private jetonStatus!: number;
  payement : Payement;
  userEmail: String = "";
  disableFomr: Boolean = false;
  constructor(private payementService: PayementService, private router: Router, private roomServ: RoomService, public jetonserv: JetonService, private route: ActivatedRoute) {
    if (localStorage.getItem("useremail") != null) {
      this.userEmail = localStorage.getItem("useremail");
      this.disableFomr = true;
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.paymentId = params.get('id');
    })
    this.payementService.getPaymentbyId(parseInt(this.paymentId)).subscribe({
      next:(Payementtttt:Payement)=>{
        this.payement=Payementtttt;
        console.log(this.payement)
        this.getValue()
      }
    })
    
  }
  getValue(){
    if(this.payement.paymentStatus == "Gold" ){
      this.payement.price = 29.99
    }
    else{
      this.payement.price = 19.99
    }
  }

  updatePayement() {
    this.route.paramMap.subscribe(params => {
      this.paymentId = params.get('id');
    this.payementService.getPaymentbyId(parseInt(this.paymentId)).subscribe({
      next:(data:any)=>{
        this.payementService.updatePayement(this.payement, parseInt(this.payement.payementId)).subscribe({
          next: (payement: Payement) => {
            this.payement = payement
            this.updateJeton()
          }
        })
      }
    })
  })
  }

  updateJeton(){
    var user = JSON.parse(localStorage.getItem("user"))
      if (this.payement.paymentStatus == "Gold") {
        this.jetonserv.updateJetonStatus(user.id, "Gold").subscribe({
          next: (jeton: Jeton) => {
            this.router.navigateByUrl('/rooms')
          }
        })
      }
      else {
        this.jetonserv.updateJetonStatus(user.id, "Premieum").subscribe({
          next: (jeton: Jeton) => {
            this.router.navigateByUrl('/rooms')
          }
        })
      }
  }
}