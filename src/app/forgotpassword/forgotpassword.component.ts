import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

const password = new FormControl('', Validators.required);
const repeated = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotPasswordForm : FormGroup;
  errorMessage: string='';
  public emailNotFound : boolean = false;
  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private location : Location) {  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])]
    })
  }

  // After click on the submit button -> call API -> sweet alert
  onSubmit(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm);
      
      const data = ({
        email: this.forgotPasswordForm.value.email
      });

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
              //this.emailNotFound = true;
              swal({
                title: "Merci d'avoir choisi CIDE",
                text: 'un e-mail a été envoyé à la boîte de réception',
                type: 'success',
                confirmButtonText: 'Ok'
              }).then(() => { this.location.back() },
                (dismiss) => {
                  if (dismiss === 'overlay') { this.location.back()  }
                })
              .catch((err) => console.log("hhhhhh",err));
              // this.location.back();
            }
          }
        )
        // if(this.emailNotFound==false)
        // {
        //   this.errorMessage = "Please enter valid email";
        // }
    }
  }

}
