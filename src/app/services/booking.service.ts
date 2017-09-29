import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import swal from 'sweetalert2';

@Injectable()
export class BookingService {
  //bookingData = ["", "", "", ""]
  //adviserData = ["", "", "", "", ""];
  forBooking : boolean = false;
  forFastBooking : boolean = false;
  newAppointment : any = null;
  packageIndex : any = '';
  userData : any = null;

  constructor(private usersService : UsersService,
              private router : Router) { }

  storeBookingData(data){
    console.log(data);
    localStorage.setItem("bookingDataDay", data[0])
    localStorage.setItem("bookingDataStart", data[1])
    localStorage.setItem("bookingDataEnd", data[2])
    localStorage.setItem("bookingDataAdvName", data[3])
    localStorage.setItem("bookingDataAdvGender", data[4])
    localStorage.setItem("bookingDataAdvId", data[5])
    localStorage.setItem("bookingDataAdvPhoto", data[6])
  }

  haveBookingData(){
    return !!localStorage.getItem('bookingDataDay')
  }

  getBookingData(){
    const day = localStorage.getItem("bookingDataDay")
    const start = localStorage.getItem("bookingDataStart")
    const end = localStorage.getItem("bookingDataEnd")
    const advName = localStorage.getItem("bookingDataAdvName")
    const advGender = localStorage.getItem("bookingDataAdvGender")
    const advId = localStorage.getItem("bookingDataAdvId")
    const advPhoto = localStorage.getItem("bookingDataAdvPhoto")
    const packageTitle = localStorage.getItem("bookingPackageTitle")
    const packageDesc = localStorage.getItem("bookingPackageDesc")
    const packageNumber = localStorage.getItem("bookingPackageIndex")
    const data = [day, start, end, advName, advGender, advId,
      advPhoto, packageTitle, packageDesc, packageNumber]

    return data;
  }

  storeBookingPackage(data){
    console.log(data);
    localStorage.setItem("bookingPackageNumber", data[0])
    localStorage.setItem("bookingPackageTitle", data[1])
    localStorage.setItem("bookingPackageDesc", data[2])
    localStorage.setItem("bookingPackageIndex", data[3])
  }

  haveBookingPackage(){
    return !!localStorage.getItem('bookingPackageNumber')
  }

  getBookingPackage(){
    const packageNumber = localStorage.getItem("bookingPackageNumber")
    const packageTitle = localStorage.getItem("bookingPackageTitle")
    const packageDesc = localStorage.getItem("bookingPackageDesc")
    const packageindex = localStorage.getItem("bookingPackageIndex")
    const data = [packageNumber, packageTitle, packageDesc, packageindex]

    return data;
  }

  cleanBooking(){
    localStorage.removeItem("bookingDataDay")
    localStorage.removeItem("bookingDataStart")
    localStorage.removeItem("bookingDataEnd")
    localStorage.removeItem("bookingDataAdvName")
    localStorage.removeItem("bookingDataAdvGender")
    localStorage.removeItem("bookingDataAdvId")
    localStorage.removeItem("bookingDataAdvPhoto")
    localStorage.removeItem("bookingPackageNumber")
    localStorage.removeItem("bookingPackageTitle")
    localStorage.removeItem("bookingPackageDesc")
    localStorage.removeItem("bookingPackageIndex")
  }

  filterBooking(dataToFilter, listAdvisers){
    let dataFiltered=[];
    // console.log(dataToFilter, listAdvisers)
    for(let adviser of listAdvisers){
      for(let data of dataToFilter){
        if(adviser==data.adviserId){
          dataFiltered.push(data);
        }
      }
    }
    // console.log(dataFiltered);
    return dataFiltered;
  }

  storeAppointmentData(newAppointment, packageIndex, userData){
    console.log(newAppointment, packageIndex, userData)
    this.userData = userData;
    this.newAppointment=newAppointment;
    this.packageIndex=packageIndex;
    this.forBooking=true;
  }

  storeFastAppointment(newAppointment, packageIndex){
    this.newAppointment=newAppointment;
    this.packageIndex=packageIndex;
    this.forFastBooking=true;
  }

  isForBooking(){
    return this.forBooking==true;
  }

  isForFastBooking(){
    return this.forFastBooking==true;
  }

  isSkippedWizard(){
    return this.packageIndex==0;
  }

  getUserData(){
    return this.userData;
  }

  getPackageIndex(){
    return this.packageIndex;
  }

  getNewAppointment(){
    return this.newAppointment;
  }

  // cleanAppointmentData(){
  //   this.userData = null;
  //   this.newAppointment=null;
  //   this.packageIndex=null;
  //   this.forBooking=false;
  // }

  makeAppointment(){
    this.usersService.getAppointmentsPackage()
      .subscribe(
        response=>{
          console.log(response);
          if(response.code!=400){
            let packageId = response.data[this.getPackageIndex()]._id;
            this.postCreateNewAppointment(packageId);
            if(this.forBooking){
              this.updateProfile();
            }
          }
        }
      )
  }

  postCreateNewAppointment(packageId){
    console.log(packageId)
    this.usersService.postCreateNewAppointment(this.getNewAppointment(), packageId)
      .subscribe(
        response=>{
          console.log(response);
          if(response.code==400){
            console.log(response.message);
          } else {
            console.log('Appointement register');
            if(this.forFastBooking){
              this.successSubmit()
              this.router.navigate(['/']);
            }
          }
        }
      )
  }

  updateProfile(){
    console.log(this.getUserData())
    this.usersService.putProfile(this.getUserData())
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.successSubmit();
            this.cleanBooking();
          }
        }
      )
  }

  successSubmit(){
    let appointmentData = this.getBookingData();
    console.log(appointmentData);
    let frenchDate : string = appointmentData[0].toString().substr(8, 2)+'/'+appointmentData[0].toString().substr(5, 2)+'/'+appointmentData[0].toString().substr(0, 4)
    // let type : string = appointmentData[7]+' ' +appointmentData[8];
    let date : string = frenchDate+' de '+appointmentData[1]+' à '+appointmentData[2];
    let adviser : string = appointmentData[4]+' '+appointmentData[3];
    swal({
      title: "Merci d'avoir choisi CIDE",
      text: 'Votre Rendez-vous est bien confirmé \nLe '+date+' \nAvec '+adviser+'. \n\nUn mail de confirmation vient de vous être adressé. \n\nA bientôt!',
      type: 'success',
      confirmButtonText: "J'AI COMPRIS"
    })
    this.router.navigate(['/'])
  }

  failSubmit(){
    swal({
      title: "Attention",
      text: 'Veuillez remplir tout le formulaire. Les champs avec un astérix (*) sont obligatoires',
      type: 'warning',
      confirmButtonText: "J'AI COMPRIS"
    })
  }
}
