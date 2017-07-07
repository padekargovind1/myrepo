import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

const TRIPS_API: string = "http://54.254.203.172/cideapi/api/schools/trips";
const LINGUISTIC_API: string = "http://54.254.203.172/cideapi/api/schools/linguistic";
const LANGUAGE_API: string = "http://54.254.203.172/cideapi/api/schools/language";
const STATISTICS_API: string = "http://54.254.203.172/cideapi/api/schools/statictics";

@Injectable()
export class SchoolService {

  constructor(private http: Http) { }

  getTrips() :  Observable<any>{
    return this.http.get(TRIPS_API).map((response) => {response.json()});
  }

  getLinguistics() : Observable <any> {
    return this.http.get(LINGUISTIC_API).map((response)=>{response.json()});
  }

  getLanguage() : Observable<any> {
    return this.http.get(LANGUAGE_API).map((response)=>{response.json()});
  }

  getStatistics() : Observable<any> {
    return this.http.get(STATISTICS_API).map((response)=>{response.json()});
  }
}
