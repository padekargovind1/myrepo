import { Component, OnInit, Input } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
//import { PublicService } from '../../../services/public.service';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-superieur-essentiel',
  templateUrl: './superieur-essentiel.component.html',
  styleUrls: ['./superieur-essentiel.component.scss']
})
export class SuperieurEssentielComponent implements OnInit {

  @Input() schoolData : any;
  schoolId = "";
  //subscription : Subscription;
  gettingSchool : boolean = false;
  constructor(//private publicService : PublicService,
              //private route : ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log(this.schoolData)
    this.gettingSchool=true;
    // this.subscription = this.route.params
    //   .subscribe(
    //     params =>{
    //       if(params.hasOwnProperty('schoolId')){
    //         this.schoolId=params['schoolId'];
    //         this.getSchoolById();
    //         // console.log(this.schoolId);
    //       }
    //     }
    //   )

  }

  // getSchoolById(){
  //   this.publicService.getSchoolById(this.schoolId)
  //     .subscribe(
  //       (data) => {
  //         let response = data;
  //         console.log(response);
  //         if (response.code==400){
  //           console.log(response.message);
  //         }else {
  //           this.schoolData = response.data;
  //           this.gettingSchool=true;
  //           console.log(this.schoolData);
  //         }
  //       }
  //     )
  // }

}
