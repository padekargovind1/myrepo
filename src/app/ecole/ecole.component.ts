import { Component, OnInit } from '@angular/core';

import { PublicService } from '../services/public.service';
declare var $:any;

import '../../assets/js/main.js';

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent implements OnInit {

  schoolList : any;

  constructor(private publicService : PublicService) { }

  ngOnInit() {
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          console.log(response);
          this.schoolList=response.data;
        }
      )
  }

}
