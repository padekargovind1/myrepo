import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
import { PublicService } from '../services/public.service';
=======
declare var $:any;

import '../../assets/js/main.js';
>>>>>>> a5f2c0a111a9a75e08743b8273ab4a437ac2dba7

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
