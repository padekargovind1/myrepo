import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-subjects-tab',
  templateUrl: './subjects-tab.component.html',
  styleUrls: ['./subjects-tab.component.css']
})
export class SubjectsTabComponent implements OnInit {
  wizardForm : FormGroup;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();
  tooltipText : string = "Sélectionner plusieurs matières en appuyant sur CTRL + click gauche de la souris"
  subjectList1:any;
  subjectList2:any;
  subjectList3:any;
  tempsubjectList1=[];
  tempsubjectList2=[];
  tempsubjectList3=[];
  
  constructor(private fb : FormBuilder,
              public wizardService : WizardService,
              private bookingService : BookingService ) { }

  ngOnInit() {
    this.buildForm()
    this.subjectList1 = this.wizardService.getSubjectList();
    this.subjectList2 = this.wizardService.getSubjectList();
    this.subjectList3 = this.wizardService.getSubjectList();
    console.log("====>",this.subjectList1);
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
    if(this.wizardForm.valid){
      console.log(this.wizardForm.value,"if");
      this.wizardService.saveData('subjectData', this.wizardForm.value);
      this.tabChange.emit(nb);
    }else {
      this.bookingService.failSubmit();
    }
  }

  prevTab(nb:number){
      this.wizardService.saveData('subjectData', this.wizardForm.value);
      this.tabChange.emit(nb);
  }

  //Patch Value

  patchValue(){
    this.wizardForm.patchValue({
      bestSubject : this.userData.attractionToSubjects,
      weakSubject : this.userData.weakAtSubjects
    })
  }

  subjectListData3(subject){
    if(this.tempsubjectList3.indexOf(subject)<0)
    this.tempsubjectList3.push(subject);
    else
    {
      var index = this.tempsubjectList3.indexOf(subject);
      if (index > -1) {
         this.tempsubjectList3.splice(index, 1);
      }
    }

    var array1 = this.subjectList3;
    var array2 = this.tempsubjectList3;
    var array3 = array1.filter(function(obj) { return array2.indexOf(obj) == -1; });

    this.subjectList1=array3;

  }

    subjectListData1(subject){
      if(this.tempsubjectList1.indexOf(subject)<0)
      this.tempsubjectList1.push(subject);
      else
      {
        var index = this.tempsubjectList1.indexOf(subject);
        if (index > -1) {
          this.tempsubjectList1.splice(index, 1);
        }
      }

      var array1 = this.subjectList1;
      var array2 = this.tempsubjectList1;
      var array3 = array1.filter(function(obj) { return array2.indexOf(obj) == -1; });

      this.subjectList2=array3;

  }
    subjectListData2(subject){
    if(this.tempsubjectList2.indexOf(subject)<0)
    this.tempsubjectList2.push(subject);
    else
    {
      var index = this.tempsubjectList2.indexOf(subject);
      if (index > -1) {
         this.tempsubjectList2.splice(index, 1);
      }
    }

    var array1 = this.subjectList2;
    var array2 = this.tempsubjectList2;
    var array3 = array1.filter(function(obj) { return array2.indexOf(obj) == -1; });

    //this.subjectList3=array3;

  }
}
