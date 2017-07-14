<<<<<<< HEAD
import { Component, OnInit, AfterViewInit } from '@angular/core';
=======
import { Component, OnInit, Input } from '@angular/core';
>>>>>>> 22d066a2a529834c1e6faa5da8ef8850af536cf5

import { SchoolService } from '../../services/school.service';


declare var $:any;

// import '../../../assets/js/main.js';

@Component({
  selector: 'app-linguistic-trips',
  templateUrl: './linguistic-trips.component.html',
  styleUrls: ['./linguistic-trips.component.css']
})
<<<<<<< HEAD
export class LinguisticTripsComponent implements OnInit, AfterViewInit {
=======
export class LinguisticTripsComponent implements OnInit {
  @Input() tripData : any;
>>>>>>> 22d066a2a529834c1e6faa5da8ef8850af536cf5

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
