import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payement } from 'src/app/shared/models/Payement.model';
import { PayementService } from 'src/app/shared/services/payement.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent {
  payement= new Payement();
  userEmail: String = "";
  disableFomr:Boolean=false
  constructor(private payementService: PayementService, private router: Router) {
    if (localStorage.getItem("useremail") != null) {
      this.userEmail = localStorage.getItem("useremail");
      this.disableFomr=true;
    }
  }

  addPayement(){
    this.payementService.addPayement(this.payement).subscribe(
      {
        next : ()=> (this.router.navigate(['/'])),
      }
    )
  }
}