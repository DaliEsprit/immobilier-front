import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  userEmail: String = "";
  disableFomr:Boolean=false
  constructor() {
    if (localStorage.getItem("useremail") != null) {
      this.userEmail = localStorage.getItem("useremail");
      this.disableFomr=true;
    }
  };

}