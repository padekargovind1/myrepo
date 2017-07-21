import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { PublicService } from '../services/public.service';

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

  constructor(private router : Router,
              private authService : AuthService,
              private usersService : UsersService,
              private publicService : PublicService) { 
    if(this.authService.getToken()!=""){
      this.userLogin=true;
    } else {
      this.userLogin=false;
    }
  }

  ngOnInit() {
    this.getUsersApplication();
  }

  onNavigateHome(){
    this.router.navigate( ['/'] );
  }

  onSignUp(){
    this.router.navigate(['/register']);
  }

  onSignIn(){
    this.router.navigate(['/login']);
  }

  onSignOut(){
    this.authService.logout();
    this.userLogin=false;
  }

  getUsersApplication(){
    this.usersService.getApplication()
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.userApplication = data;
            this.getSchoolsData()
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
    this.router.navigate(['/applto', schoolId]);
  }

}
