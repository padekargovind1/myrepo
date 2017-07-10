import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';

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
              private location : Location) { 
    this.buildFormGroup();
  }

  ngOnInit() {
  }

  buildFormGroup(){
    let password = new FormControl('', Validators.required);
    let repeated = new FormControl('', CustomValidators.equalTo(password));
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['' , Validators.compose([Validators.required, CustomValidators.email])],
      password: password,
      repeated: repeated
    })
  }

  save(){
    console.log("Register!");
    if (this.registerForm.valid){
      const email = this.registerForm.controls.email.value;
      const name = this.registerForm.controls.username.value;
      const type = "candidate";
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
              console.log('message: ', this.errorMessage);
            }
            else {
              console.log(response);
              alert("Un email de confirmation à été envoyé.");
              this.location.back();
            }
          }
        )
    }
  }

}
