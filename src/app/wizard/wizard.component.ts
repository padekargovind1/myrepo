import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  tokenLog : string ="";
  bookingData=["","",""];
  wizardForm : FormGroup;
  lienparents = [ "Père", 
                "Mère", 
                "Oncle", 
                "Tante", 
                "Grand-Père", 
                "Grand-Mère", 
                "Tuteur", 
                "Tutrice"];
  langues = ["Français", "Anglais", "Espagnol", "Allemand", "Italien"];
  primarySchool = ["CP", "CE1", "CE2", "CM1", "CM2"];
  secondarySchool = ["6ème", "5ème", "4ème", "3ème", "2nde", "1er", "Terminal"]


  constructor(private usersService: UsersService,
              private authService : AuthService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder) { 
                this.buildForm();
              }

  ngOnInit() {
    this.tokenLog=this.authService.getToken();
    if(this.tokenLog==""){
      alert("Vous devez être connecté afin de prendre un rendez-vous.");
      this.route.navigate(['/login']);
    } else {
      this.bookingData = this.bookingService.getBookingData();
      console.log(this.bookingData);
      if(this.bookingData[0]==""){
        this.route.navigate(['/conseil']);
      }
    }
  }

  buildForm(){
    this.wizardForm = this.fb.group({
      lienParent : ['', Validators.required],
      title : ['', Validators.required],
      lastName : ['', Validators.required],
      firstName : ['', Validators.required],
      job : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, CustomValidators.email])],
      tel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      horaireJoingnable : ['', Validators.required],
      childLastName : ['', Validators.required],
      childFirstName : ['', Validators.required],
      childAge : ['', Validators.required],
      childTitle : ['', Validators.required],
      childMel : ['', Validators.compose([Validators.required, CustomValidators.email])],
      childTel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      childAddr : ['', Validators.required],
      childPostalCode : ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      childCity : ['', Validators.required],
      childBirthDay : ['', Validators.required],
      childBirthPlace : ['', Validators.required],
      childSisBroTitle : [''],
      childSisBroAge:[''],
      childSisBroStudy:[''],
      schoolName:['', Validators.required],
      schoolCity : ['', Validators.required],
      schoolClasse : ['', Validators.required],
      schoolOption : ['', Validators.required],
      schoolLv1 : ['', Validators.required],
      schoolLv2 : [''],
      schoolLv3 : [''],
      schoolHelp : [false],
      schoolHelpSubject : [''],
      bestSubject : ['', Validators.required],
      weakSubject : ['', Validators.required],
      interestJob : ['', Validators.required],
      interestAge : ['', Validators.required],
      yourInterest : ['', Validators.required],
      practiceInterest : ['', Validators.required],
      primarySchoolName : [''],
      primarySchoolRepeat : [''],
      causeOfRepeatPrimary : [''],
      secondarySchoolName : [''],
      secondarySchoolRepeat : [''],
      causeOfRepeatSecondary : [''],
      reasonDiagnostic : ['', Validators.required],
      note :['', Validators.required],
    })
  }

  onSubmit(){
    console.log(this.wizardForm.value);
  }

}
