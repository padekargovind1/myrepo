import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { MdDialogConfig, MdDialog } from '@angular/material';
import { ConseilPopupComponent } from './conseil-popup/conseil-popup.component';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {

  config: MdDialogConfig;

  constructor(private router : Router,
              private route : ActivatedRoute,
              private bookingService : BookingService,
              public dialog:MdDialog) { }

  ngOnInit() {
  }

  navigateToBooking(time, concernPeople, price, index){
    this.bookingService.storeBookingPackage([time, concernPeople, price, index]);
    console.log("Navigate to booking");
    this.router.navigate(['booking']);
  }

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

  openInfoDialog(nb : number){
    this.makeProfile(nb);
    let dialogref = this.dialog.open(ConseilPopupComponent,this.config);
  }

  openMobileInfoDialog(nb : number){
    this.makeProfile(nb);
    let dialogref = this.dialog.open(ConseilPopupComponent,this.config);
  }

}
