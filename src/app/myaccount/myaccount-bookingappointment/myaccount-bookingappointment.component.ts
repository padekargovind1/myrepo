import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import {date} from "ng2-validation/dist/date";

//const self = this;
@Component({
  selector: 'app-myaccount-bookingappointment',
  templateUrl: './myaccount-bookingappointment.component.html',
  styleUrls: ['./myaccount-bookingappointment.component.scss']
})
export class MyaccountBookingappointmentComponent implements OnInit {

  canDisplay: boolean = false;
  maxDate = new Date();
  bookingData = [];
  bookingDataDay = '';
  constructor(private bookingService : BookingService,
			  private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) {}

  ngOnInit() {
    if(this.authService.getToken() != "") { // If user is logged
      setTimeout(()=>{
        //this.bookingDataDay = localStorage.getItem("bookingDataDay");
        //this.bookingData = this.bookingService.getBookingPackage();
      }, 1500)
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

}
