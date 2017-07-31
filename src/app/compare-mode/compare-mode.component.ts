import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import swal from 'sweetalert2';
var self = this;
@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss']
})
export class CompareModeComponent implements OnInit {

  schoolToCompare ={ids:[]};
  schoolDataToDisplay : [any]=[null];
  compareListFilter : any;
  applytoSchool={
    id: "",
    lName : "",
    sName:"",
    photo:"school-1.jpg"
  }
  showSchool : boolean = false;

  constructor(private location : Location,
              private route : ActivatedRoute,
              private publicService : PublicService,
              private compareService : CompareService,
              private router : Router) { }

  ngOnInit() {
    this.compareListFilter = this.compareService.getCompareFilter();
    console.log(this.compareListFilter)
    if(this.compareListFilter[0]==null){
      this.location.back();
    }
    // console.log(this.compareListFilter);
    // console.log(this.route.snapshot.params);
    this.schoolToCompare.ids.push(this.route.snapshot.params[0]);
    this.schoolToCompare.ids.push(this.route.snapshot.params[1]);
    if(this.route.snapshot.params[2]){
      this.schoolToCompare.ids.push(this.route.snapshot.params[2]);
    }
    if (this.route.snapshot.params[3]){
      this.schoolToCompare.ids.push(this.route.snapshot.params[3]);
    }
    this.getSchoolData();
  }

  getSchoolData(){
    this.publicService.postComparing(this.schoolToCompare)
      .subscribe(
        response=>{
          let data = response.data;
          this.schoolDataToDisplay=data;
          this.showSchool=true;
          console.log(this.schoolDataToDisplay, this.showSchool)
        }
      )
    // this.schoolDataToDisplay.pop()
    // for(let school of this.schoolToCompare){
    //   this.publicService.getSchoolById(school)
    //     .subscribe(
    //       (response)=>{
    //         let data = response.data;
    //         // console.log(data);
    //         this.schoolDataToDisplay.push(data);
    //         // console.log(this.schoolDataToDisplay);
    //       }
    //     )
    // }
  }

  onNavigateBack(){
    this.location.back();
  }

  onDeleteCompare(school){
    console.log("click on delete");
    // console.log(this.schoolDataToDisplay);
    this.schoolDataToDisplay.splice(school, 1);
    if(this.schoolDataToDisplay.length==0){
      this.showSchool=false
    }
    // console.log(this.schoolDataToDisplay);
  }

  applyToSchool(){
    console.log('click', this.applytoSchool);
    this.router.navigate(['applyto', this.applytoSchool.id]);
  }

  onApply(school){
    console.log(school)
    this.applytoSchool.id=school._id;
    this.applytoSchool.lName=school.longName;
    this.applytoSchool.sName=school.shortName;
    this.applytoSchool.photo="school-1.jpg";
  }

}
