import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {WizardService} from "../../../services/wizard.service";
import { BookingService } from "../../../services/booking.service";
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-child-tab',
  templateUrl: './child-tab.component.html',
  styleUrls: ['./child-tab.component.css']
})
export class ChildTabComponent implements OnInit {
  wizardForm : FormGroup;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();
  maxDate = new Date();

  constructor(private fb : FormBuilder,
      private wizardService: WizardService,
      private dateAdapter: DateAdapter<Date>,
      private bookingService: BookingService) {
      this.dateAdapter.setLocale('nl');
  }

  ngOnInit() {
    this.buildForm();
  }
  //Build the child form
  buildForm(){
    this.wizardForm=this.fb.group({
      childLastName: ['', Validators.required],
      childFirstName : ['', Validators.required],
      childAge : ['', Validators.required],
      childTitle : ['', Validators.required],
      childBirthDay : ['', Validators.compose([CustomValidators.date, Validators.required])],
      childBirthPlace : ['', Validators.required]
    })
    setTimeout(()=>{
      this.patchValue()
    }, 1000)

  }
  //Patching value from userData
  patchValue() {
      //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	let mydate = new Date(this.userData.birthDate); 
    let dateToSend = mydate.getDate()+'-'+(monthNames[mydate.getMonth()])+'-'+mydate.getFullYear();
    this.wizardForm.patchValue({
      childLastName : this.userData.lastName=="A compléter" ? "" :this.userData.lastName,
      childFirstName : this.userData.firstName=="A compléter" ? "" :this.userData.firstName,
      childAge : this.userData.age=="A compléter" ? "" :this.userData.age,
      childTitle : this.userData.gender=="A compléter" ? "" :this.userData.gender,
      childBirthDay : dateToSend,
      childMel : this.userData.email=="A compléter" ? "" :this.userData.email,
      childTel : this.userData.mobilePhone=="A compléter" ? "" :this.userData.mobilePhone,
      childBirthPlace: (this.userData.birthPlace != null && this.userData.birthPlace != "" && this.userData.birthPlace != "A compléter") ? this.userData.birthPlace : "",
    })
  }
  //Save and go to the next tab
  nextTab(nb:number){
    if(this.wizardForm.valid){
      console.log("if");
      this.wizardService.saveData('childData', this.wizardForm.value);
      this.tabChange.emit(nb);
    }else {
      console.log("else");
     this.bookingService.failSubmit();
    }
  }
  prevTab(nb:number){

    if(this.wizardForm.valid){
     
        this.wizardService.saveData('helpData', this.wizardForm.value);
        this.tabChange.emit(nb);
      }
    else {
       this.bookingService.failSubmit();
    }
  }
}
