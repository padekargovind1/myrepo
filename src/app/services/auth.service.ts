import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { globalUrl } from '../common';

const REGISTER_API: string = globalUrl + "/api/register";
const FORGOT_API : string = globalUrl + "/api/password/forgot";
const LOGIN_API : string =globalUrl + "/api/login";
const SEND_API : string = globalUrl + "/api/email/send";

@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  // private token : string = "";
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
    return this.http.post(FORGOT_API, data, {headers: this.headers})
      .map((response: Response) => response.json());
  }

  postLogin(data): Promise<any>{
    return this.http.post(LOGIN_API, data, {headers: this.headers})
    .toPromise()
    .then(
      (response)=>{
        // console.log(response.json());
        if(response.json().code == 200){
          this.storeToken(response.json().data.token)
          // console.log(this.token);
        }
        return response.json();
      })
  }

  storeToken(token){
    localStorage.setItem("userToken", token)
  }

  logout(){
    localStorage.removeItem("userToken");
  }

  getToken(){
    // console.log(this.token);
    return localStorage.getItem("userToken");
  }

  isUserLoggedIn(){
    return !!localStorage.getItem("userToken");
  }

  postSendEmail(data) : Observable<any>{
    return this.http.post(SEND_API, data, {headers: this.headers})
      .map((response)=>response.json())
  }

}
