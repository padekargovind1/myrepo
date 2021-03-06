import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-school-help-tab',
  templateUrl: './school-help-tab.component.html',
  styleUrls: ['./school-help-tab.component.css']
})
export class SchoolHelpTabComponent implements OnInit {
  wizardForm : FormGroup;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();
  checked:boolean=false;
  subjectSchool = []

  constructor(private fb : FormBuilder,
              private wizardService : WizardService,
              private bookingService : BookingService) { }

  ngOnInit() {
    this.buildForm();
    this.getSubjectSchool();
  }
  //Build the form
  buildForm(){
    this.wizardForm=this.fb.group({
      schoolHelp : [false],
      schoolHelpSubject : ['']
    })
  }
  //Save and go to next tab
  nextTab(nb:number){
    if(this.wizardForm.valid){
      this.wizardService.saveData('helpData', this.wizardForm.value);
      this.tabChange.emit(nb);
    }else {
      this.bookingService.failSubmit();
    }
  }
  onChecked(){
    var check = this.wizardForm.controls['schoolHelp'].value;
    //console.log(check);
    this.checked = !check;
  }
  getSubjectSchool(){
    this.subjectSchool=this.wizardService.getSubjectSchool();
  }
}
