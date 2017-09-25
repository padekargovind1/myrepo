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
  strMessage : string='';
  constructor(private router : Router,
              //private userService : UsersService,
              private authService : AuthService,
              private bookingService : BookingService,) {
  }

  ngOnInit() {
    if(!this.authService.isUserLoggedIn()){
      this.router.navigate(['/register']);
    }
	else
	{
		if(this.bookingService.isForFastBooking() && this.bookingService.isSkippedWizard())
		{
			this.strMessage="First";
		}
		else if(this.bookingService.isForFastBooking())
		{
			this.strMessage="Other";
		}
		else
		{
			this.strMessage="Sorry";
		}
	}
  }

  onProceed(){
    if(this.bookingService.isForFastBooking() && this.bookingService.isSkippedWizard())
	{
		this.bookingService.makeAppointment();
		this.router.navigate(['/']);
	}
	else if(this.bookingService.isForFastBooking())
	{
		this.router.navigate(['/wizard']);
	}
	else
	{
		this.router.navigate(['/booking']);
	}
  }
}
