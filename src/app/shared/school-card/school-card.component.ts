import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../services/users.service';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})
export class SchoolCardComponent implements OnInit {

  @Input() SchoolData : any;
  brochureData={brochure : ""}

  constructor(private router : Router,
              private usersService : UsersService,
              private publicService : PublicService) { }

  ngOnInit() {
    // console.log(this.SchoolData, this.SchoolData._id);
    this.getSchoolBrochureById();
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

  getSchoolBrochureById(){
    this.publicService.getBrochurebyId(this.SchoolData.cycles[0].cycle._id)
      .subscribe(
        response=>{
          console.log(response.data)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.brochureData=response.data;
          }
        }
      )
  }
  
}
