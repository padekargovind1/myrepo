import { Injectable } from '@angular/core';
import { Http, Headers,Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {MyAccountMdl} from '../model/myaccount.model';
import { Subject } from 'rxjs/Subject';

const PROFILE_API : string = "http://13.229.117.64/cideapi/api/profile";
const APPOINTMENTS_API : string = "http://13.229.117.64/cideapi/api/public";
const PACKAGE_API : string = "http://13.229.117.64/cideapi/api/public/package";
const APPLICATION_API : string = "http://13.229.117.64/cideapi/api/users/apply";
const BRONCHURE_API : string = "http://13.229.117.64/cideapi/api/users/media";
const TRIPS_API: string = "http://13.229.117.64/cideapi/api/users/trips";
const HISTORY_API : string = "http://13.229.117.64/cideapi/api/common/history";
const MESSAGES_API : string = "http://13.229.117.64/cideapi/api/users/profile/mail";

@Injectable()
export class UsersService {

  private token : string='';

  private headers = new Headers({'Content-Type': 'application/json'});
  newMessage = new Subject<any[]>();
  private messages: any = [
    {
      date: new Date(15, 10,2017),
      school: 'Institution Jeanne d Arc-Saint-Aspais - Fontainebleau',
      subject: 'Messo',
      message: 'Outgoing message',
      senderProperty: {
        sender: "5a38f96b928d4c165938a800",
        module: "candidate"
      },
      recipientProperty: {
        recipient: ["0000000000000000000e2145"],
        module: "school",
        rank: ""
      },
      user: "5a38f96b928d4c165938a800",
      attachments: "",
      tags: "",
      isSent: true
    },
    {
      date: new Date(15, 10,2017),
      school: 'Institution Jeanne d Arc-Saint-Aspais - Fontainebleau',
      subject: 'Messo',
      message: 'Outgoing message',
      senderProperty: {
        sender: "5a38f96b928d4c165938a800",
        module: "candidate"
      },
      recipientProperty: {
        recipient: ["0000000000000000000e2145"],
        module: "school",
        rank: ""
      },
      user: "5a38f96b928d4c165938a800",
      attachments: "",
      tags: "",
      isSent: true
    }
  ];

  constructor(private http : Http,
              private jsonp :Jsonp,
              private authService : AuthService) { }

  putProfile(data) : Observable<any>{
    this.getToken();
    return this.http.put(PROFILE_API+'?token='+this.token, data, {headers: this.headers})
      .map((response)=>response.json());
  }

  getProfile() : Observable<any>{
    this.getToken();
    return this.http.get(PROFILE_API+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  getToken(){
    this.token = this.authService.getToken();
    return this.token;
    // console.log(this.token);
  }

  getAppointmentsPackage() : Observable<any>{
    return this.http.get(PACKAGE_API+'s?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  getAppointmentsAdviserList(packageId): Observable<any>{
    return this.http.get(APPOINTMENTS_API+'/adviserlist/'+packageId+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  postCreateNewAppointment(data, packageId): Observable<any>{
    return this.http.post('http://13.229.117.64/cideapi/api/users/appointments/'+packageId+'?token='+this.getToken(), data)
      .map((response)=>response.json());
  }

  putAppointmentData(appointmentId, data): Observable<any>{
    return this.http.put('http://13.229.117.64/cideapi/api/users/appointments'+'?token='+this.getToken()+'&id='+appointmentId, data)
      .map(response=>response.json());
  }

  postApplication(data): Observable<any>{
    return this.http.post(APPLICATION_API+'?token='+this.token, data)
      .map((response)=>response.json());
  }
  
  postBrochure(data): Observable<any>{
    console.log('posting to bronchure list..');
    return this.http.post(BRONCHURE_API+'?token='+this.token, data)
      .map((response)=>response.json());
  }

  getBrochures():Observable<any>{
    return this.http.get(BRONCHURE_API+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }

  getApplication():Observable<any>{
    return this.http.get(APPLICATION_API+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }
  
  getHistory():Observable<any>{
    return this.http.get(HISTORY_API+'?token='+this.token, {headers: this.headers})
      .map((response)=>response.json());
  }
  
  postToHistory(data): Observable<any>{
    console.log('logging to history');
    console.log(data);
    return this.http.post(HISTORY_API+'?token='+this.token, data)
      .map((response)=>{response.json(); console.log('the http call happened')});
  }

  getMessages():Observable<any>{
    // return this.http.get(MESSAGES_API+'?token='+this.token, {headers: this.headers})
    //   .map((response)=>response.json());
    return this.messages.slice();
  }
  
  postToMessages(data) {
  // postToMessages(data): Observable<any>{
  //   console.log('Sending message..');
  //   console.log(data);
  //   return this.http.post(MESSAGES_API+'?token='+this.token, data)
  //     .map((response)=>{response.json()});
    this.messages.push(data);
    this.newMessage.next(this.messages.slice());
  }

  deleteApplication(data): Observable<any>{
    return this.http.delete(APPLICATION_API+'?token='+this.token+'&id='+data.id, {headers: this.headers})
      .map((response)=>response.json())
  }

  postTrip(data):Observable<any>{
    return this.http.post(TRIPS_API+'?token='+this.token, data, {headers: this.headers})
      .map((response)=>response.json())
  }

  storeTabNb(data){
    localStorage.setItem('myaccountTab', data);
    console.log(data)
  }

  getTabNb(){
    return localStorage.getItem('myaccountTab');
  }

  cleanTabNb(){
    localStorage.removeItem('myaccountTab');
  }
}
