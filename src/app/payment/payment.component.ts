import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { UsersService } from '../services/users.service';
import { BookingService } from '../services/booking.service';
//import swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router : Router,
              private authService : AuthService,
              private bookingService : BookingService,) {
  }

  ngOnInit() {
    if(!this.authService.isUserLoggedIn()){
      this.router.navigate(['/register']);
    }
  }

  onCheque(){
    this.bookingService.chequePayment();
  }

  onOnlinePayment(){
    this.router.navigate(['/online-payment']);
  }


}
