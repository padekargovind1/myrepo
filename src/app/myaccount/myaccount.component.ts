import { Component, OnInit , Output, EventEmitter} from '@angular/core';
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

  constructor(private route : Router,
              private authService : AuthService) { 
    const token = this.authService.getToken();
    console.log(token);
    if(token == ''){
      console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
  }
}
