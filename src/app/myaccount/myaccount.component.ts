import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit, OnDestroy {

  @ViewChild('tabGroup') tabGroup;
  userData : any;
  constructor(private route : Router,
              private authService : AuthService,
              private usersService : UsersService) {

  }

  ngOnInit() {
    if(!this.authService.isUserLoggedIn()){ // If user is not logged, he is redirected to the login page
      this.route.navigate(['/login']);
    } else {
      this.getUserProfile();
      this.goTabNb(this.usersService.getTabNb()); // Else user is redirect to the tab number (0 by default)
    }
  }

  //Switch tabs
  goTabNb(nb){
    // console.log(nb)
    this.tabGroup.selectedIndex=nb;
  }

  // Go to the child tab (number 2 )
  goToChild(event){
    // console.log(event);
    this.tabGroup.selectedIndex=1;
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe((response)=>{
        console.log(response);
        if(response.data!=400){
          this.userData=response.data[0];
        }
      })
  }

  ngOnDestroy(){
    this.usersService.cleanTabNb();
  }
}
