import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';

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
              private authService : AuthService) {
    this.buildFormGroup();
  }

  ngOnInit() {
  }

  buildFormGroup(){
    this.loginForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required, CustomValidators.email])],
      password : ['', Validators.required]
    })
  }

  logIn(){
    if(this.loginForm.valid){
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

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
            }
            else {
              console.log(response);
            }        
          }
        );
      this.router.navigate(['/myaccount'])
    }
  }

  onNewAccount(){
    this.router.navigate(['/register']);
  }

  onForgotPassword(){
    this.router.navigate(['/forgotpassword']);
  }

}
