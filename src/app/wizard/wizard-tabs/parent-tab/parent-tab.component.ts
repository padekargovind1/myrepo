import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {WizardService} from "../../../services/wizard.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-parent-tab',
  templateUrl: './parent-tab.component.html',
  styleUrls: ['./parent-tab.component.css']
})
export class ParentTabComponent implements OnInit {
  wizardForm : FormGroup;
  parents : any;
  onMobile:boolean=false;
  lienparents = [];
 
  @Input() userData;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb : FormBuilder,
              private wizardService : WizardService,
              private bookingService : BookingService) { }

  ngOnInit() {
    this.buildForm();
    this.getLienParent();
 
  }

  buildForm(){
    this.wizardForm=this.fb.group({
      parents : this.fb.array([this.createParent()])
    })
    setTimeout(()=>{
      this.patchValue()
    }, 1000)
  }
  //Create a form group of parent
  createParent(){
    return this.fb.group({
      lienParent : ['', Validators.required],
      titre : ['', Validators.required],
      nom : ['',Validators.required],
      prenom : ['', Validators.required],
      job : ['', Validators.required],
      email : ['', Validators.compose([CustomValidators.email, Validators.required])],
      portable : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      horaireJoignable : ['', Validators.required]
    })
  }
  //Patch value from userData
  patchValue(){
    var IsAdress = (this.userData.address!==undefined && this.userData.address!=null) ? true : false;
    for (let i = 0; i<this.wizardForm.controls['parents']['controls'].length; i++){
      if(this.userData.parents!==undefined && this.userData.parents!=null && this.userData.parents.length!=0){
        IsAdress = (this.userData.parents[i].address!==undefined && this.userData.parents[i].address!=null) ? true : false;
        this.wizardForm.controls['parents']['controls'][i].patchValue({
          lienParent : this.userData.parents[i].relationship,
          titre : this.userData.parents[i].gender,
          nom : this.userData.parents[i].lastName,
          prenom : this.userData.parents[i].firstName,
          email : this.userData.parents[i].email,
          portable : this.userData.parents[i].phoneNumber,
          adresse : IsAdress ? this.userData.parents[i].address.address1 : "",
          codepostal : IsAdress ? this.userData.parents[i].address.postCode : "",
          ville : IsAdress ? this.userData.parents[i].address.city : "",
          pays : IsAdress ? this.userData.parents[i].address.country : "",
          job : this.userData.parents[i].profession,
          horaireJoignable: this.userData.parents[i].availability
        })
      }
    }
  }
  //Add a parent
  onAddParent(){
    this.parents = this.wizardForm.get('parents') as FormArray;
    this.parents.push(this.createParent());
  }
  //Remove a parent
  onRemoveParent(index){
    this.parents = this.wizardForm.get('parents') as FormArray;
    this.parents.removeAt(index, 1);
  }
  //Save and go to the next tab
  nextTab(nb : number){
    if(this.wizardForm.valid){
      //console.log("123");
      this.wizardService.saveData('parentData', this.wizardForm.value.parents);
      this.tabChange.emit(nb);
    }else {
      // if(this.lienParent)
      //   this.lienParentErrorMsg= false;
      // else
      //   this.lienParentErrorMsg= true;
 
      // if(this.wizardForm.value.parents.lienParent === undefined || this.wizardForm.value.parents.lienParent === 'undefined' || this.wizardForm.value.parents[0].lienParent===undefined || this.wizardForm.value.parents[0].lienParent === '')
      //   this.lienParentErrorMsg= true;
      // else
      //   this.lienParentErrorMsg= false;

      // if(this.wizardForm.value.parents.titre === undefined || this.wizardForm.value.parents.titre === 'undefined' || this.wizardForm.value.parents[0].titre===undefined || this.wizardForm.value.parents[0].titre === '')
      //   this.titreErrorMsg= true;
      // else
      //   this.titreErrorMsg= false;

      // if(this.wizardForm.value.parents.prenom === undefined || this.wizardForm.value.parents.prenom === 'undefined' || this.wizardForm.value.parents[0].prenom===undefined || this.wizardForm.value.parents[0].prenom === '')
      //   this.prenomErrorMsg= true;
      // else
      //   this.prenomErrorMsg= false;

      // this.titreErrorMsg= this.wizardForm.value.parents[0].titre;
      // this.prenomErrorMsg= this.wizardForm.value.parents[0].prenom;
      // this.jobErrorMsg= this.wizardForm.value.parents.job;
      // this.emailErrorMsg= this.wizardForm.value.parents.email;
      // this.portableErrorMsg= this.wizardForm.value.parents.portable;
      // this.nomErrorMsg= this.wizardForm.value.parents.nom;
      // this.horaireJoignableErrorMsg= this.wizardForm.value.parents.horaireJoignable;

      this.bookingService.failSubmit();
    }
  }

  getLienParent(){
    this.lienparents=this.wizardService.getLienParent();
  }
}