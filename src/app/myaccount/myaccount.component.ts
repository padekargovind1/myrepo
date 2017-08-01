import { Component, OnInit , Output, EventEmitter, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MyAccountParentMdl, 
        MyAccountAdresse } from '../model/myaccount.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup;
  constructor(private route : Router,
              private authService : AuthService) { 
    const token = this.authService.getToken();
    // console.log(token);
    if(token == ''){
      // console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  goToChild(event){
    console.log(event);
    this.tabGroup.selectedIndex=1;
  }
}
