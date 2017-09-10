import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PublicService } from '../services/public.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.scss'],
  providers:[DatePipe]
})
export class SchoolCalendarComponent implements OnInit {

  events = [];
  eventsToDisplay = [];
  searchForm : FormGroup;
  minDate = new Date();
  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  constructor(private publicService : PublicService,
              private route : Router,
              private fb : FormBuilder,
              public datepipe: DatePipe) { 
    // this.fetch((data) => {
    //   this.events = data;
    // });
  }

  ngOnInit() {
    this.getEvents();
    this.buildForm();
  }

  getEvents(){
    this.publicService.getEvent()
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.events=response.data;
          this.eventsToDisplay=this.events;
        }
      )
  }

  buildForm(){
    this.searchForm = this.fb.group({
      date : [''],
      period : ['']
    })
  }

  searchSubmit(){
    console.log("test1", this.searchForm.value);
    let date='';
    let period=this.searchForm.value.period;
    console.log(this.minDate, this.datepipe.transform(this.minDate, 'EEE-yyyy-MM-dd'));
    if(this.searchForm.value.date!=""){
      date = this.datepipe.transform(this.searchForm.value.date, 'yyyy-MM-dd'); 
      console.log(date)
    } else if(period !=""){
      period = period=="today" || period=="week" ? this.datepipe.transform(this.minDate, 'yyyy-MM-dd') : period = this.datepipe.transform(this.minDate, 'yyyy-MM');
    }
    this.eventsToDisplay = this.events.filter(
      event=>{
        // console.log(event)
        if(date!="" && date>=event.fromDate.substr(0, 10) && date<=event.toDate.substr(0, 10)){
          return true;
        } else if (this.searchForm.value.period!="" ){
          if((this.searchForm.value.period=="today" || this.searchForm.value.period=="week") && period==event.fromDate.substr(0, 10)){
            return true;
          } else if(this.searchForm.value.period=="month" && period==event.fromDate.substr(0, 7)){
            return true;
          }
        } else if(this.searchForm.value.date=='' && this.searchForm.value.period==''){
          return true;
        }
        return false;
    })
    console.log(this.eventsToDisplay)
  }

  cleanSearch(){
    this.buildForm();
    this.eventsToDisplay=this.events;
    console.log(this.searchForm.value)
  }

}
