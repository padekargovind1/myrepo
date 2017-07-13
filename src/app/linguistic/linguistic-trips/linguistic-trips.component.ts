import { Component, OnInit, Input } from '@angular/core';

import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-linguistic-trips',
  templateUrl: './linguistic-trips.component.html',
  styleUrls: ['./linguistic-trips.component.css']
})
export class LinguisticTripsComponent implements OnInit {
  @Input() tripData : any;

  constructor(private schoolService : SchoolService) { 
    setTimeout(
      ()=>{
        console.log(this.tripData);
      }, 500
    )
    
  }

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
