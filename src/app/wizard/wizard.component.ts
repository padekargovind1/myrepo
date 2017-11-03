import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { DateAdapter } from '@angular/material';
import swal from "sweetalert2";
import {HelperService} from "../services/helper.service";
import {WizardService} from "../services/wizard.service";
@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers:[DatePipe]
})
export class WizardComponent implements OnInit {

  userData : any;
  appointmentData=[];
  adviserData: any;
  activeTabIndex = 0;
  parents : any;
  canDisplayWizard : boolean = false;
  @ViewChild('tabGroup') tabGroup;
  onMobile:boolean=false;
  nbTab : number=0;

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private bookingService : BookingService,
              private route : Router,
			        private dateAdapter: DateAdapter<Date>,
              public helperService : HelperService,
              public wizardService : WizardService,
              private cdr: ChangeDetectorRef
              ) {
    this.dateAdapter.setLocale('nl');
    this.initAdviserData();
    if(this.authService.isUserLoggedIn()){
      this.getUserProfile();
    }else{
      this.canDisplayWizard=true;
    }
  }

  ngOnInit() {
    if(!this.bookingService.haveBookingData()){
      swal({
        title: 'Attention',
        text: "Vous devez choisir un conseiller avant de remplir le formulaire",
        type: 'warning',
        confirmButtonText: "J'ai compris"
      })
      this.route.navigate(['/booking']);
    } else {
      this.appointmentData = this.bookingService.getBookingData();
      console.log(this.appointmentData);
    }
    this.loadScript('assets/js/select2.min.js');
    this.runScript();
    var self = this;
    swal({
        text: "<font color='#fff'>Afin de préparer votre entretien dans les meilleures conditions, merci de bien vouloir compléter ce questionnaire 48h avant le rendez-vous..</font>",
		type: 'question',
        showCancelButton: true,
        width: 550,
        confirmButtonColor: '#70AD47',
        cancelButtonClass: 'btn-cancel-wizard',
        confirmButtonClass: 'btn-confirm-wizard',
        confirmButtonText: "Je complète maintenant",
        cancelButtonText: 'Je complète plus tard',
        background: '#4472C4',
        reverseButtons: true
    }).then(function () {
      //user click on Je complete maintenant
    }, function (dismiss) {
      //user click on Je complete plus tard -> create a new Appointment
      console.log(dismiss)
      if(dismiss=='cancel'){
        self.wizardService.getPackageById(self.appointmentData[9]);
      }
    })
  }

   loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
  runScript(){
		var checkMobile = this.helperService.detectmob();
		if (checkMobile) {
		  console.log(checkMobile)
		  this.onMobile=true;
		  $('.select-all-advisor').on('click', function() {
			  $(this).hide();
			  $('.deselect-all-advisor').show();
		  });
		  $('.deselect-all-advisor').on('click', function() {
			  $(this).hide();
			  $('.select-all-advisor').show();
		  });
		}else {
		  this.onMobile=false;
		}
	}

  /*
  Remove this method if the api work
  */
  initAdviserData(){
    this.adviserData={
      title : "",
      firstName : "",
      lastName : "",
      photo : ""
    }
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.userData=data[0];
            this.canDisplayWizard=true;
            this.cdr.detectChanges();
          }
        }
      )
  }

  nextTab(nb){
    this.tabGroup.selectedIndex=nb;
    this.nbTab=nb;
    this.cdr.detectChanges();
  }
}
