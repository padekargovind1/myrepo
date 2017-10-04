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

  storeBookingPrice(price){
    localStorage.setItem('bookingPrice', price);
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
    localStorage.setItem("bookingPackageDesc", data[2]) //package price
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
    const packagePrice = localStorage.getItem('bookingPrice')
    const data = [packageNumber, packageTitle, packageDesc, packageindex, packagePrice]

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
    localStorage.removeItem('bookingPrice')
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

  // cleanAppointmentData(){
  //   this.userData = null;
  //   this.newAppointment=null;
  //   this.packageIndex=null;
  //   this.forBooking=false;
  // }

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

  chequePayment(){
    let appointmentData = this.getBookingData();
    console.log(appointmentData);
    let frenchDate : string = appointmentData[0].toString().substr(8, 2)+'/'+appointmentData[0].toString().substr(5, 2)+'/'+appointmentData[0].toString().substr(0, 4)
    let date : string = frenchDate+' de '+appointmentData[1]+' à '+appointmentData[2];
    let adviser : string = appointmentData[4]+' '+appointmentData[3];
    var self = this;
    swal({
      title: "Paiement Par Cheque",
      text: 'Votre rendez-vous :\nAvec '+adviser+' Le '+date+'\nAu CIDE 84 Boulevard Saint-Michel 75006 Paris\nTél. : 01 53 10 33 20\n\nMerci d’adresser votre réglement\nAu CIDE, 84 Boulevard Saint-Michel 75006 Paris\nen précisant au dos du Paiement\n' +
      'chèque :\nRendez-vous du '+date,
      type: 'success',
      confirmButtonColor: '#70AD47',
      cancelButtonClass: 'btn-cancel-wizard',
      confirmButtonText: "J'accepte",
      cancelButtonText: 'Je décline',
      showCancelButton: true,
      reverseButtons: true
    }).then(function (event) {
      console.log(event);
      if(event==true){
        if(self.getBookingPackage()[4]=='80'){
          self.successSubmit();
        }else{
          self.router.navigate(['/wizard']);
        }
      }
    }, function (dismiss){
      //catch promise
    })

  }
}
