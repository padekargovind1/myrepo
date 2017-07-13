import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {

  schoolId : string = "";
  schoolData : any;
  subscription : Subscription;

  constructor(private route : ActivatedRoute,
              private publicService : PublicService) { 
    this.subscription = this.route.params
      .subscribe(
        params =>{
          if(params.hasOwnProperty('schoolId')){
            this.schoolId=params['schoolId'];
            this.getSchoolById();
            // console.log(this.schoolId);
          }
        }
      )
  }

  ngOnInit() {
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
            console.log(this.schoolData);
          }
        }
      )
  }

}
