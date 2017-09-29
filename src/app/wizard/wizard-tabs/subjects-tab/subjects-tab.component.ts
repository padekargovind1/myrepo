import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";

@Component({
  selector: 'app-subjects-tab',
  templateUrl: './subjects-tab.component.html',
  styleUrls: ['./subjects-tab.component.css']
})
export class SubjectsTabComponent implements OnInit {
  wizardForm : FormGroup;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb : FormBuilder,
              public wizardService : WizardService) { }

  ngOnInit() {
    this.buildForm()
  }
  //Build the form
  buildForm(){
    this.wizardForm=this.fb.group({
      bestSubject : ['', Validators.required],
      weakSubject : ['', Validators.required],
      interestSubject : ['', Validators.required]
    })
    setTimeout(()=>{
      this.patchValue();
    }, 1000)
  }
  //save and go to next tab
  nextTab(nb:number){
    this.tabChange.emit(nb);
  }
  //Patch Value
  patchValue(){
    this.wizardForm.patchValue({
      bestSubject : this.userData.attractionToSubjects,
      weakSubject : this.userData.weakAtSubjects
    })
  }
}
