import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';

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

  myProfile : MyAccountMdl = new MyAccountMdl();

  public parentAccountForm : FormGroup;
  lienparents = ["Père", "Mère", "Oncle", "Tante", "Grand-Père", "Grand-Mère", "Tuteur", "Tutrice"];

  constructor(private fb : FormBuilder,
              private usersService : UsersService) { 
    this.buildFormGroup();
    this.createProfile();
    setTimeout(()=>{
      this.getUserProfile();
    }, 500);
  }

  ngOnInit() {
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.patchValue(response.data[0].parents[0]);
        }
      )
  }

  patchValue(parentData: any){
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
    console.log("Click on submit", this.parentAccountForm.value);
    this.completeProfile();
    console.log(this.myProfile);
    this.usersService.putProfile(this.myProfile)
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.getUserProfile();
        }
      )
  }

  createProfile(){
    this.myProfile.parents[0]= new MyAccountParentMdl();
    this.myProfile.parents[0].address = new MyAccountAdresse();
    this.myProfile.address= new MyAccountAdresse();
    this.myProfile.socialAddresses = new MyAccountSocialAdrMdl();
    this.myProfile.academicHistories[0] = new MyAccountHistoryMdl(); 
    this.myProfile.bulletins[0] = new MyAccountBulletin();
    this.myProfile.academicHistories[0].fromYear = "2000";
    this.myProfile.academicHistories[0].toYear = "2001";
    this.myProfile.birthDate = "02/02/1999";
  }

  completeProfile(){
    this.myProfile.parents[0].relationship = this.parentAccountForm.controls.lienParent.value;
    this.myProfile.parents[0].firstName = this.parentAccountForm.controls.prenom.value;
    this.myProfile.parents[0].lastName = this.parentAccountForm.controls.nom.value;
    this.myProfile.parents[0].gender = this.parentAccountForm.controls.titre.value;
    this.myProfile.parents[0].phoneNumber = this.parentAccountForm.controls.portable.value;
    this.myProfile.parents[0].email = this.parentAccountForm.controls.email.value;
    this.myProfile.parents[0].address.address1 = this.parentAccountForm.controls.adresse.value;
    this.myProfile.parents[0].address.postCode = JSON.stringify(this.parentAccountForm.controls.codepostal.value);
    this.myProfile.parents[0].address.country = this.parentAccountForm.controls.pays.value;
    this.myProfile.parents[0].address.city = this.parentAccountForm.controls.ville.value;
  }

}
