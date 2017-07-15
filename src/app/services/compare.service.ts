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
    this.compareFilterData = compareFilter;
    console.log(this.compareFilterData);
  }

  getCompareFilter(){
    console.log(this.compareFilterData);
    return this.compareFilterData;
  }

}
