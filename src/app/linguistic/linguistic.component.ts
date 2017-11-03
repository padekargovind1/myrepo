import { Component, OnInit } from '@angular/core';
//import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SchoolService } from '../services/school.service';
import { PublicService }from '../services/public.service';
import { UsersService } from '../services/users.service';

declare var jquery:any;
declare var $ :any;
import 'slick-carousel/slick/slick';
@Component({
  selector: 'app-linguistic',
  templateUrl: './linguistic.component.html',
  styleUrls: ['./linguistic.component.css']
})
export class LinguisticComponent implements OnInit{

  listTrips : any;
  listTripsFiltered =[];
  languageList: any;
  linguisticList: any;
  tripFilter = {};
  nbSlick = 0;

  constructor(private schoolService : SchoolService,
              //private location : Location,
              private router : Router,
              private publicService : PublicService,
              private usersService : UsersService) {

  }

  // get the different data from API
  // Trips data; Language List and Linguistic list
  ngOnInit() {
    this.router.navigate(['/under-construction']);
    this.getTrips();
    this.getLanguage();
    this.getLinguistic();
  }

  // Get trips from API
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
            for(let i=0; i<this.listTripsFiltered.length; i++){
              this.listTripsFiltered[i].class = "school-carousel"+this.nbSlick;
              this.nbSlick+=1;
            }
            console.log(this.listTripsFiltered);
          }
        }
      )
  }

  // Get language list from API
  getLanguage(){
      this.publicService.getLanguage()
        .subscribe(
          response=>{
            let data = response.data
            if(response.code ==400){
              console.log(response.message)
            } else {
              this.languageList=data;
              console.log(data);
            }
          }
        )
    }

    // Get linguistic trips data from API
  getLinguistic(){
    this.publicService.getLinguistics()
      .subscribe(
        response=>{
          console.log(response)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.linguisticList = response.data;
            console.log(this.linguisticList)
          }
        }
      )
  }

  // Post to API to get the trips filtered
  postTrip(){
    console.log(this.tripFilter);
    this.usersService.postTrip(this.tripFilter)
      .subscribe(
        response=>{
          let data = response.data;
          console.log(response)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.listTripsFiltered=[]
            this.listTripsFiltered=data;
            console.log(this.listTripsFiltered);
            for(let i=0; i<this.listTripsFiltered.length; i++){
              this.listTripsFiltered[i].class = "school-carousel"+this.nbSlick;
              this.nbSlick+=1;
            }
          }
        }
      )
  }

  // Called after click on a search option
  onDestinationClick(event, type){
    // console.log(event)
    let filterValue = event.srcElement.value;
    console.log(filterValue, this.tripFilter[type]);
    // If checkbox for "hebergement"
    if(type=="place"){
      if(typeof this.tripFilter[type]=="undefined"){
        // this.tripFilter[type]=filterValue;
        // this.tripFilter[type][filterValue]=true;
        this.tripFilter[type]={}
        console.log(this.tripFilter)
        if(filterValue=="apartment"){
          this.tripFilter[type].apartment=true;
        } else if (filterValue=="common"){
          this.tripFilter[type].common=true;
        } else if (filterValue=="family"){
          this.tripFilter[type].family=true;
        } else{
          this.tripFilter[type].residence=true;
        }
        console.log(this.tripFilter)
      } else {
        // this.tripFilter[type][filterValue]=!this.tripFilter[type][filterValue]
        delete this.tripFilter[type][filterValue];
        console.log(this.tripFilter[type].apartement, this.tripFilter[type].common,
          this.tripFilter[type].family, this.tripFilter[type].residence)
        if(typeof this.tripFilter[type].apartement == "undefined" &&
            typeof this.tripFilter[type].common == "undefined" &&
            typeof this.tripFilter[type].family == "undefined" &&
            typeof this.tripFilter[type].residence == "undefined"){
          delete this.tripFilter[type];
        }
      }
    } else { // Else other search options
      if(filterValue==""){
        delete this.tripFilter[type]
      }else {
        this.tripFilter[type]=filterValue;
      }
    }
    this.postTrip();
  }

}
