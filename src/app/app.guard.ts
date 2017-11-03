import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {HelperService} from "./services/helper.service";

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private helperService : HelperService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.helperService.detectmob();
  }
}
