import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';
import { PublicService } from '../services/public.service';
declare var $ :any;

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {

  schoolId : string = "";
  schoolData : any;
  subscription : Subscription;
  schoolShortName : string = "";
  schoolLongName : string = "";

  constructor(private route : ActivatedRoute,
              private publicService : PublicService,
              private location : Location) { 
  }

  ngOnInit() {
    this.runScript();
    this.subscription = this.route.params
      .subscribe(
        params =>{
          // console.log(params)
          if(params.hasOwnProperty('schoolId')){
            this.schoolId=params['schoolId'];
            this.getSchoolById();
            // console.log(this.schoolId);
          }
        }
      )
  }
  runScript(){
    $('.slickjs').slick({
      arrows : false,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
      
  }

  getSchoolById(){
    this.publicService.getSchoolById(this.schoolId)
      .subscribe(
        (data) => {
          let response = data;
          console.log(response);
          if (response.code==400){
            console.log(response.message);
          }else {
            this.schoolData = response.data;
            this.schoolLongName=this.schoolData.longName;
            this.schoolShortName=this.schoolData.shortName;
            console.log(this.schoolData);
          }
        }
      )
  }

  navigateBack(){
    this.location.back();
  }

}
