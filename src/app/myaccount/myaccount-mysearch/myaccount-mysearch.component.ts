import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-myaccount-mysearch',
  templateUrl: './myaccount-mysearch.component.html',
  styleUrls: ['./myaccount-mysearch.component.scss']
})
export class MyaccountMysearchComponent implements OnInit {
  wishList = [];
  applyList = [];
  historyList = [];
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(){
    this.usersService.getApplication()
      .subscribe(
        (response) =>{
          console.log(response)
          let data = response.data;
          if(response.code==400){
            console.log(response.message)
          } else {
            this.filterApplications(data)
          }
        }
      )
  }

  filterApplications(data){
    this.wishList = data.filter(
      application=>{
        return application.type == "wish"
      }
    )
    this.applyList = data.filter(
      application=>{
        return application.type == "apply"
      }
    )
    this.historyList = data.filter(
      application=>{
        return application.type == "history"
      }
    )
  }

  onDeleteApplication(schoolId){
    console.log(schoolId)
    let data = {
      school : schoolId
    }
    this.usersService.deleteApplication(data)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.getApplications();
          }
        }
      )
  }

}
