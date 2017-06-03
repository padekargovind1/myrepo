import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Constants } from "../utilities/constants";

import 'rxjs/Rx';

@Injectable()
export class EventService {



    constructor(private http: Http) { }

    getEvents() {
        return this.http.get('../assets/data/events.json')
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });
    }


    getAdvisor(packegId) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('package', packegId);
        return this.http.get(Constants.SERVER_HOST + 'consultation/advisors', {
            search: params
        })
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });
    }

 getAdvisorInfo(advisorId) {       
        
        return this.http.get(Constants.SERVER_HOST + 'consultation/advisors/' + advisorId)
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });
    }




    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    getAdvisorData(advisorId) {

        let params: URLSearchParams = new URLSearchParams();
        let date = new Date();
        let firstDate = this.formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
        let lastDate = this.formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));

        params.set('advisor', advisorId);
        params.set('fromDate', firstDate.toString());
        params.set('toDate', lastDate.toString());

        return this.http.get(Constants.SERVER_HOST + 'consultation/appointments', {
            search: params
        })
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });

}


createEvent(eventData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(eventData);
    return this.http.post(Constants.SERVER_HOST +'consultation/appointments', body, headers).map((res: Response) => res.json());
  }

}
