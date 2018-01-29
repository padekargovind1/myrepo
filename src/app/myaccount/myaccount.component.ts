import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { WizardService } from '../services/wizard.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit, OnDestroy {

  @ViewChild('tabGroup') tabGroup;
  userData : any;
  subscription: Subscription;

  constructor(private route : Router,
              private router: ActivatedRoute,
              private authService : AuthService,
              private usersService: UsersService,
              private wizardService: WizardService) {
      if (this.authService.isUserLoggedIn()) {
        this.subscription = this.router.url.subscribe(params => {
          this.wizardService.setPageName(params[0].path);
        });
          this.getUserProfile();
      }
      else
      {
          this.route.navigate(['/login']);
      }
  }

  ngOnInit() {
      this.goTabNb(this.usersService.getTabNb());
  }

  //Switch tabs
  goTabNb(nb){
    // console.log(nb)
    this.tabGroup.selectedIndex=nb;
  }

  // Go to the child tab (number 2 )
  goToChild(event){
    // console.log(event);
    this.tabGroup.selectedIndex=1;
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe((response)=>{
        console.log(response);
        if(response.code==200){
          this.userData=response.data[0];
        }
      })
  }

  ngOnDestroy(){
    this.usersService.cleanTabNb();
    this.subscription.unsubscribe();
  }
}
