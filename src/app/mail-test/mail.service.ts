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
      .map(response=>response.json())
  }

}
