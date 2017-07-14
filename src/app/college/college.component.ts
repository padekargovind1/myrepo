import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  schoolList : any;
  compareList= [];
  four : boolean = false;
  canCompare : boolean = false;

  constructor(private publicService : PublicService,
              private router : Router) { }

  ngOnInit() {
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          // console.log(response);
          this.schoolList = response.data;
          console.log(this.schoolList);
        }
      )
  }

  onCheckbox(schoolId){
    console.log(schoolId);
    if(this.compareList.includes(schoolId)){
      console.log("remove checkbox");
      let i = this.compareList.indexOf(schoolId, 0);
      // console.log(i);
      this.compareList.splice(i, 1);
      this.four=false;
      if(this.compareList.length<=1){
        this.canCompare=false;
      }
    } else if(this.compareList.length >= 4){
      alert("Vous ne pouvez comparer plus de 4 écoles à la fois. Vous pouvez tout de même désélectionner une école déjà sélectionné");
      this.four=true;
    } else {
      this.compareList.push(schoolId);
      if(this.compareList.length>1){
        this.canCompare=true;
      }
    }
  }

  onCompare(){
    let schoolList = this.compareList;
    console.log(schoolList);
    this.router.navigate(['/compare-mode/', schoolList]);
  }

}
