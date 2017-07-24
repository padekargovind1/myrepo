import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  tokenLog :boolean = false;;
  bookingData = [];
  appointmentPackage : any;
  appointmentPackageId ="";
  appointmentData = [];
  adviserList:any;
  adviserFreeTime:any;
  adviserData:any;
  bookingDate=[];
  public storing="";
  calendarData=[];
  calendarDataFiltered:any;
  adviserToDisplay=[];
  adviserIdList=[];
  allChecked : boolean = false;

  constructor(private bookingService : BookingService,
              private route : Router,
              private usersService: UsersService,
              private authService : AuthService,
              private router : ActivatedRoute) { }

  ngOnInit() {
    this.tokenLog=this.authService.isUserLoggedIn()
    if(!this.tokenLog){
      alert("Vous devez être connecté afin de prendre un rendez-vous.");
      this.route.navigate(['/login']);
    } else {
      this.getBookingData();
      this.getAppointmentPackage();
    }
  }

  getBookingData(){
    this.bookingData = this.bookingService.getBookingPackage();
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
    this.usersService.getAppointmentsAdviserList(this.appointmentPackage[this.bookingData[3]]._id)
      .subscribe(
        (response)=>{
          let data = response;
          console.log(data);
          if(response.code==400 || typeof data == 'undefined'){
            console.log(response.message);
          } else {
            this.adviserList = data;
            this.calendarData=this.initDataAppoint();
            // for(let adviser of this.adviserList){
            //   this.getAdviserFreeTime(adviser.id);
            // }
          }
        }
      )
  }

  // getAdviserFreeTime(adviserId){
  //   this.usersService.getAdviserFreeTime(adviserId)
  //     .subscribe(
  //       (response)=>{
  //         let data = response.data;
  //         console.log(data);
  //         if(response.code=400){
  //           console.log(response.message);
  //         } else {
  //           this.adviserFreeTime.push(data);
  //         }
  //       }
  //     )
  // }

  // getAdviserData(adviserId){
  //   this.usersService.getAdviserData(adviserId)
  //     .subscribe(
  //       (response)=>{
  //         let data = response.data;
  //         console.log(data);
  //         if(response.code=400){
  //           console.log(response.message);
  //         } else {
  //           this.adviserData.push(data);
  //         }
  //       }
  //     )
  // }

  onCancelAppointment(){
    this.route.navigate(['/conseil']);
  }

  onConfirmAppointment(){
    let data = [];
    console.log(this.bookingDate)
    for(let appointData of this.bookingDate){
      data.push(appointData);
    }
    this.bookingService.storeBookingData(data);
    this.route.navigate(['/wizard']);
  }

  ngAfterViewInit() {
    this.initCalendar();
  }

  storeData(adviserId, start, end){
    // console.log(adviserId, start, end)
    const date = start.substr(0, 10);
    const debut = start.substr(11, 5);
    const fin = end.substr(11, 5);
    console.log(date, debut, fin)
    this.appointmentData = [adviserId, date, debut, fin, this.appointmentPackageId];
  }

  initDataAppoint(){
    console.log("Package list : ", this.appointmentPackage, 
      "Adviser List : ", this.adviserList);
    for(let adviser of this.adviserList){
      for(let day of adviser.available){
        let debut = day.start.substr(11, 2);
        let fin = day.end.substr(11, 2);
        this.calendarData.push({
          title:'Disponible', 
          start: day.start.substr(0, 10)+' '+debut+':00:00',
          end: day.start.substr(0, 10)+' '+ fin + ':00:00',
          adviserId: adviser.id,
          adviserName : adviser.firstName+ ' ' +adviser.lastName,
          adviserGender : adviser.gender,
          adviserImage : adviser.image,
          availableId : day.id
        });
      }
    }
    return this.calendarData;
  }

  onCheckbox(adviserId){
    // console.log(adviserId);
    let index = this.adviserIdList.indexOf(adviserId);
    if(index==-1){
      this.adviserIdList.push(adviserId);
    } else {
      this.adviserIdList.splice(index, 1);
    }
    // console.log(this.adviserIdList);
    this.adviserToDisplay = this.bookingService.filterBooking(this.calendarData, this.adviserIdList)
    // console.log(this.adviserToDisplay);
    this.refreshCalendar();
  }

  refreshCalendar(){
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.adviserToDisplay);
    $('#calendar').fullCalendar('rerenderEvents');
  }

  initCalendar(){
    console.log(this.adviserToDisplay);
    const self = this;
  	(<any> $('#calendar')).fullCalendar({
      locale:'fr', 
      eventClick: function(calEvent) {
        console.log(calEvent);
      $('#appointment').modal('show');
        self.storeData(calEvent.adviserId, calEvent.start._i, calEvent.end._i)
        self.bookingDate[0] = calEvent.start._i.substr(0, 10)
        self.bookingDate[1] = calEvent.start._i.substr(11, 5)
        self.bookingDate[2] = calEvent.end._i.substr(11, 5)
        self.bookingDate[3] = calEvent.adviserName
        if(calEvent.adviserGender=="Male"){
          self.bookingDate[4] = "M"
        } else {
          self.bookingDate[4] = "Mme"
        }
        self.bookingDate[5] = calEvent.adviserId
        self.bookingDate[6] = calEvent.adviserImage
        self.bookingDate[7] = calEvent.availableId
      }, 
      events:this.adviserToDisplay
    });
  }

  onSelectAll(){
    console.log($('.checkbox').attr('class'))
    this.allChecked=true;
    this.adviserToDisplay = this.calendarData;
    this.refreshCalendar();
  }

  onUnselectAll(){
    this.adviserToDisplay = [];
    this.refreshCalendar();
    this.allChecked=false;
  }

}