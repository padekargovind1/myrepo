import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})
export class SchoolCardComponent implements OnInit {

  @Input() SchoolData : any;

  constructor(private router : Router) { }

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
  
}
