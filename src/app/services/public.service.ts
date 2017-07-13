import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

const SCHOOLS_API : string = "http://54.254.203.172/cideapi/api/public/schools/";

@Injectable()
export class PublicService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  getSchoolsList() : Observable<any>{
    return this.http.post(SCHOOLS_API+"schools", {headers: this.headers})
      .map((response)=>response.json());
  }
}
