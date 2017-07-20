import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

const SCHOOLS_API : string = "http://54.254.203.172/cideapi/api/public/schools/";
const CITIES_API : string = "http://54.254.203.172/cideapi/api/public/cities/autocomplete"

@Injectable()
export class PublicService {

  searchData = ["", "", ""]
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  getSchoolsList() : Observable<any>{
    return this.http.post(SCHOOLS_API+"schools", {headers: this.headers})
      .map((response)=>response.json());
  }

  getSchoolById(schoolId : string){
    return this.http.get(SCHOOLS_API+"schools/"+schoolId)
      .map((response)=>response.json());
  }

  getEvent() : Observable<any>{
    return this.http.get(SCHOOLS_API+'/events')
      .map((response)=>response.json());
  }

  getBrochure(): Observable<any>{
    return this.http.get(SCHOOLS_API+'/brochures')
      .map((response)=>response.json());
  }

  getBrochurebyId(brochureId): Observable<any>{
    return this.http.get(SCHOOLS_API+'/brochures/' + brochureId)
      .map((response)=>response.json());
  }

  postAutoCompleteLieu(keyword) : Observable<any>{
    return this.http.post(CITIES_API, keyword)
      .map((response)=>response.json());
  }

  postAutocompleteSchool(keyword): Observable<any>{
    return this.http.post(SCHOOLS_API+'autocomplete', keyword)
      .map((response)=>response.json());
  }

  storeSearchSchool(data){
    console.log(data);
    this.searchData=data;
  }

  getSearchSchool(){
    console.log(this.searchData);
    return this.searchData;
  }

  cleanSearch(){
    this.searchData=["", "", ""];
  }
}
