import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

import {MyAccountMdl, 
        MyAccountParentMdl, 
        MyAccountAdresse,
        MyAccountSocialAdrMdl,
        MyAccountHistoryMdl,
        MyAccountBulletin } from '../../model/myaccount.model';

@Component({
  selector: 'app-myaccount-parents',
  templateUrl: './myaccount-parents.component.html',
  styleUrls: ['./myaccount-parents.component.scss']
})
export class MyaccountParentsComponent implements OnInit {

  myParentProfile : MyAccountParentMdl = new MyAccountParentMdl();
  myProfile : MyAccountMdl = new MyAccountMdl();
  public parentAccountForm : FormGroup;
  lienparents = [ "Père", 
                  "Mère", 
                  "Oncle", 
                  "Tante", 
                  "Grand-Père", 
                  "Grand-Mère", 
                  "Tuteur", 
                  "Tutrice"];

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) { 
    if(this.authService.getToken() != ""){
      this.buildFormGroup();
      this.createProfile();
      setTimeout(()=>{
        this.getUserProfile();
      }, 500);
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (data)=>{
          let response = data;
          // console.log(response);
          if (response.data[0].parents.length!=0){
            this.patchValue(response.data[0].parents[0]);
            this.completeProfile();
          }
        }
      )
  }

  patchValue(parentData: any){
    console.log(parentData);
    this.parentAccountForm.patchValue({
      lienParent : parentData.relationship,
      titre : parentData.gender,
      nom : parentData.lastName,
      prenom : parentData.firstName,
      email : parentData.email,
      portable : parentData.phoneNumber,
      adresse : parentData.address.address1,
      codepostal : parentData.address.postCode,
      ville : parentData.address.city,
      pays : parentData.address.country
    })
  }

  buildFormGroup(){
    this.parentAccountForm = this.fb.group({
      lienParent : ['', Validators.required],
      titre : ['', Validators.required],
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      email : ['', Validators.compose([CustomValidators.email, Validators.required])],
      portable : ['', Validators.compose([Validators.required,
                                          Validators.maxLength(10)])],
      adresse : ['', Validators.required],
      codepostal : ['', Validators.compose([Validators.required,  
                                            Validators.maxLength(5)])],
      ville: ['', Validators.required],
      pays: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log("On submit button");
    this.completeProfile();
  }

  save(){
    this.myProfile=this.usersService.getChildData();
    this.myProfile.parents[0] = this.myParentProfile;
    console.log("Click on submit", this.myProfile);
    this.completeProfile();
    // console.log(this.myProfile);
    this.usersService.putProfile(this.myProfile)
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
        }
      )
  }

  createProfile(){
    this.myParentProfile.address = new MyAccountAdresse();
  }

  completeProfile(){
    this.myParentProfile.relationship = this.parentAccountForm.controls.lienParent.value;
    this.myParentProfile.firstName = this.parentAccountForm.controls.prenom.value;
    this.myParentProfile.lastName = this.parentAccountForm.controls.nom.value;
    this.myParentProfile.gender = this.parentAccountForm.controls.titre.value;
    this.myParentProfile.phoneNumber = this.parentAccountForm.controls.portable.value;
    this.myParentProfile.email = this.parentAccountForm.controls.email.value;
    this.myParentProfile.address.address1 = this.parentAccountForm.controls.adresse.value;
    this.myParentProfile.address.postCode = JSON.stringify(this.parentAccountForm.controls.codepostal.value);
    this.myParentProfile.address.country = this.parentAccountForm.controls.pays.value;
    this.myParentProfile.address.city = this.parentAccountForm.controls.ville.value;
    this.usersService.storeParentData(this.myParentProfile);
  }

}
