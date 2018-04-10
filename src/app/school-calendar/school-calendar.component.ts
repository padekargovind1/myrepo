import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PublicService } from '../services/public.service';
import { FormBuilder, FormGroup } from "@angular/forms";
//import { Router } from '@angular/router';

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
  //weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  schoolsOptions = null;
  dataToSend = {
    data : '',
    school : ''
  }
  buttonsBool : [boolean] = [false, true, false, false]

  constructor(private publicService : PublicService,
              //private route : Router,
              private fb : FormBuilder,
              //public datepipe: DatePipe
              ) {
    // this.fetch((data) => {
    //   this.events = data;
    // });
  }

  ngOnInit() {
    this.getEvents();
    this.buildForm();
  }

  getEvents(){
    console.log(this.dataToSend)
    this.publicService.getEvent(this.dataToSend)
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
      date : [''],
      period : ['']
    })
  }

  clickOnSchool(schoolId){
    // console.log(schoolId)
    this.dataToSend.school=schoolId;
  }

  searchSubmit(){
    //wait for API
    console.log("searchSubmit ....");
    this.getEvents();
  }

  cleanSearch(){
    this.dataToSend.data='';
    this.dataToSend.school='';
    this.buttonsBool=[false, false, false, false];
    if(this.dataToSend['date']!== undefined){
      delete this.dataToSend['date']
    }
    this.buildForm();
    this.eventsToDisplay=this.events;
    console.log(this.searchForm.value);
    this.getEvents();
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
          console.log(data);
          this.schoolsOptions=data
        }
      )
  }

  // date change -> search events for this date
  onSelectDate(){
    console.log(this.searchForm.value.date);
    if(this.searchForm.value.date!=''){
      let date = new Date(this.searchForm.value.date);
      // console.log(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear())
      let dateToSend = date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
      this.dataToSend['date']=dateToSend;
    } else {
      delete this.dataToSend['date'];
    }
    this.getEvents()
  }

  // Select a button to filter the school events
  onSelectData(data, index){
    this.dataToSend.data=data;
    this.getEvents();
    this.buttonsBool=[false, false, false, false];
    this.buttonsBool[index]=!this.buttonsBool[index];
  }

}
