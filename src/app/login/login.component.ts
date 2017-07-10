import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  constructor(private fb : FormBuilder,
              private router : Router) {
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

  }

  onNewAccount(){
    this.router.navigate(['/register']);
  }

  onForgotPassword(){

  }

}
