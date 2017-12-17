import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../services/users.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
declare var $:any;
declare var fullCalendar: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {
  tokenLog :boolean = false;
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

  // Check if user have selected a package from conseil page
  // If not -> sweet alert and nagivate on conseil page
  // Else get the booking Data and the appointment package
  ngOnInit() {
    if(!this.bookingService.haveBookingPackage()){
      swal({
        title: 'Attention',
        text: 'Vous devez sélectionner le type du rendez-vous avant de pouvoir choisir un conseiller',
        type: 'warning',
        confirmButtonText: "J'ai compris"
      })
      this.route.navigate(['/conseil']);
    } else {
      this.getBookingData();
      this.getAppointmentPackage();
    }
  }

  //Call service to get the booking data
  getBookingData(){
    this.bookingData = this.bookingService.getBookingPackage();
    console.log(this.bookingData);
  }

  // Get the appointment package data from API
  //If it success then get the adviser list
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

  //Call API to get the package's adviser
  getListAdviser(){
    console.log(this.bookingData)
    this.usersService.getAppointmentsAdviserList(this.appointmentPackage[this.bookingData[3]]._id)
      .subscribe(
        (response)=>{
          let data = response.data;
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

  onConfirmAppointment(){
    let data = [];
    console.log(this.bookingDate)
    for(let appointData of this.bookingDate){
      data.push(appointData);
    }
    // console.log(data)
    this.bookingService.storeBookingData(data);
    this.bookingService.storeBookingPrice(this.appointmentPackage[this.bookingData[3]].cost); // Store the package price
    console.log("bookingData===>>",this.bookingData);
    const newAppointment = {
      adviser : this.appointmentData[0],
      from: this.appointmentData[2],
      to:this.appointmentData[3]
    }
    const packageIndex = this.bookingData[3];
    this.bookingService.storeFastAppointment(newAppointment, packageIndex);
    this.route.navigate(['/payment']);
  }

  // applyEntretien(){
  //   console.log(this.appointmentData);
  //   const newAppointment = {
  //     adviser : this.appointmentData[0],
  //     from: this.appointmentData[2],
  //     to:this.appointmentData[3]
  //   }
  //   this.usersService.postCreateNewAppointment(newAppointment, this.appointmentPackage[this.bookingData[3]]._id)
  //     .subscribe(
  //       response=>{
  //         console.log(response);
  //         if(response.code!=400){
  //           this.bookingService.successSubmit();
  //         }
  //       }
  //     )
  // }

  // Init the calendar after the view is init
  ngAfterViewInit() {
    this.initCalendar();
  }

  // Store the usefull data in appointmentData when user click on an available date of one adviser
  storeData(adviserId, start, end){
    // console.log(adviserId, start, end)
    const date = start.substr(0, 10);
    const debut = start.substr(11, 5);
    const fin = end.substr(11, 5);
    console.log(date, debut, fin)
    this.appointmentData = [adviserId, date, debut, fin, this.appointmentPackageId];
  }

  // Init the available date of advisers with time, name, id etc...
  initDataAppoint(){
    console.log("Package list : ", this.appointmentPackage,
      "Adviser List : ", this.adviserList);
    for(let adviser of this.adviserList){
      for(let day of adviser.calendar){
        let debut = day.from[0].substr(11, 2);
        let fin = day.to[0].substr(11, 2);
        // console.log(debut, fin, day.from[0].substr(0, 10))
        this.calendarData.push({
          title:'h - Disponible',
          start: day.from[0].substr(0, 10)+' '+debut+':00:00',
          end: day.to[0].substr(0, 10)+' '+ fin + ':00:00',
          adviserId: adviser._id,
          adviserName : adviser.firstName+ ' ' +adviser.lastName,
          adviserGender : adviser.gender,
          adviserImage : adviser.photo
        });
      }
    }
    return this.calendarData;
  }

  // method called after user click on one of the adviser's checkbox
  // filter the calendar data and the adviser id list to show only the adviser who are checked
  // refreshing the calendar date
  onCheckbox(adviserId){
    let index = this.adviserIdList.indexOf(adviserId);
    console.log("index",index);
    if(index==-1){
      this.adviserIdList.push(adviserId);
    } else {
      this.adviserIdList.splice(index, 1);
    }
    console.log("adviserIdList:- ",this.adviserIdList.length);
    this.adviserToDisplay = this.bookingService.filterBooking(this.calendarData, this.adviserIdList)
    console.log("adviserToDisplay:- ",this.adviserToDisplay);
    console.log("--->",this.adviserToDisplay.length, this.calendarData.length);
    this.refreshCalendar();
  }

  //Refreshing full calendar data
  refreshCalendar(){
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.adviserToDisplay);
    $('#calendar').fullCalendar('rerenderEvents');
  }

  //Init the full calendar 2
  // Init the function when user click on one of the date in the calendar
  initCalendar(){
    console.log(this.adviserToDisplay);
    const self = this;
  	(<any> $('#calendar')).fullCalendar({
		header: {
		left: 'title',
		center: '',
		right: 'today agendaDay,agendaWeek,month prev,next'
	},
      eventClick: function(calEvent) {
        console.log(calEvent);
        var check = new Date(calEvent.start._i);
        var today = new Date();
        if(check < today)
        {
          // Previous Day. show message if you want otherwise do nothing.
          // So it will be unselectable
        }
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
        console.log(self.bookingDate);
      },
      events:this.adviserToDisplay
    });
  }

  // Called when user click on 'Je selectionne tout' in the page
  // Refreshing the calendar data
  onSelectAll(){
    console.log($('.checkbox').attr('class'))
    this.allChecked=true;
    this.adviserToDisplay = this.calendarData;
	  this.adviserIdList=[];
    for(let adviser of this.adviserList){
      this.adviserIdList.push(adviser._id)
    }
    console.log(this.adviserIdList, this.allChecked);
    this.refreshCalendar();
  }

  // Called when user click on 'Je déselectionne tout' in the page
  // Refreshing the calendar data
  onUnselectAll(){
    this.adviserToDisplay = [];
    this.adviserIdList=[];
    this.allChecked=true;
	  setTimeout(()=>{
		this.allChecked=false;
	},10);
    this.refreshCalendar();
  }

}
