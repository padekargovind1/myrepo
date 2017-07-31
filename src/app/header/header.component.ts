import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { PublicService } from '../services/public.service';
import { BookingService } from '../services/booking.service';
import { CompareService } from '../services/compare.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Title : String = "Ma Recherche";

  userLogin : boolean = false;
  userApplication : any;
  schoolApply = [];
  schoolWish = [];
  userLastName : string = "";
  userFirstName : string = "";
  wishList= []

  constructor(private router : Router,
              private authService : AuthService,
              private usersService : UsersService,
              private publicService : PublicService,
              private bookingService : BookingService,
              private compareService : CompareService) {}

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        // console.log(event);
        this.userLogin=this.authService.isUserLoggedIn();
        if(this.userLogin){
          this.getUserName();
          this.getApplication();
        }
      });
  }
  getUserName(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          // console.log(response.data[0]);
          let data = response.data[0];
          this.userFirstName = data.firstName;
          // this.userLastName = data.lastName;
        }
      )
  }

  onNavigateHome(){
    this.cleanLocalStorage()
    this.router.navigate( ['/'] );
  }

  onSignUp(){
    this.router.navigate(['/register']);
  }

  onSignIn(){
    this.router.navigate(['/login']);
  }

  onSignOut(){
    this.cleanLocalStorage();
    this.authService.logout();
    this.userLogin=false;
    this.router.navigate(['/']);
  }

  getApplication(){
    this.usersService.getApplication()
      .subscribe(
        response => {
          // console.log(response.data)
          if(response.code==400){
            console.log(response.message);
          } else {
            // console.log(response.data)
            this.wishList=response.data
          }
        }
      )
  }

  getSchoolsData(){
    for(let school of this.userApplication){
      this.publicService.getSchoolById(school)
        .subscribe(
          (response)=>{
            let data = response.data;
            console.log(data);
            if(response.code==400){
              console.log(response.message)
            } else {
              if(data.type=="wish"){
                this.schoolWish.push(data);
              } else {
                this.schoolApply.push(data);
              }
            }
          }
        )
    }
  }

  onSchoolDetail(schoolId){
    this.router.navigate(['/etablissement', schoolId]);
  }

  onApplyTo(schoolId){
    this.router.navigate(['/applyto', schoolId]);
  }

  onMyAccount(){
    this.cleanLocalStorage();
    if(this.userLogin){
      this.router.navigate(['/my-account']);
    }
  }

  cleanLocalStorage(){
    this.bookingService.cleanBooking();
    this.compareService.cleanCompareFilter();
  }

}
