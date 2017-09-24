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

  buildFormGroup(){
    this.loginForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required, CustomValidators.email])],
      password : ['', Validators.required]
    })
  }

  logIn(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const data = ({ email, password });

      this.authService.postLogin(data)
        .then(
          data => {
            let response = data;
            // console.log(response);
            if (response.code == 400) {
              let msg = response.message;
              this.errorMessage = msg;
              console.log('message: ', this.errorMessage);
              swal({
                title: 'Attention',
                text: "L'identifiant ou le mot de passe est incorrecte",
                type: 'error',
                confirmButtonText: 'Ok'
              })
            }
            else {
              console.log(response);
              if((this.bookingService.isForBooking() || this.bookingService.isForFastBooking()) && this.bookingService.haveBookingPackage()){
                this.router.navigate(['/payment']);
              } else {
                this.router.navigate(['/']);
              }
              this.userService.getProfile();
            }
          }
        );
    }
  }

  onNewAccount(){
    this.router.navigate(['/register']);
  }

  onForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  onNavigateBack(){
    this.location.back();
  }
}
