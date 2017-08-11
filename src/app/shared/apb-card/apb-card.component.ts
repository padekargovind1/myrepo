import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../services/users.service';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-apb-card',
  templateUrl: './apb-card.component.html',
  styleUrls: ['./apb-card.component.scss']
})
export class ApbCardComponent implements OnInit {

  @Input() SchoolData : any;
  brochureData={brochure : ""}

  constructor(private router : Router,
              private usersService : UsersService,
              private publicService : PublicService) { }

  ngOnInit() {
    // setTimeout(()=>{
    //   // console.log(this.SchoolData);
    //   this.getSchoolBrochureById();
    // }, 500)
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
      schools : [{school : this.SchoolData._id, class:'EE'}]
    }
    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  }

  getSchoolBrochureById(){
    // console.log(this.SchoolData);
    this.publicService.getBrochurebyId(this.SchoolData._id, this.SchoolData.cycles[0]._id)
      .subscribe(
        response=>{
          // console.log(response.data)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.brochureData=response.data;
          }
        }
      )
  }

}
