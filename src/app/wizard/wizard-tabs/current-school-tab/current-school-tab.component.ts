import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";
import {HelperService} from "../../../services/helper.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-current-school-tab',
  templateUrl: './current-school-tab.component.html',
  styleUrls: ['./current-school-tab.component.css']
})
export class CurrentSchoolTabComponent implements OnInit {
  wizardForm : FormGroup;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();
  langues=[];

  constructor(private fb : FormBuilder,
              private wizardService : WizardService,
              public helperService : HelperService,
              private bookingService : BookingService) { }

  ngOnInit() {
    this.buildForm();
    this.getLanguage();
  }
  //build the form
  buildForm(){
    this.wizardForm=this.fb.group({
      schoolName:['', Validators.required],
      schoolCity : ['', Validators.required],
      schoolClasse : ['', Validators.required],
      schoolOption : [''],
      schoolLv1 : [''],
      schoolLv2: [''],
      schoolLv3: ['']
    })
    setTimeout(()=>{
      this.patchValue()
    }, 1000)
  }
  //Save and go to next tab
  nextTab(nb:number){
    if(this.wizardForm.valid){
      this.wizardService.saveData('currentSchoolData', this.wizardForm.value);
      this.tabChange.emit(nb);
    }else {
      this.bookingService.failSubmit();
    }
  }
  //Patch value from userData
  patchValue(){
    var haveAcademic = (this.userData.academicHistories.length!=0) ? true : false;
    var haveLv1 = false;
    var haveLv2 = false;
    if(haveAcademic){
      this.wizardForm.patchValue({
        //Current Institution
        schoolName : this.userData.academicHistories[0].schoolName=="A compléter" ? "" : this.userData.academicHistories[0].schoolName,
        schoolCity : this.userData.academicHistories[0].city=="A compléter" ? "" : this.userData.academicHistories[0].city,
        schoolClasse : this.userData.academicHistories[0].class=="A compléter" ? "" :this.userData.academicHistories[0].class,
        schoolOption : this.userData.academicHistories[0].classType=="A compléter" ? "" :this.userData.academicHistories[0].classType,
        schoolLv1 : this.userData.academicHistories[0].languages[0]=="A compléter" ? "" : this.userData.academicHistories[0].languages[0],
        schoolLv2 : haveLv1 ? this.userData.academicHistories[0].languages[1] : "",
        schoolLv3 : haveLv2 ? this.userData.academicHistories[0].languages[2] : "",
      })
    }
  }
  getLanguage(){
    this.langues=this.wizardService.getLangues();
  }

}
