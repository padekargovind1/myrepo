import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

const password = new FormControl('', Validators.required);
const repeated = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  public changePasswordForm : FormGroup;
  errorMessage: string='';

  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private location : Location,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldpassword: ['', Validators.required],
      password : password,
      repeated : repeated
    })
  }

  // After click on the submit button -> call API -> sweet alert
  onSubmit(){
    if(this.changePasswordForm.valid){
      console.log(this.changePasswordForm);
      
      const data = ({
        oldPassword: this.changePasswordForm.value.oldpassword,
        password: this.changePasswordForm.value.password,
        repeated: this.changePasswordForm.value.repeated
      });

      this.authService.changePassword(data)
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
                text: 'Mot de passe changé',
                type: 'success',
                confirmButtonText: 'Ok'
              }).then(() => { this.router.navigate(['/login']) },
                (dismiss) => {
                  if (dismiss === 'overlay') { this.router.navigate(['/login'])  }
                })
              .catch((err) => console.log(err));
            }
          }
        )
    }
  }

}
