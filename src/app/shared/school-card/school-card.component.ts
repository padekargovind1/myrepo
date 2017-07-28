import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})
export class SchoolCardComponent implements OnInit {

  @Input() SchoolData : any;

  constructor(private router : Router,
              private usersService : UsersService) { }

  ngOnInit() {
    // console.log(this.SchoolData, this.SchoolData._id);
  }

  onSchoolDetail(){
    console.log("Click on school detail")
    this.router.navigate(['etablissement', this.SchoolData._id]);
  }
   
  applyToSchool(){
    this.router.navigate(['applyto', this.SchoolData._id]);
  }

  saveInWish(){
    const data = {
      type : "wish",
      school : this.SchoolData._id
    }
    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  }
  
}
