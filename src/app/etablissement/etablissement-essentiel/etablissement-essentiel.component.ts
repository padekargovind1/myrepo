import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-etablissement-essentiel',
  templateUrl: './etablissement-essentiel.component.html',
  styleUrls: ['./etablissement-essentiel.component.scss']
})
export class EtablissementEssentielComponent implements OnInit {
  schoolId = "";
  subscription : Subscription;
  schoolData : any;
  gettingSchool : boolean = false;
  constructor(private publicService : PublicService,
              private route : ActivatedRoute) { 
  }

  ngOnInit() {
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
            this.gettingSchool=true;
            console.log(this.schoolData);
          }
        }
      )
  }

}
