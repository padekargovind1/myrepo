import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-random-landing',
  templateUrl: './random-landing.component.html',
  styleUrls: ['./random-landing.component.scss']
})
export class RandomLandingComponent implements OnInit {

  constructor(private router : Router,
              private publicService : PublicService) { }

  ngOnInit() {
    // console.log("random init")
    let nb;
    // console.log(this.publicService.hasNumLanding())
    if(!this.publicService.hasNumLanding()){
      nb = Math.round(Math.random()*2+1)
      this.publicService.storeNumLanding(nb)
      // console.log(nb)
    } else {
      nb = this.publicService.getNumLanding()
      // console.log(nb)
    }
    this.router.navigate(['landing-page-'+nb])
    
  }

}
