import { Component, OnInit } from '@angular/core';

import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  schoolList : any;

  constructor(private publicService : PublicService) { }

  ngOnInit() {
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          // console.log(response);
          this.schoolList = response.data;
          // console.log(this.schoolList);
        }
      )
  }

}
