import { Injectable } from '@angular/core';

@Injectable()
export class CompareService {

  compareFilterData : any = {
      0 : null,
      1 : null,
      2 : null,
      3 : null,
      4 : null,
      5 : null,
      6 : null,
      7 : null,
      8 : null,
      9 : null,
      10 : null,
      11 : null,
      12 : null
    };
  constructor() { }

  storeCompareFilter(compareFilter){
    // this.compareFilterData = compareFilter;
    for(let i = 0; i<13; i++){
      localStorage.setItem('filter'+i, compareFilter[i])
    }
    // console.log(this.compareFilterData);
  }

  getCompareFilter(){
    // console.log(this.compareFilterData);
    for(let i = 0; i<13; i++){
      this.compareFilterData[i]=localStorage.getItem('filter'+i)
    }
    return this.compareFilterData;
  }

}
