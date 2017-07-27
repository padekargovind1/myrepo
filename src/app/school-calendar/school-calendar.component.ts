import { Component, OnInit } from '@angular/core';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-school-calendar',
  templateUrl: './school-calendar.component.html',
  styleUrls: ['./school-calendar.component.scss']
})
export class SchoolCalendarComponent implements OnInit {

  events : any;

  constructor(private publicService : PublicService) { 
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

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/json/event.json`);

  //  req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //  req.send();
  // }

}
