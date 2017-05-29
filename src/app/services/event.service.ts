import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Constants} from "../utilities/constants";

import 'rxjs/Rx';

@Injectable()
export class EventService {
    
    constructor(private http: Http) {}

    getEvents() {
        return this.http.get('../assets/data/events.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }


    getAdvisor(packegId)
    {    
    let params: URLSearchParams = new URLSearchParams();
    params.set('package', packegId);
    return this.http.get(Constants.SERVER_HOST +'consultation/advisors',{
          search:params
      })
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });


        
    
}
}
