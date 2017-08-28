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
  wishAsc: boolean = false;
  applyAsc: boolean = false;
  historyAsc: boolean = false;
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
    let data = {
      'school' : schoolId
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
  custom_sort_asc(a, b) {
	return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }
  custom_sort_desc(a, b) {
	return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  onSortClick(sortType){
	switch(sortType){
		case "wish" : 
			if(this.wishAsc){ 
				this.wishList = this.wishList.sort(this.custom_sort_desc); 
				this.wishAsc=false;
			} 
			else{ 
				this.wishList = this.wishList.sort(this.custom_sort_asc);				
				this.wishAsc=true;
			}
			break;
		case "apply" : 
			if(this.applyAsc){ 
				this.applyList = this.applyList.sort(this.custom_sort_desc); 
				this.applyAsc=false;
			} 
			else{ 
				this.applyList = this.applyList.sort(this.custom_sort_asc);				
				this.applyAsc=true;
			}
			break;
		case "history" : 
			if(this.historyAsc){ 
				this.historyList = this.historyList.sort(this.custom_sort_desc); 
				this.historyAsc=false;
			} 
			else{ 
				this.historyList = this.historyList.sort(this.custom_sort_asc);				
				this.historyAsc=true;
			}
			break;
	}
  }

}
