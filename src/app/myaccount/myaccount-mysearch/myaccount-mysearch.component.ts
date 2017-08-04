import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-myaccount-mysearch',
  templateUrl: './myaccount-mysearch.component.html',
  styleUrls: ['./myaccount-mysearch.component.scss']
})
export class MyaccountMysearchComponent implements OnInit {

  constructor(private usersService : UsersService) { }

  ngOnInit() {

  }

  getApplications(){
    this.usersService.getApplication()
      .subscribe(
        response =>{
          console.log(response)
        }
      )
  }

}
