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

const PROFILE_API : string = "http://54.254.203.172/cideapi/api/users/profile"

@Injectable()
export class UsersService {

  private parentData : MyAccountParentMdl;
  private childData : MyAccountMdl;
  private token : string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NjVjZmEyZTJkMjBlNTJmZGFkODBlMCIsInJvbGVzIjp7ImNhbmRpZGF0ZS1hY2Nlc3MiOiIqIiwiX2lkIjoiNTk2NWNmYTJlMmQyMGU1MmZkYWQ4MGUxIiwibWFpbC1hY2Nlc3MiOiIqIn0sImNhbmRpZGF0ZSI6IjU5NjVjZmEyZTJkMjBlNTJmZGFkODBlMiIsImlhdCI6MTQ5OTg0NDUxNCwiZXhwIjoxNDk5ODUzMTU0LCJhdWQiOiIxIiwiaXNzIjoiMSJ9.oaVUuDWO5X4TUxx4rZye7wX-OhEa6QmCFqqg-4w1GV4'

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
}
