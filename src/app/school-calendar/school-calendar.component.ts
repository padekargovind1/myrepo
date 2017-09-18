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
  schoolsOptions = null;

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
    let data = {
      school : '',
      data : ''
    }
    this.publicService.getEvent(data)
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
      eventName : [''],
      date : [null],
      period : ['']
    })
  }

  searchSubmit(){
    //wait for API
  }

  cleanSearch(){
    this.buildForm();
    this.eventsToDisplay=this.events;
    console.log(this.searchForm.value)
  }

  filterSchool(event){
    // console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
      this.getSchoolFilter(filter)
    }else {
      this.schoolsOptions=null;
    }
  }

  getSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutocompleteSchool(data)
      .subscribe(
        (response)=>{
          let data = response.data;
          // console.log(data);
          this.schoolsOptions=data
        }
      )
  }

  onSelectDate(){
    console.log(this.searchForm.value.date);
  }

  onToday(){
    //wait API
  }

  onWeek(){
    //wait API
  }

  onMonth(){
    //wait API
  }

  onNextMonth(){
    //wait API
  }

}
