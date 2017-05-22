import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SchoolService {

   constructor(public http:Http) {}

   getData() {
    return this.http.get("../assets/data/schools.json")
        .map((res:Response) => res.json());
  }

 getCities() {
        return this.http.get('../assets/data/countries.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }
  
}
