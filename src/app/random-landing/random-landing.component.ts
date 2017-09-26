import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../services/public.service';
import {HelperService} from "../services/helper.service";

@Component({
  selector: 'app-random-landing',
  templateUrl: './random-landing.component.html',
  styleUrls: ['./random-landing.component.scss']
})
export class RandomLandingComponent implements OnInit {

  constructor(private router : Router,
              private publicService : PublicService,
              private helperService : HelperService) { }

  //First page of the website to random the landing page
  ngOnInit() {
    // console.log("random init")
    let nb;
    // console.log(this.publicService.hasNumLanding())
    if(!this.publicService.hasNumLanding()){
      nb = Math.round(Math.random()*2+1)
      while(this.helperService.detectmob() && nb==2){
        nb = Math.round(Math.random()*2+1)
      }
      this.publicService.storeNumLanding(nb)
      // console.log(nb)
    } else {
      nb = this.publicService.getNumLanding()
      // console.log(nb)
    }
    this.router.navigate(['landing-page-'+nb])

  }

}
