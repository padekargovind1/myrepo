import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: [
    'school-detail.component.scss',
  ],
  providers: [SchoolService]
})
export class SchoolDetailComponent implements OnInit {

schoolData;
schoolID;
private sub: any;

  constructor(private schoolService: SchoolService, private route: ActivatedRoute) {
this.route.params.subscribe(params => {
      this.schoolID = params['id'];
    });

   }

  ngOnInit() {


      

   this.schoolService.getSchoolDetailByID(this.schoolID).then((data) => {
            //this.totalSchools=data.total;
            this.schoolData = data;
            console.log(this.schoolData);
        });
  }
}