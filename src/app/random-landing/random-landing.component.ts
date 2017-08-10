import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-random-landing',
  templateUrl: './random-landing.component.html',
  styleUrls: ['./random-landing.component.scss']
})
export class RandomLandingComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    let nb = Math.round(Math.random()*2+1)
    console.log(nb)
    this.router.navigate(['/landing-page-'+nb])
  }

}
