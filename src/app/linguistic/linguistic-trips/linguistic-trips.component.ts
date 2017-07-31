import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { SchoolService } from '../../services/school.service';

declare var jquery:any;
declare var $ :any;
// import '../../../assets/js/main.js';

@Component({
  selector: 'app-linguistic-trips',
  templateUrl: './linguistic-trips.component.html',
  styleUrls: ['./linguistic-trips.component.css']
})
export class LinguisticTripsComponent implements OnInit, AfterViewInit {
  @Input() tripData;
  constructor(private schoolService : SchoolService) { 
    // setTimeout(()=>{
    //   console.log(this.tripData);  
    // }, 1000);
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

    ngAfterViewInit() { 

      // console.log('test');
      (<any> $('.'+this.tripData.class)).slick();
        
    }

}
