import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'; 

const PROFILE_API : string = "http://54.254.203.172/cideapi/api/users/profile"

@Injectable()
export class UsersService {

  private token : string=''

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
    console.log(this.token);
  }
}
