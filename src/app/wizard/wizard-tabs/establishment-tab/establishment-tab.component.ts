import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardService} from "../../../services/wizard.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-establishment-tab',
  templateUrl: './establishment-tab.component.html',
  styleUrls: ['./establishment-tab.component.css']
})
export class EstablishmentTabComponent implements OnInit {
  wizardForm : FormGroup;
  parents : any;
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();
  primaires : any;
  secondaires : any;
  primarySchool=[];
  secondarySchool = [];
  constructor(private fb : FormBuilder,
              private wizardService : WizardService,
              private bookingService : BookingService) { }

  ngOnInit() {
    this.buildForm();
    this.getSchoolClassList();
  }

  buildForm(){
    this.wizardForm=this.fb.group({
      primary : this.fb.array([this.createPrimaireSchool()]),
      secondary : this.fb.array([this.createSecondarySchool()])
    })
    setTimeout(()=>{
      this.patchValue()
    }, 1000)
  }
  //Create a form group of primary school
  createPrimaireSchool(){
    return this.fb.group({
      primarySchoolName : ['', Validators.required],
      primarySchoolRepeat : ['', Validators.required],
      causeOfRepeatPrimary : ['', Validators.required]
    })
  }
  //Create a form group for secondary school
  createSecondarySchool(){
    return this.fb.group({
      secondarySchoolName : ['', Validators.required],
      secondarySchoolRepeat : ['', Validators.required],
      causeOfRepeatSecondary : ['', Validators.required]
    })
  }
  //Patch value from userData
  patchValue(){
    //Primary SChool
    //for (let i = 0; i<this.wizardForm.controls['primary']['controls'].length; i++){
    //if(userData.primary!==undefined && userData.primary!=null && userData.primary.length!=0){
    //this.wizardForm.controls['primary']['controls'][i].patchValue({
    //primarySchoolName : '',//userData.primary[i].job,
    //primarySchoolRepeat : '',
    //causeOfRepeatPrimary : ''
    //})
    //}
    //}
    //Secondary SChool
    //for (let i = 0; i<this.wizardForm.controls['secondary']['controls'].length; i++){
    //if(userData.secondary!==undefined && userData.secondary!=null && userData.secondary.length!=0){
    //this.wizardForm.controls['secondary']['controls'][i].patchValue({
    //secondarySchoolName : '',//userData.secondary[i].job,
    //secondarySchoolRepeat : '',
    //causeOfRepeatSecondary : ''
    //})
    //}
    //}
  }
  //Save and go to the next tab
  nextTab(nb:number){
    if(this.wizardForm.valid){
      this.wizardService.saveData('establishmentData', this.wizardForm.value);
      this.tabChange.emit(nb);
    }else {
      this.bookingService.failSubmit();
    }
  }
  onAddPrimaire(){
    this.primaires = this.wizardForm.get('primary') as FormArray;
    this.primaires.push(this.createPrimaireSchool());
  }

  onRemovePrimaire(index){
    this.primaires = this.wizardForm.get('primary') as FormArray;
    this.primaires.removeAt(index, 1);
  }

  onAddSecondaire(){
    this.secondaires = this.wizardForm.get('secondary') as FormArray;
    this.secondaires.push(this.createSecondarySchool());
  }

  onRemoveSecondaire(index){
    this.secondaires = this.wizardForm.get('secondary') as FormArray;
    this.secondaires.removeAt(index, 1);
  }

  getSchoolClassList(){
    this.primarySchool=this.wizardService.getPrimarySchool();
    this.secondarySchool=this.wizardService.getSecondarySchool();
  }

}
