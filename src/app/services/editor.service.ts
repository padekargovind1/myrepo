import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EditorService {

  constructor(private http : Http,
              private jsonp : Jsonp) { }
  
  getEditorialData() : Observable<any>{
    return this.jsonp.request("../../assets/json/editorial.json", {method: 'Get'})
      .map((response)=>{
        return response.json()
      })
  }

}
