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

  onCancelAppointment(){
    this.route.navigate(['/conseil']);
  }

  onConfirmAppointment(){
    let data = [];
    console.log(this.bookingDate)
    for(let appointData of this.bookingDate){
      data.push(appointData);
    }
    // console.log(data)
    this.bookingService.storeBookingData(data);
    console.log(this.bookingData)
    if(this.bookingData[3]!=0){
      this.route.navigate(['/wizard']);
    } else {
      if(this.authService.isUserLoggedIn()){
        this.applyEntretien()
      } else {
        const newAppointment = {
          adviser : this.appointmentData[0],
          from: this.appointmentData[2],
          to:this.appointmentData[3]
        }
        const packageIndex = this.bookingData[3];
        this.bookingService.storeFastAppointment(newAppointment, packageIndex);
        this.route.navigate(['/login']);
      }
    }
  }

  applyEntretien(){
    console.log(this.appointmentData);
    const newAppointment = {
      adviser : this.appointmentData[0],
      from: this.appointmentData[2],
      to:this.appointmentData[3]
    }
    this.usersService.postCreateNewAppointment(newAppointment, this.appointmentPackage[this.bookingData[3]]._id)
      .subscribe(
        response=>{
          console.log(response);
          if(response.code!=400){
            this.successSubmit();
          }
        }
      )
  }

  successSubmit(){
    let appointmentData = this.bookingService.getBookingData();
    let frenchDate : string = appointmentData[0].substr(8, 2)+'/'+appointmentData[0].substr(5, 2)+'/'+appointmentData[0].substr(0, 4)
    let type : string = appointmentData[7]+' ' +appointmentData[8];
    let date : string = frenchDate+' de '+appointmentData[1]+' à '+appointmentData[2];
    let adviser : string = appointmentData[4]+' '+appointmentData[3];
    swal({
      title: "Merci d'avoir choisi CIDE",
      text: 'Votre Rendez-vous pour un(e) '+type+' est bien confirmé le '+date+' avec notre conseiller d\'orientation '+adviser+'. \nUn mail de confirmation vient de vous être adressé. A bientôt!',
      type: 'success',
      confirmButtonText: "J'AI COMPRIS"
    })
    this.route.navigate(['/'])
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

  onCheckbox(adviserId){
    let index = this.adviserIdList.indexOf(adviserId);
    if(index==-1){
      this.adviserIdList.push(adviserId);
    } else {
      this.adviserIdList.splice(index, 1);
    }
    console.log(this.adviserIdList);
    this.adviserToDisplay = this.bookingService.filterBooking(this.calendarData, this.adviserIdList)
    console.log(this.adviserToDisplay);
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
		header: {
		left: 'title',
		center: '',
		right: 'today agendaDay,agendaWeek,month prev,next'
	},
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
        console.log(self.bookingDate);
      }, 
      events:this.adviserToDisplay
    });
  }

  onSelectAll(){
    console.log($('.checkbox').attr('class'))
    this.allChecked=true;
    this.adviserToDisplay = this.calendarData;
    for(let adviser of this.adviserList){
      this.adviserIdList.push(adviser._id)
    }
    console.log(this.adviserIdList, this.allChecked);
    this.refreshCalendar();
  }

  onUnselectAll(){
    this.adviserToDisplay = [];
    this.adviserIdList=[];
    this.refreshCalendar();
    this.allChecked=false;
  }

}