import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const SCHOOLS_API : string = "http://54.254.203.172/cideapi/api/public/schools/";
const CITIES_API : string = "http://54.254.203.172/cideapi/api/public/cities/autocomplete";
const LINGUISTIC_API: string = "http://54.254.203.172/cideapi/api/public/linguistic";
const LANGUAGE_API: string = "http://54.254.203.172/cideapi/api/public/language";
const SEARCH_API : string = "http://54.254.203.172/cideapi/api/public/search/"

@Injectable()
export class PublicService {

  searchData = ["", "", ""]
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  // getSchoolsList(limit, codeName) : Observable<any>{
  //   return this.http.post(SCHOOLS_API+"schools?limit="+limit, codeName)
  //     .map((response)=>response.json());
  // }

  getSchoolById(schoolId : string){
    return this.http.get(SCHOOLS_API+"schools/"+schoolId)
      .map((response)=>response.json());
  }

  getEvent() : Observable<any>{
    return this.http.get(SCHOOLS_API+'/events')
      .map((response)=>response.json());
  }

  postBrochure(data): Observable<any>{
    return this.http.post(SCHOOLS_API+'brochures', data)
      .map((response)=>response.json());
  }

  getBrochurebyId(schoolId, cycleId): Observable<any>{
    return this.http.get(SCHOOLS_API+'brochures/' + schoolId+'?id='+cycleId)
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

  getLinguistics() : Observable <any> {
    return this.http.get(LINGUISTIC_API)
      .map((response)=>response.json());
  }

  getLanguage() : Observable<any> {
    return this.http.get(LANGUAGE_API)
      .map((response)=>response.json());
  }

  postSearchSchool(data, limit) : Observable<any>{
    return this.http.post(SEARCH_API+'schools?limit='+limit, data)
      .map((response)=>response.json())
  }

  postComparing(data) : Observable<any>{
    return this.http.post(SCHOOLS_API+'comparing', data)
      .map((response)=>response.json())
  }

  postFastSearch(data, limit): Observable<any>{
    return this.http.post(SCHOOLS_API+'schools?limit='+limit, data)
      .map((response)=>response.json())
  }
}
