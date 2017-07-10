import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const REGISTER_API: string = "http://54.254.203.172/cideapi/api/auth/register";

@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  postRegister(data){
    return this.http.post(REGISTER_API, data, {headers: this.headers})
      .map((response: Response) => response.json())
      // .subscribe(
      //   (response)=>{
      //     console.log(response);
      //   }
      // )
  }

}
