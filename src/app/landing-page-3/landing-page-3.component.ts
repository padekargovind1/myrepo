import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-3',
  templateUrl: './landing-page-3.component.html',
  styleUrls: ['./landing-page-3.component.scss']
})
export class LandingPage3Component implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  navigateTo(index){
  if(index==2){
    this.router.navigate(['/'])
    } else {
      this.router.navigate(['/landing-page-'+index])
    }
  }

}
