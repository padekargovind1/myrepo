import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $:any;
declare var fullCalendar: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  	(<any> $('#calendar')).fullCalendar();
  }

}
