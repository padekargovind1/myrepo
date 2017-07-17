import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';

@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss']
})
export class CompareModeComponent implements OnInit {

  schoolToCompare =[];
  schoolDataToDisplay : [any]=[null];
  compareListFilter : any;

  constructor(private location : Location,
              private route : ActivatedRoute,
              private publicService : PublicService,
              private compareService : CompareService) { }

  ngOnInit() {
    this.compareListFilter = this.compareService.getCompareFilter();
    if(this.compareListFilter[0]==null){
      this.location.back();
    }
    // console.log(this.compareListFilter);
    console.log(this.route.snapshot.params);
    this.schoolToCompare.push(this.route.snapshot.params[0]);
    this.schoolToCompare.push(this.route.snapshot.params[1]);
    if(this.route.snapshot.params[2]){
      this.schoolToCompare.push(this.route.snapshot.params[2]);
    }
    if (this.route.snapshot.params[3]){
      this.schoolToCompare.push(this.route.snapshot.params[3]);
    }
    this.getSchoolData();
  }

  getSchoolData(){
    this.schoolDataToDisplay.pop()
    for(let school of this.schoolToCompare){
      this.publicService.getSchoolById(school)
        .subscribe(
          (response)=>{
            let data = response.data;
            // console.log(data);
            this.schoolDataToDisplay.push(data);
            console.log(this.schoolDataToDisplay);
          }
        )
    }
  }

  onNavigateBack(){
    this.location.back();
  }

  onDeleteCompare(school){
    console.log("click on delete");
    // console.log(this.schoolDataToDisplay);
    this.schoolDataToDisplay.splice(school, 1);
    // console.log(this.schoolDataToDisplay);
  }

}
