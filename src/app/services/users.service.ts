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
const PACKAGE_API : string = "http://54.254.203.172/cideapi/api/users/package";
const APPLICATION_API : string = "http://54.254.203.172/cideapi/api/users/apply";

@Injectable()
export class UsersService {

  private parentData : MyAccountParentMdl;
  private childData : MyAccountMdl;
  private token : string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NzAyMmZlZWViNTgxMTUwYzI5MzZhMSIsInJvbGVzIjp7ImNhbmRpZGF0ZS1hY2Nlc3MiOiIqIiwiX2lkIjoiNTk3MDIyZmVlZWI1ODExNTBjMjkzNmEyIiwibWFpbC1hY2Nlc3MiOiIqIn0sImNhbmRpZGF0ZSI6IjU5NzAyMmZlZWViNTgxMTUwYzI5MzZhMyIsImlhdCI6MTUwMDYxNTUxMiwiZXhwIjoxNTAwNjI0MTUyLCJhdWQiOiIxIiwiaXNzIjoiMSJ9.johxRgxVI9jeGHeTy6npgRbllDCiPMk8VV-nnsRcwSk';

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
    return this.token;
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
    return this.http.get(PACKAGE_API+'s?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  getAppointmentsPackageById(packageId): Observable<any>{
    return this.http.get(PACKAGE_API+'/packageId?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  // getAppointmentsAdviserList(packageId): Observable<any>{
  //   return this.http.get(APPOINTMENTS_API+'/adviserlist?id='+packageId+'&token='+this.token, {headers: this.headers})
  //     .map((response)=>response.json());
  // }

  getAppointmentsAdviserList(packageId): Observable<any>{
    return this.http.get('http://linkaran.com/api/v1/availability/59269309195480442448fb1e', {headers: this.headers})
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

  postApplication(data): Observable<any>{
    return this.http.post(APPLICATION_API+'?token='+this.token, data)
      .map((response)=>response.json());
  }

  getApplication():Observable<any>{
    return this.http.get(APPLICATION_API+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }
}
