import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-linguistic',
  templateUrl: './linguistic.component.html',
  styleUrls: ['./linguistic.component.css']
})
export class LinguisticComponent implements OnInit {

  listTrips : any;

  constructor(private schoolService : SchoolService) { 
    this.getTrips();
  }

  ngOnInit() {
  }

  getTrips(){
    this.schoolService.getTrips()
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(data.code==400){
            console.log(data.message);
          } else {
            this.listTrips = data;
            // console.log(this.listTrips);
          }
        }
      )
  }

}
