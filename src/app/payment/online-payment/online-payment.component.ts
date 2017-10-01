import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.css']
})
export class OnlinePaymentComponent implements OnInit {

  payment={
    informationPaymentTitle:['Identifiant du marchand : ', 'Numéro de transaction : ', 'Référence de commmande : ', 'Montant : '],
    informationPaymentValue : ['123456789', '000122', '11111']
  }
  paymentMethod={
    imgName:['cb.png', 'eCarteBlue.png', 'maestro.png', 'mastercard.png', 'visa.png', 'visaElectron.png'],
    title:['CB', 'E-CARTEBLEUE', 'Maestro', 'MasterCard', 'Visa', 'Visa Electron']
  }

  constructor(private bookingService : BookingService,
              private router : Router) { }

  ngOnInit() {
    this.payment.informationPaymentValue[3]=this.bookingService.getBookingPackage()[2]
  }

  onCancel(){
    this.router.navigate(['/payment']);
  }

  onConfirm(){
    this.router.navigate(['/wizard'])
  }

}
