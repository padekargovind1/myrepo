import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Constants} from "../utilities/constants";

@Injectable()
export class SchoolService {

   constructor(public http:Http) {}

   getData() {
    return this.http.get(Constants.SERVER_HOST +"/search/schools")
        .map((res:Response) => res.json());
  }

getSchoolsFilter(query)
  {
    let params: URLSearchParams = new URLSearchParams();
    params.set('keyword', query);
    return this.http.get(Constants.SERVER_HOST + '/autocomplete/schools',{
          search:params
      })
      .toPromise()
      .then(res => <any[]> res.json().data)
      .then(data => { return data; });
  }


getSchools(query) {


let params: URLSearchParams = this.objToSearchParams(query);

 return this.http.get(Constants.SERVER_HOST +"/search/schools", {
   search: params
 })
 .map((res:Response) => res.json());
 

 
}

  objToSearchParams(obj): URLSearchParams{
    let params: URLSearchParams = new URLSearchParams();
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            params.set(key, obj[key]);
    }
    return params;

 
    }



 getCities(query) {
        return this.http.get(Constants.SERVER_HOST +'autocomplete/cities?keyword='+ query)
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }



getCycles() {
    return this.http.get(Constants.SERVER_HOST + "/autocomplete/cycles")
        .map((res:Response) => res.json());
  }


  getSchoolsAutoComplete(query)
  {
    let params: URLSearchParams = new URLSearchParams();
    params.set('keyword', query);
    return this.http.get(Constants.SERVER_HOST + '/autocomplete/schools',{
          search:params
      })
      .toPromise()
      .then(res => <any[]> res.json().data)
      .then(data => { return data; });
  }

}
