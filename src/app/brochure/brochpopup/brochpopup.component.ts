import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { SendService } from '../../services/send.service';
import { BrochureService } from '../../services/brochure.service';
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-brochpopup',
  templateUrl: './brochpopup.component.html',
  styleUrls: ['./brochpopup.component.scss']
})
export class BrochpopupComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  public errMsgMel : any;
  public errMsgTel : any;
  public errMsgChildLastName:any;
  public errMsgChildFirstName:any;
  public errMsgFirstName:any;
  public errMsgLastName:any;

  brochureForm : FormGroup;

  constructor(public dialogref:MdDialogRef<BrochpopupComponent>,
              private fb : FormBuilder,
              private usersService : UsersService,
              private sendService : SendService,
              private brochureService : BrochureService,
              public helperService : HelperService) {
                this.buildFormGroup();
                this.getProfile();
              }

  ngOnInit() {
    if(this.sendService.getMessageStatus()!="Public")
    {
      this.brochureForm.patchValue({
        status : 'Privé'
      });
    }
    else
    {
      this.brochureForm.patchValue({
        status : 'Public'
      });
    }
  }

  // Build the form
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
      status : [''],
      niveauActuel : [''],
      niveauConcern : [''],
      info : ['']
    });
  }


  // Get user Profile
  getProfile(){
    if(this.usersService.getToken()!=""){
      this.usersService.getProfile()
        .subscribe(
          (response)=>{
            let data = response.data;
            // console.log(data);
            if(response.code==400){
              console.log(response.message);
            } else if(response.data!==undefined) {
              this.patchValue(response.data[0]);
            }
          }
        )
    }
  }

  // Patch the value if user already field his form in my-account or anywhere else
  patchValue(profile){
    console.log("profile:- ",profile);
    if(profile.parents!==undefined && profile.parents.length>0) {
      this.brochureForm.patchValue({
        lienParent : profile.parents[0].relationship === undefined ? "" : profile.parents[0].relationship,
        title : profile.parents[0].gender === undefined ? "" : profile.parents[0].gender,
        lastName : profile.parents[0].lastName === undefined ? "" : profile.parents[0].lastName,
        firstName : profile.parents[0].firstName === undefined ? "" : profile.parents[0].firstName,
        mel : profile.parents[0].email === undefined ? "" : profile.parents[0].email,
        tel : profile.parents[0].phoneNumber === undefined ? "" : profile.parents[0].phoneNumber,
        childLastName : profile.lastName,
        childFirstName : profile.firstName,
        childTitle : profile.gender,
        etablissement : profile.academicHistories[0].schoolName,
        city : profile.academicHistories[0].schoolName
      });
    }
  }

  // After click on cancel button
  onCancel(){
    this.brochureService.storeResponse("cancel")
    this.dialogref.close();
  }


  // After click on the submit button
  onSubmit(){
    console.log(this.brochureForm.value.status);
    this.sendService.storeMessageStatus(this.brochureForm.value.status);
    this.brochureService.storeResponse("submit")
    this.dialogref.close();
  }

  //After click on suivant
  toSecondTab(){
    console.log("lienParent===>",this.brochureForm.value.lienParent);
    console.log("title===>",this.brochureForm.value.title);
    console.log("lastName===>",this.brochureForm.value.lastName);
    console.log("firstName===>",this.brochureForm.value.firstName);
    console.log("mel===>",this.brochureForm.value.mel);
    console.log("tel===>",this.brochureForm.value.tel);
    console.log("childLastName===>",this.brochureForm.value.childLastName);
    console.log("childFirstName===>",this.brochureForm.value.childFirstName);
    console.log("classe===>",this.brochureForm.value.classe);
    console.log("childTitle===>",this.brochureForm.value.childTitle);
    this.errMsgMel = false;
    this.errMsgTel =  false;
    this.errMsgChildLastName =  false;
    this.errMsgChildFirstName =  false;
    this.errMsgFirstName =  false;
    this.errMsgLastName =  false;

    if(this.brochureForm.value.mel==="" || this.brochureForm.value.mel=== "undefined" || this.brochureForm.value.mel===undefined)
    {
      this.errMsgMel = true;
    }
    else{
      this.errMsgMel = false;
    }

    if(this.brochureForm.value.tel==="" || this.brochureForm.value.tel=== "undefined" || this.brochureForm.value.tel===undefined)
    {
      this.errMsgTel = true;
    }
    else{
      this.errMsgTel = false;
    }

    if(this.brochureForm.value.childLastName==="" || this.brochureForm.value.childLastName=== "undefined" || this.brochureForm.value.childLastName===undefined)
    {
      this.errMsgChildLastName = true;
    }
    else{
      this.errMsgChildLastName = false;
    }

    if(this.brochureForm.value.childFirstName==="" || this.brochureForm.value.childFirstName=== "undefined" || this.brochureForm.value.childFirstName===undefined)
    {
      this.errMsgChildFirstName = true;
    }
    else{
      this.errMsgChildFirstName = false;
    }

    if(this.brochureForm.value.firstName==="" || this.brochureForm.value.firstName=== "undefined" || this.brochureForm.value.firstName===undefined)
    {
      this.errMsgFirstName = true;
    }
    else{
      this.errMsgFirstName = false;
    }
    

    if(this.brochureForm.value.lastName==="" || this.brochureForm.value.lastName=== "undefined" || this.brochureForm.value.lastName===undefined)
    {
      this.errMsgLastName = true;
    }
    else{
      this.errMsgLastName = false;
    }
    
    if(this.errMsgMel === false && this.errMsgTel === false && this.errMsgChildLastName === false && this.errMsgChildFirstName === false && this.errMsgFirstName === false && this.errMsgLastName === false)
    {
      this.tabGroup.selectedIndex=1;
    }
}
}
