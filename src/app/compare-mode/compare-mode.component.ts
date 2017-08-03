import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { UsersService } from '../services/users.service';
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
  addSchoolsOptions=[];
  canAddSchool : boolean = false;
  schoolIdToCompare : string = "";
  counterId : number = 0;

  constructor(private location : Location,
              private route : ActivatedRoute,
              private publicService : PublicService,
              private compareService : CompareService,
              private router : Router,
              private usersService : UsersService) { }

  ngOnInit() {
    this.compareListFilter = this.compareService.getCompareFilter();
    console.log(this.compareListFilter)
    if(this.compareListFilter[0]==null){
      this.location.back();
    }
    this.schoolToCompare.ids=this.compareService.getSchoolToCompareId()
    this.getSchoolData();
  }

  getSchoolData(){
    this.publicService.postComparing(this.schoolToCompare)
      .subscribe(
        response=>{
          let data = response.data;
          for(let school of data){
            school.counter=this.counterId;
            this.counterId++;
          }
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

  onDeleteCompare(index){
    console.log("click on delete");
    // console.log(this.schoolDataToDisplay);
    this.schoolDataToDisplay.splice(index, 1);
    this.schoolToCompare.ids.splice(index, 1);
    this.compareService.storeSchoolId(this.schoolToCompare.ids)
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

  saveInWish(index){
    const data = {
      type : "wish",
      school : this.schoolDataToDisplay[index]._id
    }
    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  }

  addSchoolKeyDown(event){
    this.canAddSchool=false;
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
      this.getSchoolFilter(filter)
    }else {
      this.addSchoolsOptions=null;
    }
  }

  getSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutocompleteSchool(data)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          this.addSchoolsOptions=data
        }
      )
  }

  onSchoolClick(schoolId){
    console.log(schoolId)
    this.canAddSchool=true;
    this.schoolIdToCompare=schoolId;
  }

  onAddSchool(){
    if(this.schoolToCompare.ids.indexOf(this.schoolIdToCompare)==-1){
      this.schoolToCompare.ids.push(this.schoolIdToCompare);
      this.compareService.storeSchoolId(this.schoolToCompare.ids);
      this.getSchoolData();
    }else {
      swal({
        title: 'Erreur',
        text: "Vous ne pouvez pas comparer deux mêmes écoles",
        type: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

}
