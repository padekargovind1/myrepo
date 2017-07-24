import { Injectable } from '@angular/core';

@Injectable()
export class BrochureService {

  dialogResponse : string;
  constructor() { }

  storeResponse(response){
    this.dialogResponse=response;
  }

  getResponse(){
    return this.dialogResponse;
  }

}