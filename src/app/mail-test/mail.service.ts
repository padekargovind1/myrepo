import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

const MAIL_API : string = "http://54.254.203.172/cideapi/api/mails";

@Injectable()
export class MailService {

  constructor(private http : Http,
              private authService : AuthService) { }

  postMail(data) : Observable<any> {
    return this.http.post(MAIL_API+'?token='+this.authService.getToken(), data)
      .map(response=>response.json());
  }

  getMail(mailType) : Observable<any>{
    return this.http.get(MAIL_API+'?token='+this.authService.getToken()+'&type='+mailType)
      .map((response)=>response.json());
  }

  getMailById(mailId) : Observable<any>{
    return this.http.get(MAIL_API+'?token='+this.authService.getToken()+'&id='+mailId)
      .map(response=>response.json());
  }

  updateMail(mailId, body) : Observable<any>{
    return this.http.post(MAIL_API+'?token='+this.authService.getToken()+'&id='+mailId, body)
      .map(response=>response.json());
  }

  editMails(body) : Observable<any>{
    return this.http.put(MAIL_API+'?token='+this.authService.getToken(), body)
      .map(response=>response.json());
  }

}
