import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';
import { PublicService } from '../services/public.service';
import { UsersService } from '../services/users.service';
import { BrochureService } from '../services/brochure.service';
declare var $ :any;

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit{

  schoolId : string = "";
  schoolData : any;
  subscription : Subscription;
  schoolShortName : string = "";
  schoolLongName : string = "";

  constructor(private route : ActivatedRoute,
              private publicService : PublicService,
              private location : Location,
              private usersService : UsersService,
              private router : Router,
              private brochureService : BrochureService) { 
  }

  ngOnInit() {
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
      slidesToShow: 4,
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
            this.runScript()
          }
        }
      )
  }

  navigateBack(){
    this.location.back();
  }

  addToWish(){
    const data = {
      type : "wish",
      school : this.schoolId
    }

    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          let data = response.data;
          console.log(response);
          if(response.code==400){
            console.log(response.message)
          } else {
            console.log("apply successful")
          }
        }
      )
  }

  applyTo(){
    this.router.navigate(['applyto', this.schoolId])
  }

  downloadBrochure(){
    this.brochureService.storeSchoolSearch(this.schoolData.shortName);
    this.router.navigate(['brochure']);
  }

}
