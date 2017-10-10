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
  selector: 'app-myaccount-myfavourites',
  templateUrl: './myaccount-myfavourites.component.html',
  styleUrls: ['./myaccount-myfavourites.component.scss']
})
export class MyaccountMyfavouritesComponent implements OnInit {
  wishList = [];
  wishAsc: boolean = false;

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
    this.wishList = data.filter(
      application=>{
        return application.type == "wish"
      }
    )
    console.log(this.wishList);
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
		case "wish" : // sort wish
			if(this.wishAsc){
				this.wishList = this.wishList.sort(this.custom_sort_desc);
				this.wishAsc=false;
			}
			else{
				this.wishList = this.wishList.sort(this.custom_sort_asc);
				this.wishAsc=true;
			}
			break;
	}
  }

}
