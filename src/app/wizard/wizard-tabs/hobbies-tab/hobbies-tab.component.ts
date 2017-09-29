import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";

@Component({
  selector: 'app-hobbies-tab',
  templateUrl: './hobbies-tab.component.html',
  styleUrls: ['./hobbies-tab.component.css']
})
export class HobbiesTabComponent implements OnInit {
  wizardForm : FormGroup;
  metiers : any
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb : FormBuilder,
              private wizardService : WizardService) { }

  ngOnInit() {
    this.buildForm()
  }
  //Build the form
  buildForm(){
    this.wizardForm=this.fb.group({
      job : this.fb.array([this.createJob()]),
      yourInterest : ['', Validators.required],
      practiceInterest : ['']
    })
    setTimeout(()=>{
      this.patchValue()
    }, 1000)
  }
  //save and go to next tab
  nextTab(nb:number){
    this.tabChange.emit(nb);
  }
  //Create a Job form
  createJob(){
    return this.fb.group({
      interestJob : ['', Validators.required],
      interestAge : ['', Validators.required]
    })
  }
  //Add a new job form
  onAddJob(){
    this.metiers = this.wizardForm.get('job') as FormArray;
    this.metiers.push(this.createJob());
  }
  //Remove a job form
  onRemoveJob(index){
    this.metiers = this.wizardForm.get('job') as FormArray;
    this.metiers.removeAt(index, 1);
  }
  //PatchValue from userData
  patchValue(){
    var hobbies = (this.userData.hobbies!==undefined && this.userData.hobbies!=null) ? true : false;
    var interest = (this.userData.interest!==undefined && this.userData.interest!=null) ? true : false;
    this.wizardForm.patchValue({
      yourInterest : hobbies ? this.userData.hobbies : '',
      practiceInterest : interest ? this.userData.interest : '',
    })
    for (let i = 0; i<this.wizardForm.controls['job']['controls'].length; i++){
      if(this.userData.jobs!==undefined && this.userData.jobs!=null && this.userData.jobs.length!=0){
        this.wizardForm.controls['job']['controls'][i].patchValue({
          interestJob : this.userData.jobs[i].profession,
          interestAge : this.userData.jobs[i].age
        })
      }
    }
  }

}
