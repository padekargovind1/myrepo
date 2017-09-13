import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotPasswordForm : FormGroup;
  errorMessage: string='';

  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private location : Location) { 
    this.forgotPasswordForm = this.fb.group({
      email : ['' , Validators.compose([Validators.required, CustomValidators.email])],
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm);

      const email = this.forgotPasswordForm.controls.email.value;

      const data = ({ email });
      this.authService.postForgot(data)
        .subscribe(
          (data)=>{
            let response = data;
            console.log(response);  
            if (response.code == 400) {
              let msg = response.message;
              this.errorMessage = msg;
              console.log('message: ', this.errorMessage);
            }
            else {
              console.log(response);
              swal({
                title: "Merci d'avoir choisi CIDE",
                text: response.data,
                type: 'success',
                confirmButtonText: 'Ok'
              })
              this.location.back();
            } 
          }
        )
    }
  }

}
