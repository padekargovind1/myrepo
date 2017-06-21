import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams,RequestOptions,Headers  } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Constants } from "../../utilities/constants";

@Injectable()
export class SchoolService {

  constructor(public http: Http) { }


/* Load schools data on page Load */
  getData() {
    return this.http.get(Constants.SERVER_HOST + "/search/schools")
      .map((res: Response) => res.json());
  }


/* School Auto Compalte*/
  getSchoolsFilter(query) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('keyword', query);
    return this.http.get(Constants.SERVER_HOST + '/autocomplete/schools', {
      search: params
    })
      .toPromise()
      .then(res => <any[]>res.json().data)
      .then(data => { return data; });
  }



/* Search School */
  getSchools(query) {

    let params: URLSearchParams = this.objToSearchParams(query);

    return this.http.get(Constants.SERVER_HOST + "/search/schools", {
      search: params
    })
      .map((res: Response) => res.json());



  }

  objToSearchParams(obj): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        params.set(key, obj[key]);
    }
    return params;


  }



  getCities(query) {
    return this.http.get(Constants.SERVER_HOST + 'autocomplete/cities?keyword=' + query)
      .toPromise()
      .then(res => <any[]>res.json().data)
      .then(data => { return data; });
  }



  getCycles() {
    return this.http.get(Constants.SERVER_HOST + "/autocomplete/cycles")
      .map((res: Response) => res.json());
  }


  getSchoolsAutoComplete(data):Observable<any> {
    let body = new FormData();
    body.append("keyword",data);   
    return this.http.post(Constants.SERVER_HOST + 'api/public/schools/autocomplete', body)
            .map((res: Response) => res.json());   
  }


compareSchools(idsToCompare,fieldsToCompare)
{

let params: URLSearchParams = new URLSearchParams();
    params.set('idsToCompare', idsToCompare);
    params.set('fieldsToCompare', fieldsToCompare);

    return this.http.get(Constants.SERVER_HOST + '/compare/schools', {
      search: params
    })
      .toPromise()
      .then(res => <any[]>res.json().data)
      .then(data => { return data; });
  }





  getSchoolDetailByID(schoolId)
  {
        return this.http.get(Constants.SERVER_HOST + 'school/'+schoolId)
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });
            
  }

}



