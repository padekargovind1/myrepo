import { Component, OnInit } from '@angular/core';

import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-linguistic-trips',
  templateUrl: './linguistic-trips.component.html',
  styleUrls: ['./linguistic-trips.component.css']
})
export class LinguisticTripsComponent implements OnInit {

  constructor(private schoolService : SchoolService) { }

  ngOnInit() {
    // this.schoolService.getTrips()
    // .subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // );
    // this.schoolService.getLinguistics()
    // .subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // )
    // this.schoolService.getLanguage()
    // .subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // )
    // this.schoolService.getStatistics()
    // .subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // )
  }

}
