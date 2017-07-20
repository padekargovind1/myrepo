import { Injectable } from '@angular/core';

@Injectable()
export class BookingService {
  bookingData = ["", "", "", ""]
  adviserData = ["", "", "", "", ""];

  constructor() { }

  storeBookingData(data){
    this.bookingData=data;
  }

  getBookingData(){
    console.log(this.bookingData);
    return this.bookingData;
  }
  storeAdviserData(adviserId,date, debut, fin, packageId){
    this.adviserData[0]=adviserId;
    this.adviserData[1]=date;
    this.adviserData[2]=debut;
    this.adviserData[3]=fin;
    this.adviserData[4]=packageId;
    console.log(this.adviserData);
  }

  getAdviserData(){
    return this.adviserData;
  }

  filterBooking(dataToFilter, listAdvisers){
    let dataFiltered:any;
    for(let adviser of listAdvisers){
      for(let data of dataToFilter){
        if(adviser==data.adviserId){
          dataFiltered.push(data);
        }
      }
    }
    return dataFiltered;
  }
}
