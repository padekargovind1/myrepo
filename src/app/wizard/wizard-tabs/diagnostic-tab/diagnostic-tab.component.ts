import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";
import {CustomValidators} from "ng2-validation";

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
              private wizardService : WizardService) { }

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
    this.tabChange.emit(nb);
  }
  onSubmit(){

  }
}
