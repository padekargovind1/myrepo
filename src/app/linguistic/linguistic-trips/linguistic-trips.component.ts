import { Component, OnInit, AfterViewInit } from '@angular/core';

import { SchoolService } from '../../services/school.service';


declare var $:any;

// import '../../../assets/js/main.js';

@Component({
  selector: 'app-linguistic-trips',
  templateUrl: './linguistic-trips.component.html',
  styleUrls: ['./linguistic-trips.component.css']
})
export class LinguisticTripsComponent implements OnInit, AfterViewInit {

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


    ngAfterViewInit() { 

        // console.log('test');

        (<any> $('.school-carousel')).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: true,
            variableWidth: true
        });
    }

}
