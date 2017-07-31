import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
export class LinguisticComponent implements OnInit, AfterViewInit {

  listTrips : any;
  listTripsFiltered =[];
  languageList: any;
  linguisticList: any;
  tripFilter = {};
  nbSlick = 0;

  constructor(private schoolService : SchoolService,
              private location : Location,
              private publicService : PublicService,
              private usersService : UsersService) { 
    
  }

  ngOnInit() {
    this.getTrips();
    this.getLanguage();
    this.getLinguistic();
  }

  ngAfterViewInit() { 
    this.initCarousel()
      
    }

  initCarousel(){
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
            for(let i=0; i<this.listTripsFiltered.length; i++){
              this.listTripsFiltered[i].class = "school-carousel"+this.nbSlick;
              this.nbSlick+=1;
            }
            console.log(this.listTripsFiltered);
          }
        }
      )
  }

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

  postTrip(){
    console.log(this.tripFilter);
    this.usersService.postTrip(this.tripFilter)
      .subscribe(
        response=>{
          let data = response.data;
          // console.log(data)
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

  onDestinationClick(event, type){
    // console.log(event)
    let filterValue = event.srcElement.value;
    console.log(filterValue, this.tripFilter[type]);
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
    } else {
      if(filterValue==""){
        delete this.tripFilter[type]
      }else {
        this.tripFilter[type]=filterValue;
      }
    }
    this.postTrip();
  }

}
