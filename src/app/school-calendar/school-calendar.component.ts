import { Component, OnInit } from '@angular/core';
import { PublicService } from '../services/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.scss']
})
export class SchoolCalendarComponent implements OnInit {

  events : any;

  constructor(private publicService : PublicService,
              private route : Router) { 
    // this.fetch((data) => {
    //   this.events = data;
    // });
  }

  ngOnInit() {
    this.getEvents();
  }
  getEvents(){
    this.publicService.getEvent()
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.events=response.data;
        }
      )
  }

}
