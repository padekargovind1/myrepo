import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import {date} from "ng2-validation/dist/date";
import { Subscription } from 'rxjs/Subscription';

//const self = this;
@Component({
  selector: 'app-myaccount-mymessages',
  templateUrl: './myaccount-mymessages.component.html',
  styleUrls: ['./myaccount-mymessages.component.scss']
})
export class MyaccountMymessagesComponent implements OnInit, OnDestroy {

  canDisplay: boolean = false;
  maxDate = new Date();
  messages: any = [];
  subscription: Subscription;

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) {}

  ngOnInit() {
    if(this.authService.getToken() != "") { // If user is logged
      // setTimeout(()=>{
      //   this.getUserProfile();
      // }, 1500)
      // this.subscription = this.usersService.newMessage.subscribe(
      //   (messages: any[]) => {
      //     this.messages = messages;
      //   }
      // );
      // this.messages = this.usersService.getMessages();
      this.usersService.getMessages({"type": "sent"})
        .subscribe(response => {
          console.log(response);
          if (response.code == 200) {
            this.messages = response.data;
          }
        })
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
