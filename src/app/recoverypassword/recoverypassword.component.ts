import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

const password = new FormControl('', Validators.required);
const repeated = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css']
})
export class RecoverypasswordComponent implements OnInit {

  public recoveryPasswordForm : FormGroup;
  errorMessage: string='';
  subscription: Subscription;
  code = "";

  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private location : Location,
              private route: ActivatedRoute,
              private router: Router) {
                this.subscription = this.route.url.subscribe(params => {
                    console.log(params)
                    this.code = params[2].path;
                });
              }

  ngOnInit() {
    this.recoveryPasswordForm = this.fb.group({
      password : password,
      repeated : repeated
    })
  }

  // After click on the submit button -> call API -> sweet alert
  onSubmit(){
    if(this.recoveryPasswordForm.valid){
      console.log(this.recoveryPasswordForm);
      
      const data = ({
        code: this.code,
        password: this.recoveryPasswordForm.value.password,
        repeated: this.recoveryPasswordForm.value.repeated
      });

      this.authService.postRecovery(data)
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
