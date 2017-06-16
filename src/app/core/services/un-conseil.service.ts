import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Constants } from "../../utilities/constants";
import 'rxjs/Rx';

@Injectable()
export class UnConseilService {

  constructor(public http: Http) { }

  getData() {
    return this.http.get(Constants.SERVER_HOST + "/consultation/packages")
      .map((res: Response) => res.json());
  }

}