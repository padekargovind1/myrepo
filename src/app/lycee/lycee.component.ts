import { Component, OnInit } from '@angular/core';

import { PublicService } from '../services/public.service'; 

@Component({
  selector: 'app-lycee',
  templateUrl: './lycee.component.html',
  styleUrls: ['./lycee.component.scss']
})
export class LyceeComponent implements OnInit {

  schoolList : any;

  constructor(private publicService : PublicService) { }

  ngOnInit() {
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          console.log(response);
          this.schoolList = response.data;
        }
      )
  }

}
