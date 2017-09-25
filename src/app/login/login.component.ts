import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { BookingService } from '../services/booking.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  errorMessage : string='';

  constructor(private fb : FormBuilder,
              private router : Router,
              private authService : AuthService,
              private userService : UsersService,
              private bookingService : BookingService,
              private location : Location) {
    this.buildFormGroup();
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  // Build the form
  buildFormGroup(){
    this.loginForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required, CustomValidators.email])],
      password : ['', Validators.required]
    })
  }

  // After click on Log In
  logIn(){
    if(this.loginForm.valid){ // Check if the form is valid
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const data = ({ email, password });

      this.authService.postLogin(data) // Post to API to log in
        .then(
          data => {
            let response = data;
            // console.log(response);
            if (response.code == 400) { // If it's incorrect
              let msg = response.message;
              this.errorMessage = msg;
              console.log('message: ', this.errorMessage);
              swal({ // Sweet alert
                title: 'Attention',
                text: "L'identifiant ou le mot de passe est incorrecte",
                type: 'error',
                confirmButtonText: 'Ok'
              })
            }
            else {  // Else if it's correct
              console.log(response);
              if((this.bookingService.isForBooking() || this.bookingService.isForFastBooking()) && this.bookingService.haveBookingPackage()){
                this.router.navigate(['/payment']); // If it's for booking an appointment
              } else {
                this.router.navigate(['/']); // else -> navigate to home page
              }
              this.userService.getProfile();
            }
          }
        );
    }
  }

  // If user want to create a new account -> navigate to register page
  onNewAccount(){
    this.router.navigate(['/register']);
  }

  // If user forgot his password
  onForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  // Navigate Back
  onNavigateBack(){
    this.location.back();
  }
}
