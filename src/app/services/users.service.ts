import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'; 
import {MyAccountMdl, 
        MyAccountParentMdl, 
        MyAccountAdresse,
        MyAccountSocialAdrMdl,
        MyAccountHistoryMdl,
        MyAccountBulletin } from '../model/myaccount.model';

const PROFILE_API : string = "http://54.254.203.172/cideapi/api/users/profile";
const APPOINTMENTS_API : string = "http://54.254.203.172/cideapi/api/users/appointments";

@Injectable()
export class UsersService {

  private parentData : MyAccountParentMdl;
  private childData : MyAccountMdl;
  private token : string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NjcxMWExZDdjM2ZmMDRmMTM3MTM2OCIsInJvbGVzIjp7ImNhbmRpZGF0ZS1hY2Nlc3MiOiIqIiwiX2lkIjoiNTk2NzExYTFkN2MzZmYwNGYxMzcxMzY5IiwibWFpbC1hY2Nlc3MiOiIqIn0sImNhbmRpZGF0ZSI6IjU5NjcxMWExZDdjM2ZmMDRmMTM3MTM2YSIsImlhdCI6MTQ5OTkyNjk0NSwiZXhwIjoxNDk5OTM1NTg1LCJhdWQiOiIxIiwiaXNzIjoiMSJ9.6XhNmu51C25k8llpLSAjvp9Z0KRUnkxPRgj-wY8WJ14';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http,
              private authService : AuthService) { }

  putProfile(data) : Observable<any>{
    this.getToken();
    return this.http.put(PROFILE_API+'?token='+this.token, data, {headers: this.headers})
      .map((response)=>response.json());
  }

  getProfile() : Observable<any>{
    this.getToken();
    return this.http.get(PROFILE_API+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  getToken(){
    this.token = this.authService.getToken();
    // console.log(this.token);
  }

  storeParentData(parentData : MyAccountParentMdl){
    this.parentData=parentData;
    console.log(this.parentData);
  }

  getParentData(){
    console.log(this.parentData);
    return this.parentData;
  }

  storeChildData(childData : MyAccountMdl){
    this.childData=childData;
    console.log(this.childData);
  }

  getChildData(){
    console.log(this.childData);
    return this.childData;
  }

  getAppointmentsPackage() : Observable<any>{
    return this.http.get(APPOINTMENTS_API+'/package?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  getAppointmentsAdviserList(packageId): Observable<any>{
    return this.http.get(APPOINTMENTS_API+'/adviserlist?id='+packageId, {headers: this.headers})
      .map((response)=>response.json());
  }

  getAdviserFreeTime(adviserId):Observable<any>{
    return this.http.get(APPOINTMENTS_API+'/adviserdata?token='+this.token+'&id='+adviserId, {headers: this.headers})
      .map((response)=>response.json());
  }

  getAdviserData(adviserId): Observable<any>{
    return this.http.get(APPOINTMENTS_API+'/adviser?token='+this.token+'&id='+adviserId, {headers: this.headers})
      .map((response)=>response.json());
  }

  postDataAppointments(data): Observable<any>{
    return this.http.post(APPOINTMENTS_API, data)
      .map((response)=>response.json());
  }

  postCreateNewAppointment(data, packageId): Observable<any>{
    return this.http.post(APPOINTMENTS_API+'/adviser?id='+packageId, data)
      .map((response)=>response.json());
  }
}
