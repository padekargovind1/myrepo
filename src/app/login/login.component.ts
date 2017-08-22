import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
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
              private userService : UsersService) {
    this.buildFormGroup();
  }

  ngOnInit() {
  }

  buildFormGroup(){
    this.loginForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required, CustomValidators.email])],
      password : ['', Validators.required],
      userType : ['', Validators.required]
    })
  }

  logIn(){
    if(this.loginForm.valid){
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      const userType = this.loginForm.controls.userType.value;

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
                title: 'Erreur',
                text: "L'identifiant ou le mot de passe est incorrecte",
                type: 'error',
                confirmButtonText: 'Ok'
              })
            }
            else {
              console.log(response);
              this.storeUserType(userType)
              this.router.navigate(['/'])
            }        
          }
        );
    }
  }

  storeUserType(userType){
    this.userService.storeUserType(userType);
  }

  onNewAccount(){
    this.router.navigate(['/register']);
  }

  onForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

}
