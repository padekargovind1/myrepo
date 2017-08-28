import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { BrochureService } from '../../services/brochure.service';

@Component({
  selector: 'app-brochpopup',
  templateUrl: './brochpopup.component.html',
  styleUrls: ['./brochpopup.component.scss']
})
export class BrochpopupComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  brochureForm : FormGroup;
  
  constructor(public dialogref:MdDialogRef<BrochpopupComponent>,
              private fb : FormBuilder,
              private usersService : UsersService,
              private brochureService : BrochureService) { 
                this.buildFormGroup();
                this.getProfile();
              }

  ngOnInit() {
    
  }

  buildFormGroup(){
    this.brochureForm = this.fb.group({
      lienParent : [''],
      title : [''],
      lastName : [''],
      firstName : [''],
      mel : ['', Validators.compose([Validators.required, CustomValidators.email])],
      tel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      childLastName : ['', Validators.required],
      childFirstName : ['', Validators.required],
      childTitle : [''],
      classe : ['', Validators.required],
      copy : [false],
      status : [''],
      niveauActuel : [''],
      niveauConcern : [''],
      info : ['']
    });
  }

  getProfile(){
    if(this.usersService.getToken()!=""){
      this.usersService.getProfile()
        .subscribe(
          (response)=>{
            let data = response.data;
            // console.log(data);
            if(response.code==400){
              console.log(response.message);
            } else {
              this.patchValue(response.data[0]);
            }
          }
        )
    }
  }

  patchValue(profile){
    console.log(profile)
    this.brochureForm.patchValue({
      lienParent : profile.parents[0].relationship,
      title : profile.parents[0].gender,
      lastName : profile.parents[0].lastName,
      firstName : profile.parents[0].firstName,
      mel : profile.parents[0].email,
      tel : profile.parents[0].phoneNumber,
      childLastName : profile.lastName,
      childFirstName : profile.firstName,
      childTitle : profile.gender,
      etablissement : profile.academicHistories[0].schoolName,
      city : profile.academicHistories[0].schoolName
    })
  }

  onCancel(){
    this.brochureService.storeResponse("cancel")
    this.dialogref.close();
  }

  onSubmit(){
    this.brochureService.storeResponse("submit")
    this.dialogref.close();
  }

  toSecondTab(){
    this.tabGroup.selectedIndex=1;
  }

}
