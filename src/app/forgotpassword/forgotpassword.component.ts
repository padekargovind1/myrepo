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

  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private location : Location) {  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      code : ['', Validators.required],
      password : password,
      repeated : repeated
    })
  }

  // After click on the submit button -> call API -> sweet alert
  onSubmit(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm);
      
      const data = ({
        code: this.forgotPasswordForm.value.code.toString(),
        password: this.forgotPasswordForm.value.password.toString(),
        repeated: this.forgotPasswordForm.value.repeated.toString()
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
              swal({
                title: "Merci d'avoir choisi CIDE",
                text: 'response.data',
                type: 'success',
                confirmButtonText: 'Ok'
              }).then(() => { this.location.back() },
                (dismiss) => {
                  if (dismiss === 'overlay') { this.location.back()  }
                })
              .catch((err) => console.log(err));
              // this.location.back();
            }
          }
        )
    }
  }

}
