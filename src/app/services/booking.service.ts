import { Injectable } from '@angular/core';

@Injectable()
export class BookingService {
  bookingData = ["", "", "", ""]
  adviserData = ["", "", "", "", ""];

  constructor() { }

  storeBookingData(data){
    console.log(data);
    localStorage.setItem("bookingDataDay", data[0])
    localStorage.setItem("bookingDataStart", data[1])
    localStorage.setItem("bookingDataEnd", data[2])
    localStorage.setItem("bookingDataAdvName", data[3])
    localStorage.setItem("bookingDataAdvGender", data[4])
    localStorage.setItem("bookingDataAdvId", data[5])
    localStorage.setItem("bookingDataAdvPhoto", data[6])
    localStorage.setItem("bookingDataAvailableId", data[7])
  }

  getBookingData(){
    const day = localStorage.getItem("bookingDataDay")
    const start = localStorage.getItem("bookingDataStart")
    const end = localStorage.getItem("bookingDataEnd")
    const advName = localStorage.getItem("bookingDataAdvName")
    const advGender = localStorage.getItem("bookingDataAdvGender")
    const advId = localStorage.getItem("bookingDataAdvId")
    const advPhoto = localStorage.getItem("bookingDataAdvPhoto")
    const availableId = localStorage.getItem("bookingDataAvailableId")
    const packageTitle = localStorage.getItem("bookingPackageTitle")
    const packageDesc = localStorage.getItem("bookingPackageDesc")
    const data = [day, start, end, advName, advGender, advId, advPhoto, availableId, packageTitle, packageDesc]

    return data;
  }

  storeBookingPackage(data){
    console.log(data);
    localStorage.setItem("bookingPackageNumber", data[0])
    localStorage.setItem("bookingPackageTitle", data[1])
    localStorage.setItem("bookingPackageDesc", data[2])
    localStorage.setItem("bookingPackageIndex", data[3])
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
    localStorage.removeItem("bookingDataAvailableId")
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

}
