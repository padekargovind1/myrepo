import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

const REGISTER_API: string = "http://54.254.203.172/cideapi/api/auth/register";
const FORGOT_API : string = "http://54.254.203.172/cideapi/api/auth/password";
const LOGIN_API : string ="http://54.254.203.172/cideapi/api/auth/log";

@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private token : string ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NjMzYWJjODBkYzNlMjEyYzJlZTFlMiIsInJvbGVzIjp7ImNhbmRpZGF0ZS1hY2Nlc3MiOiIqIiwiX2lkIjoiNTk2MzNhYmM4MGRjM2UyMTJjMmVlMWUzIiwibWFpbC1hY2Nlc3MiOiIqIn0sImNhbmRpZGF0ZSI6IjU5NjMzYWJjODBkYzNlMjEyYzJlZTFlNCIsImlhdCI6MTQ5OTgyMjA1MCwiZXhwIjoxNDk5ODMwNjkwLCJhdWQiOiIxIiwiaXNzIjoiMSJ9.DVYJHz3ZtQdA5IXWThBrYsoW3tEiqOp5_CE44xpWiYo';

  constructor(private http : Http) { }

  postRegister(data) : Observable<any>{
    return this.http.post(REGISTER_API, data, {headers: this.headers})
      .map((response: Response) => response.json())
      // .subscribe(
      //   (response)=>{
      //     console.log(response);
      //   }
      // )
  }

  postForgot(data): Observable<any>{
    return this.http.post(FORGOT_API + '/forgot', data, {headers: this.headers})
      .map((response: Response) => response.json());
  }

  postLogin(data): Promise<any>{
    return this.http.post(LOGIN_API, data, {headers: this.headers})
    .toPromise()
    .then(
      (response)=>{
        // console.log(response.json());
        this.token=response.json().data.token;
        // console.log(this.token);
        return response.json();
      })
  }

  logout(){
    this.token='';
  }

  getToken(){
    return this.token;
  }

}
