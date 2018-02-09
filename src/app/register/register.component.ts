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
  public cutomeErrorMessage : any;
  public errorFlag = false;
  public digitFlag = false;
  public lowerFlag = false;
  public upperFlag = false;

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

  // Build the form to register
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

  validatePassword(event){
    var passwordValue = event.target.value
    console.log(event.target.value,passwordValue.length);
    if(passwordValue.length < 5)
    {
      this.errorFlag = true;
      this.cutomeErrorMessage = "Password sholud be 5 characters.";
    }
    else{
      this.errorFlag = false;
      this.cutomeErrorMessage = "";
    }
    passwordValue = passwordValue.split("");
    passwordValue.forEach(c => {
      if(/[a-z]/.test(c)){
        console.log("lower");
        this.lowerFlag = true;
      }
      
      if(/[A-Z]/.test(c)) {
        console.log("upper"); 
        this.upperFlag = true
      }

      if(/[0-9]/.test(c)) {
        console.log("number"); 
        this.digitFlag = true;
      }

    });

    if(this.lowerFlag == false)
    {
    this.errorFlag = true;
    this.cutomeErrorMessage = this.cutomeErrorMessage + ' Must have one small alphabate.';
    }
    if(this.upperFlag == false)
    {
      this.errorFlag = true;
      this.cutomeErrorMessage = this.cutomeErrorMessage + ' Must have one capital alphabate.';
    }
    if(this.upperFlag == false)
    {
    this.errorFlag = true;  
    this.cutomeErrorMessage = this.cutomeErrorMessage + ' Must have one digit/number.';
    }
    console.log(this.cutomeErrorMessage);
  }

  // Send data to API to create new account
  save(){
    console.log("Register!");
    if (this.registerForm.valid){
      const email = this.registerForm.value.email;
      const name = this.registerForm.value.username;
      const type = "candidate";//this.registerForm.controls.userType.value;//"candidate";
      const password = this.registerForm.value.password;
      const repeated = this.registerForm.value.repeated;

      const data = ({ email, name, type, password, repeated });

      console.log(data);

      this.authService.postRegister(data)
        .subscribe(
          (data)=>{
            let response = data;
            console.log(response);
            if (response.code == 400) { // If error from API
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
              else{
                swal({
                  title: "Username/Email already registered... Enter valid email",
                  text: "",
                  type: 'error',
                  confirmButtonText: 'Ok'
                  });
              }
              console.log('message: ', this.errorMessage);
            }
            else { // If it's good
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
              this.usersService.storeTabNb(this.registerForm.value.userType=="Parent" ? '0' : '1');
              this.putUserType();
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
    else{
      swal({
        title: 'Please fill all the details',
        text: "",
        type: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }

  // Send verification email from API
  sendVerificationEmail(email){
    this.authService.postSendEmail({email : email})
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  }

  // If user already got an account -> navigate to login page
  alreadyAccount(){
    this.router.navigate(['/login']);
  }
  //Put userType (ex : Parent (0), Student(1))
  putUserType(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          if(response.code==200){
            let data = response.data[0];
            delete data._id;
            data.profileCompletion=this.usersService.getTabNb();
            this.usersService.putProfile(data)
              .subscribe(
                (response)=>{
                  console.log(response);
                }
              )
          }
        }
      )

  }

}
