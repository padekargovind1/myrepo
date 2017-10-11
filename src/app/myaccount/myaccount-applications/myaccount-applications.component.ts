import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import {date} from "ng2-validation/dist/date";

//const self = this;
@Component({
  selector: 'app-myaccount-applications',
  templateUrl: './myaccount-applications.component.html',
  styleUrls: ['./myaccount-applications.component.scss']
})
export class MyaccountApplicationsComponent implements OnInit {
  apply = [];
  applyAsc: boolean = false;
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    this.getApplications();
  }

  // get Application list
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

  // Separate the application list into 3 category
  filterApplications(data){
    this.apply = data.filter(
      application=>{
        return application.type == "apply"
      }
    )
  }

  // Delete an applycation
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

  // Sort the application
  custom_sort_asc(a, b) {
	return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }
  custom_sort_desc(a, b) {
	return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  // After click on sort the list
  onSortClick(sortType){
	switch(sortType){
		case "apply" : // sort apply
			if(this.applyAsc){
				this.apply = this.apply.sort(this.custom_sort_desc);
				this.applyAsc=false;
			}
			else{
				this.apply = this.apply.sort(this.custom_sort_asc);
				this.applyAsc=true;
			}
			break;
	}
  }

}
