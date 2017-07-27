import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../services/school.service';

declare var jquery:any;
declare var $ :any;
import 'slick-carousel/slick/slick';
@Component({
  selector: 'app-linguistic',
  templateUrl: './linguistic.component.html',
  styleUrls: ['./linguistic.component.css']
})
export class LinguisticComponent implements OnInit, AfterViewInit {

  listTrips : any;
  listTripsFiltered : any;

  constructor(private schoolService : SchoolService,
              private location : Location) { 
    this.getTrips();
  }

  ngOnInit() {
  }

  ngAfterViewInit() { 
    let test = '.school-carousel1';
      (<any> $(test)).slick();
        
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
            this.listTripsFiltered = data;
            for(let i=0; i<this.listTrips.length; i++){
              this.listTrips[i].class = "school-carousel"+i;
              this.listTripsFiltered[i].class = "school-carousel"+i;
            }
            console.log(this.listTripsFiltered);
          }
        }
      )
  }

  onDestinationClick(event, index){
    console.log(event)
    let filterValue = event.srcElement.value;
    if(filterValue!=''){
      if(index=='0'){
        this.listTripsFiltered = this.listTrips.filter(
          trip =>{
            return filterValue == trip.destination
          }
        )
      } else if(index=='1') {
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return filterValue == trip.periode
          }
        )
      } else if(index=='2'){
        this.listTripsFiltered = this.listTrips.filter(
          trip =>{
            return filterValue == trip.language
          }
        )
      } else if(index=='3'){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return filterValue > trip.minAge && filterValue < trip.maxAge
          }
        )
      } else if(index=='4'){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return filterValue = trip.linguistic
          }
        )
      } else if(index=='5' && event.srcElement.checked){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return trip.place.apartement
          }
        )
      } else if(index=='6' && event.srcElement.checked){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return trip.place.common
          }
        )
      } else if(index=='7' && event.srcElement.checked){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return trip.place.family
          }
        )
      } else if(index=='8' && event.srcElement.checked){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return trip.place.residence
          }
        )
      } else if(index=='9'){
        this.listTripsFiltered = this.listTrips.filter(
          trip=>{
            return filterValue == trip.tripType
          }
        )
      } else {
        this.listTripsFiltered = this.listTrips
      }
    }
  }

}
