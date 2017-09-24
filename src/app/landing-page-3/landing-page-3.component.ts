import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-landing-page-3',
  templateUrl: './landing-page-3.component.html',
  styleUrls: ['./landing-page-3.component.scss']
})
export class LandingPage3Component implements OnInit {
  rateId : string ='';

  constructor(private router : Router,
              private publicService : PublicService) { }

  ngOnInit() {
    this.initRate();
  }

  navigateTo(index){
    this.router.navigate(['/landing-page-'+index])
  }

  initRate(){
    let rate = {
      page : '3'
    }
    this.publicService.postRate(rate)
      .subscribe(
        response=>{
          // console.log(response);
          if(response.code!=400){
            this.rateId=response.data._id;
            // console.log(this.rateId);
          }
        }
      )
  }

  onNavigate(path){
    let rate = {
      id : this.rateId,
      click : true
    }
    this.publicService.putRate(rate)
      .subscribe(
        response=>{
          // console.log(response)
        }
      )
    this.router.navigate(['/'+path]);
  }


}
