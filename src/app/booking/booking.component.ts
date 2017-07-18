import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
declare var $:any;
declare var fullCalendar: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {
  tokenLog = "";
  bookingData = ["", "", ""];
  appointmentPackage : any;
  adviserList:any;
  adviserFreeTime:any;
  adviserData:any;
  bookingDate="";

  constructor(private bookingService : BookingService,
              private route : Router,
              private usersService: UsersService,
              private authService : AuthService) { }

  ngOnInit() {
    this.tokenLog=this.authService.getToken()
    if(this.tokenLog==""){
      alert("Vous devez être connecté afin de prendre un rendez-vous.");
      this.route.navigate(['/login']);
    } else {
      this.checkBooking();
    }
  }
  checkBooking(){
    this.getBookingData();
    if(this.bookingData[0]==""){
      this.route.navigate(['/conseil']);
    }
    this.getAppointmentPackage();
  }

  getBookingData(){
    this.bookingData = this.bookingService.getBookingData();
    console.log(this.bookingData);
  }

  getAppointmentPackage(){
    this.usersService.getAppointmentsPackage()
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(response);
          if(response.code==400 || response.code==401){
            console.log(response.message);
          } else {
            this.appointmentPackage=data;
            this.getListAdviser();
          }
        }
      )
  }

  getListAdviser(){
    this.usersService.getAppointmentsAdviserList(this.appointmentPackage[0].id)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          // if(response.code==400){
          //   console.log(response.message);
          // } else {
          //   this.adviserList = data;
          //   for(let adviser of this.adviserList){
          //     this.getAdviserFreeTime(adviser.id);
          //     this.getAdviserFreeTime(adviser.id);
          //   }
          // }
        }
      )
  }

  getAdviserFreeTime(adviserId){
    this.usersService.getAdviserFreeTime(adviserId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code=400){
            console.log(response.message);
          } else {
            this.adviserFreeTime.push(data);
          }
        }
      )
  }

  getAdviserData(adviserId){
    this.usersService.getAdviserData(adviserId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code=400){
            console.log(response.message);
          } else {
            this.adviserData.push(data);
          }
        }
      )
  }

  onCancelAppointment(){
    this.route.navigate(['/conseil']);
  }

  onConfirmAppointment(){
    this.route.navigate(['/wizard']);
  }

  ngAfterViewInit() {
  	(<any> $('#calendar')).fullCalendar({
      locale:'fr', 
      eventClick: function(calEvent) {
        $('#appointment').modal('show');
      }, 
      events:this.getData()
    });
  }

  getData(){
    let data = [
      {
				title: 'Disponible',
				start: '2017-07-01 10:00:00',
				end: '2017-07-01 11:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-07-07 08:00:00',
				end: '2017-07-07 09:00:00'
			}
    ]
    return data;
  }

}
