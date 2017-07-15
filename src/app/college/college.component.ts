import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {
  schoolList : any;
  compareList= [];
  compareListFilter = [];
  filterList = ["Cycles & Classes", "Langues", "Spécialités", 
                "Internat", "Stages", "Restauration", 
                "Externat", "Status", "Ens. Confessionel", 
                "Sections", "Diplôme", "Options", "Places Disponible"]
  four : boolean = false;
  canCompare : boolean = false;
  canFilter : boolean = false;

  constructor(private publicService : PublicService,
              private router : Router,
              private compareService : CompareService) { }

  ngOnInit() {
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          // console.log(response);
          this.schoolList = response.data;
          console.log(this.schoolList);
        }
      )
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
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

  onFilterCheckbox(index){
    // console.log(index, this.compareListFilter[index]);
    this.compareListFilter[index] = !this.compareListFilter[index];
    this.canFilter = this.checkFilterBox();
    console.log(this.canFilter);
  }

  checkFilterBox(){
    let i = 0;
    for(let filter of this.compareListFilter){
      console.log(filter);
      if(filter==true){
        return true;
      }
      i++;
    }
    return false;
  }

  onCompare(){
    let schoolList = this.compareList;
    console.log(schoolList, this.compareListFilter);
    this.compareService.storeCompareFilter(this.compareListFilter);
    this.router.navigate(['/compare-mode/', schoolList]);
  }

}
