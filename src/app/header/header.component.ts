import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Title : String = "Ma Recherche";

  userLogin : boolean = false;

  constructor(private router : Router,
              private authService : AuthService) { 
    if(this.authService.getToken()!=""){
      this.userLogin=true;
    } else {
      this.userLogin=false;
    }
  }

  ngOnInit() {
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

}
