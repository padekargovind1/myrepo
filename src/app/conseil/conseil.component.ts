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
    this.bookingService.storeBookingPackage([time, concernPeople, price, index]);
    console.log("Navigate to booking");
    this.router.navigate(['booking']);
  }

}
