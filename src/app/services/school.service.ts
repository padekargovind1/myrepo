import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SchoolService {

   constructor(public http:Http) {}

   getData() {
    return this.http.get("http://54.254.203.172/cideapi/search/schools")
        .map((res:Response) => res.json());
  }


/*getSchools() {
    return this.http.get('http://54.254.203.172/cideapi/search/schools')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }*/



 getCities(query) {
        return this.http.get('http://54.254.203.172/cideapi/autocomplete/cities?keyword='+ query)
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }
  
}
