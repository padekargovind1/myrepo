import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup;
  errorMessage: string='';

  constructor(private fb: FormBuilder,
              private authService : AuthService,
              private router : Router,
              private usersService : UsersService,
              private bookingService : BookingService) { 
    this.buildFormGroup();
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  buildFormGroup(){
    let password = new FormControl('', Validators.required);
    let repeated = new FormControl('', CustomValidators.equalTo(password));
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['' , Validators.compose([Validators.required, CustomValidators.email])],
      userType: ['' , Validators.compose([Validators.required])],
      password: password,
      repeated: repeated
    })
  }

  save(){
    console.log("Register!");
    if (this.registerForm.valid){
      const email = this.registerForm.controls.email.value;
      const name = this.registerForm.controls.username.value;
      const type = "candidate";//this.registerForm.controls.userType.value;//"candidate";
      const password = this.registerForm.controls.password.value;
      const repeated = this.registerForm.controls.repeated.value;

      const data = ({ email, name, type, password, repeated });

      console.log(data);

      this.authService.postRegister(data)
        .subscribe(
          (data)=>{
            let response = data;
            console.log(response);
            if (response.code == 400) {
              let msg = response.message;
              this.errorMessage = msg;
			  if(msg.indexOf("utilisateur existe")>=0)
			  {
				  swal({
					title: "Un compte utilisant cette adresse email est deja enregistree, merci de vous connecter.",
					text: "",
					type: 'error',
					confirmButtonText: 'Ok'
				  });
			  }
              console.log('message: ', this.errorMessage);
            }
            else {
              this.sendVerificationEmail(email);
              console.log(response);
              swal({
                title: 'Votre compte a été créé',
                text: "",
                type: 'success',
                confirmButtonText: 'Ok'
              })
              // console.log(response.data.token)
              this.authService.storeToken(response.data.token)
              this.usersService.storeTabNb('0')
              this.storeUserType(this.registerForm.controls.userType.value,email);
              if((this.bookingService.isForBooking() || this.bookingService.isForFastBooking()) && this.bookingService.haveBookingPackage()){
                this.router.navigate(['/payment']);
                //this.bookingService.makeAppointment();
              } else {
                this.router.navigate(['/my-account'])
              }
            }
          }
        )
    }
  }

  storeUserType(userType,email){
    this.usersService.storeUserType(userType);
    this.usersService.storeUserEmail(email);
  }

  sendVerificationEmail(email){
    this.authService.postSendEmail({email : email})
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  }

  alreadyAccount(){
    this.router.navigate(['/login']);
  }

}
