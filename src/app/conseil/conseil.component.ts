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

  makeProfile(nb : number, screenWidth : string, screenHeight : string){
    this.config= {
      data:{
        conseilDesc : nb
      },
      disableClose: false,
      width: screenWidth,
      height: screenHeight,
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

  openInfoDialog(nb : number){
    let screenWidth : string = (window.screen.width/3).toString()+'px';
    let screenHeight : string = (window.screen.height/4).toString()+'px';
    this.makeProfile(nb, screenWidth, screenHeight);
    let dialogref = this.dialog.open(ConseilPopupComponent,this.config);
  }

  openMobileInfoDialog(nb : number){
    let screenWidth : string = ((window.screen.width/5)*4).toString()+'px';
    let screenHeight : string = (window.screen.height/2).toString()+'px';
    this.makeProfile(nb, screenWidth, screenHeight);
    let dialogref = this.dialog.open(ConseilPopupComponent,this.config);
  }

}
