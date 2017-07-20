import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {



  constructor(private router : Router,
              private route : ActivatedRoute,
              private bookingService : BookingService) { }

  ngOnInit() {
  }

  navigateToBooking(time, concernPeople, price, index){
    let bookData = [time, concernPeople, price, index];
    console.log("Navigate to booking");
    // this.bookingService.storeBookingData([time, concernPeople, price, index]);
    this.router.navigate(['booking', bookData]);
  }

}
