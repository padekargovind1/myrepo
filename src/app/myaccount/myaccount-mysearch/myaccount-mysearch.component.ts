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
  sortWish : boolean = false;
  sortApply : boolean = false;
  sortHistory : boolean = false;
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
    console.log(this.wishList);
  }

  onDeleteApplication(schoolId, applyId){
    let data = {
      'school' : schoolId,
      'id' : applyId
    }
    console.log(data)
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

  sortWishArray(){
    this.sortWish = !this.sortWish;
    this.wishList = this.sortArray(this.wishList, this.sortWish)
  }

  sortApplyArray(){
    this.sortApply = !this.sortApply;
    this.applyList = this.sortArray(this.applyList, this.sortApply)
  }

  sortHistoryArray(){
    this.sortHistory = !this.sortHistory;
    this.historyList = this.sortArray(this.historyList, this.sortHistory)
  }

  sortArray(arrayToSort : any, async : boolean){
    if(async){
      arrayToSort.sort(
        (a : any, b : any)=>{
          if(a.createdAt.substr(0, 19)<b.createdAt.substr(0, 19)) return -1;
          if(a.createdAt.substr(0, 19)>b.createdAt.substr(0, 19)) return 1;
          return 0
      });
    } else {
      arrayToSort.sort(
        (a : any, b : any)=>{
          if(a.createdAt.substr(0, 19)>b.createdAt.substr(0, 19)) return -1;
          if(a.createdAt.substr(0, 19)<b.createdAt.substr(0, 19)) return 1;
          return 0
      });
    }
    return arrayToSort
  }

}
