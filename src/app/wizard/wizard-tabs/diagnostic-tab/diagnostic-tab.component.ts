import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-diagnostic-tab',
  templateUrl: './diagnostic-tab.component.html',
  styleUrls: ['./diagnostic-tab.component.css']
})
export class DiagnosticTabComponent implements OnInit {
  wizardForm : FormGroup;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb : FormBuilder,
              private wizardService : WizardService,
              private bookingService : BookingService) { }

  ngOnInit() {
    this.buildForm();
  }
  //Build the child form
  buildForm(){
    this.wizardForm=this.fb.group({
      reasonDiagnostic : [''],
      note :['']
    });
  }
  //Save and go to the next tab
  nextTab(nb:number){
    if(this.wizardForm.valid){
      this.wizardService.saveData('hobbiesData', this.wizardForm.value);
      this.tabChange.emit(nb);
    }else {
      this.bookingService.failSubmit();
    }
  }
  onSubmit(){
    console.log("On Submit");
    this.wizardService.onSubmitForm();
  }
}
