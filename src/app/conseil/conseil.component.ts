import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { MdDialog } from '@angular/material';
import { ConseilPopupComponent } from './conseil-popup/conseil-popup.component';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {

  config: any;

  constructor(private router : Router,
              //private route : ActivatedRoute,
              private bookingService : BookingService,
              public dialog:MdDialog) { }

  ngOnInit() {
  }

  // Navigating to the booking page after select a package
  navigateToBooking(time, concernPeople, title, index){
    this.bookingService.storeBookingPackage([time, concernPeople, title, index]);
    console.log("Navigate to booking");
    this.router.navigate(['booking']);
  }

  // Make the config for the md dialog
  makeProfile(nb : number){
    this.config= {
      data:{
        conseilDesc : nb
      },
      disableClose: false,
      width: '',
      height: '',
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }


  // Open the info dialog
  openInfoDialog(nb : number){
    this.makeProfile(nb);
    this.dialog.open(ConseilPopupComponent,this.config);
  }

  openMobileInfoDialog(nb : number){
    this.makeProfile(nb);
    this.dialog.open(ConseilPopupComponent,this.config);
  }

}
