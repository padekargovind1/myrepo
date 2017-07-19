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
  bookingData = ["", "", "", ""];
  appointmentPackage : any;
  appointmentPackageId ="";
  adviserList:any;
  adviserFreeTime:any;
  adviserData:any;
  bookingDate="";
  public storing="";

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
          if(response.code==400 || response.code==401 || response.code==404){
            console.log(response.message, this.appointmentPackage);
          } else {
            this.appointmentPackage=data;
            this.appointmentPackageId=data.id;
            this.getListAdviser();
          }
        }
      )
  }

  getListAdviser(){
    this.usersService.getAppointmentsAdviserList(this.appointmentPackage[this.bookingData[3]].id)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.adviserList = data;
            for(let adviser of this.adviserList){
              this.getAdviserFreeTime(adviser.id);
            }
          }
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
    const self = this;
  	(<any> $('#calendar')).fullCalendar({
      locale:'fr', 
      eventClick: function(calEvent) {
        console.log(calEvent);
        $('#appointment').modal('show');
        self.storeData(calEvent.adviserId, calEvent.start._i, calEvent.end._i)
      }, 
      events:this.getData()
    });
  }

  storeData(adviserId, start, end){
    // console.log(adviserId, start, end)
    const date = start.substr(0, 10);
    const debut = start.substr(11, 5);
    const fin = end.substr(11, 5);
    console.log(date, debut, fin)
    this.bookingService.storeAdviserData(adviserId, date, debut, fin, this.appointmentPackageId);
  }

  getData(){
    
    let data = [];

    if(typeof this.appointmentPackage=='undefined'){
      let data = [
        {
          title: 'Disponible',
          start: '2017-07-01 10:00:00',
          end: '2017-07-01 11:00:00',
          adviserId: '123'
        },
        {
          title: 'Disponible',
          start: '2017-07-07 08:00:00',
          end: '2017-07-07 09:00:00',
          adviserId: '123'
        }
      ]
      return data;
    } else {
      for(let adviser of this.adviserList){
        for(let day of adviser.calendar){
          if(this.bookingData[0]=='1'){
            for(let i=day.hour.start; i<day.hour.start+7; i++){
              data.push({title:'Disponible', 
                        start: '2017-07-07 '+ i + ':00:00',
                        end: '2017-07-07 '+ i+1 + ':00:00',
                        adviserId: adviser.id});
            }
          } else if (this.bookingData[0]=='2') {
            for(let i=day.hour.start; i<day.hour.start+8; i+=2){
            data.push({title:'Disponible', 
                        start: '2017-07-07 '+ i + ':00:00',
                        end: '2017-07-07 '+ i+2 + ':00:00',
                        adviserId: adviser.id});
            }
          } else if (this.bookingData[0]=='3'){
            for(let i=day.hour.start; i<day.hour.start+6; i+=3){
            data.push({title:'Disponible', 
                        start: '2017-07-07 '+ i + ':00:00',
                        end: '2017-07-07 '+ i+3 + ':00:00',
                        adviserId: adviser.id});
            }
          } else {
            data.push({title:'Disponible', 
                      start: '2017-07-07 '+ day.hour.start + ':00:00',
                      end: '2017-07-07 '+ day.hour.start+7 + ':00:00',
                      adviserId: adviser.id});
          }
        }
      }
      return data
    }
  }

}
