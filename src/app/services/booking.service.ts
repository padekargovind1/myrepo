import { Injectable } from '@angular/core';

@Injectable()
export class BookingService {
  bookingData = ["", "", ""]

  constructor() { }

  storeBookingData(data){
    this.bookingData=data;
  }

  getBookingData(){
    console.log(this.bookingData);
    return this.bookingData;
  }
}
