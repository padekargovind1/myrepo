import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Title : String = "Ma Recherche";

  userLogin : boolean = false;
  userApplication : any;

  constructor(private router : Router,
              private authService : AuthService,
              private usersService : UsersService) { 
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
            this.userApplication = data
          }
        }
      )
  }

}
