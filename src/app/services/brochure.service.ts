import { Injectable } from '@angular/core';

@Injectable()
export class BrochureService {

  dialogResponse : string;
  constructor() { }

  storeResponse(response){
    this.dialogResponse=response;
  }

  getResponse(){
    return this.dialogResponse;
  }

  storeSchoolSearch(schoolSearch){
    localStorage.setItem('schoolSearch', schoolSearch)
  }

  hasSchoolSearch(){
    return !! localStorage.getItem('schoolSearch')
  }

  getSchoolSearch(){
    return localStorage.getItem('schoolSearch');
  }

  cleanSchoolSearch(){
    localStorage.removeItem('schoolSearch')
  }

}