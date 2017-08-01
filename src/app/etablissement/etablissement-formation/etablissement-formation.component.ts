import { Component, OnInit, Input } from '@angular/core';
import { SchoolCycleMdl } from '../../model/school-cycle.model';
import { EtablissementService } from '../../services/etablissement.service';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-etablissement-formation',
  templateUrl: './etablissement-formation.component.html',
  styleUrls: ['./etablissement-formation.component.scss']
})
export class EtablissementFormationComponent implements OnInit {
  @Input() schoolDataRef;
  schoolDataToDisplay =[];
  subscription : Subscription;
  schoolData=[];
  schoolId = "";
  constructor(private etablissementService : EtablissementService,
              private publicService : PublicService,
              private route : ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.schoolDataToDisplay=this.etablissementService.getSchoolToDisplay();
    console.log(this.schoolDataToDisplay)
    this.schoolData[0]=new SchoolCycleMdl();
    this.getSchoolId();
    console.log(this.schoolData)
  }

  getSchoolId(){
    this.subscription = this.route.params
      .subscribe(
        params =>{
          if(params.hasOwnProperty('schoolId')){
            this.schoolId=params['schoolId'];
            this.getSchoolDataById();
          }
        }
      )
  }

  getSchoolDataById(){
    this.publicService.getSchoolById(this.schoolId)
      .subscribe(
        (data) => {
          let response = data;
          console.log(response);
          if (response.code==400){
            console.log(response.message);
          }else {
            this.schoolData.splice(0, 1);
            for(let i = 0; i<response.data.cycles.length; i++){
              this.schoolData.push(this.etablissementService.fillSchoolData(response.data, i))
              // console.log(this.schoolData[i])
            }
            console.log(this.schoolDataRef)
            this.schoolDataToDisplay=this.schoolDataRef.cycles
            console.log(this.schoolData, this.schoolDataToDisplay);
          }
        }
      )
  }

}
