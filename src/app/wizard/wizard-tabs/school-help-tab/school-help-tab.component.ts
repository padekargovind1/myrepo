import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";

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

  constructor(private fb : FormBuilder,
              private wizardService : WizardService) { }

  ngOnInit() {
    this.buildForm();
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
    this.tabChange.emit(nb);
  }
  onChecked(){

  }
}
