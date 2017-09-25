import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialogConfig, MdDialog } from '@angular/material';
import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { UsersService } from '../services/users.service';
import { SendService } from '../services/send.service';
import swal from 'sweetalert2';
//var self = this;
import { SchoolChoiceComponent } from '../shared/school-choice/school-choice.component';
import { SendMessageComponent } from '../shared/send-message/send-message.component';

@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss']
})
export class CompareModeComponent implements OnInit, OnDestroy {

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
  schoolBrochure=[];
  config: any;

  constructor(private location : Location,
              private route : ActivatedRoute,
              private publicService : PublicService,
              private compareService : CompareService,
              private router : Router,
              private usersService : UsersService,
              public dialog:MdDialog,
              private sendService : SendService) { }

  ngOnInit() {
    if(!this.compareService.haveSchoolId()){
      this.router.navigate(['/'])
    }
    this.compareListFilter = this.compareService.getCompareFilter();
    console.log(this.compareListFilter)
    if(this.compareListFilter[0]==null){
      this.location.back();
    }
    this.schoolToCompare.ids=this.compareService.getSchoolToCompareId()
    this.getSchoolData();
  }

  ngOnDestroy(){
    this.compareService.cleanCompareFilter()
    this.compareService.cleanSchoolCompare()
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
          // this.getSchoolBrochure();
        }
      )
  }

  getSchoolBrochure(){
    this.schoolBrochure=[];
    for(let school of this.schoolDataToDisplay){
      this.publicService.getBrochurebyId(school._id, school.cycles[0].cycle._id)
        .subscribe(
          response => {
            console.log(response)
            if(response.code==400){
              console.log(response.message)
            } else {
              this.schoolBrochure.push(response.data)
            }
          }
        )
    }
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

  onApply(school){
    console.log(school);
    this.makeProfile(school);
    let dialogref = this.dialog.open(SchoolChoiceComponent,this.config);
  }

  makeProfile(school){
    this.config= {
      data:{
        schoolData : school
      },
      disableClose: false,
      width: '800px',
      height: '',
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

  saveInWish(index){
    const data = {
      type : "wish",
      schools : [{school : this.schoolDataToDisplay[index]._id, class :'EE'}]
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
        title: 'Attention',
        text: "Vous ne pouvez pas comparer deux mêmes écoles",
        type: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  sendMessage(school){
    let config = this.sendService.makeProfile(school)
    this.dialog.open(SendMessageComponent, config);
  }



}
