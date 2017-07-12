import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';

import {MyAccountMdl, 
        MyAccountParentMdl, 
        MyAccountAdresse,
        MyAccountSocialAdrMdl,
        MyAccountHistoryMdl,
        MyAccountBulletin,
        MyAccountSiblingsMdl } from '../../model/myaccount.model';

@Component({
  selector: 'app-myaccount-children',
  templateUrl: './myaccount-children.component.html',
  styleUrls: ['./myaccount-children.component.scss']
})
export class MyaccountChildrenComponent implements OnInit {

  myProfile : MyAccountMdl = new MyAccountMdl();

  parentData : MyAccountParentMdl = new MyAccountParentMdl();;

  public childrenForm : FormGroup;
  children = ["Frère / Sœur 1"];
  nbChild : number = 1;

  constructor(private fb : FormBuilder,
              private usersService : UsersService) { 
    this.buildFormGroup();
    this.createProfile();
    setTimeout(()=>{
      this.getUserProfile();
    }, 500);
  }

  ngOnInit() {
    this.parentData.address = new MyAccountAdresse();
  }

  buildFormGroup(){
    this.childrenForm = this.fb.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      age : ['', Validators.required],
      gender : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, CustomValidators.email])],
      portable : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      adresse : ['', Validators.required],
      codepostal : ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      ville : ['', Validators.required],
      datenaissance : ['', Validators.compose([Validators.required, CustomValidators.date])],
      lieu : ['', Validators.required],
      freresoeur : this.fb.array([])
    })
    this.addFS();
  }

  addFS(){
    const control = <FormArray>this.childrenForm.controls['freresoeur'];
    const addrCtrl = this.initfs();

    control.push(addrCtrl);
  }

  initfs(){
    return this.fb.group({
      gender : ['', Validators.required],
      age : ['', Validators.required],
      niveau : ['', Validators.required]
    })
  }

  patchValue(data: any){
    this.childrenForm.patchValue({
      nom : data.lastName,
      prenom : data.firstName,
      age : data.age,
      gender : data.gender,
      email : data.email,
      portable : data.mobilePhone,
      // adresse : data.address.address1,
      codepostal : data.address.postCode,
      ville : data.address.city,
      datenaissance : data.birthDate,
      lieu : data.birthPlace,
      // freresoeur : data.siblings
    })
    for(let fs of data.siblings){
      console.log(fs);
    }
  }

  completeProfile(){
    this.myProfile.lastName = this.childrenForm.controls.nom.value;
    this.myProfile.firstName = this.childrenForm.controls.prenom.value;
    // this.myProfile.age = this.childrenForm.controls.age.value;
    this.myProfile.gender = this.childrenForm.controls.gender.value;
    this.myProfile.email = this.childrenForm.controls.email.value;
    this.myProfile.mobilePhone = this.childrenForm.controls.portable.value;
    this.myProfile.address.address1 = this.childrenForm.controls.adresse.value;
    this.myProfile.address.postCode = JSON.stringify(this.childrenForm.controls.codepostal.value);
    this.myProfile.address.city = this.childrenForm.controls.ville.value;
    this.myProfile.birthDate = this.childrenForm.controls.datenaissance.value;
    this.myProfile.birthPlace = this.childrenForm.controls.lieu.value;
    console.log(this.myProfile);
    this.usersService.storeChildData(this.myProfile);
  }

  onSubmit(){
    console.log("Click on submit", this.childrenForm.value);
    this.completeProfile();
    // this.save();
  }

  save(){
    this.myProfile.parents[0] = this.usersService.getParentData();
    console.log(this.myProfile);
    this.usersService.putProfile(this.myProfile)
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
        }
      )
  }

  onAddChild(){
    // this.nbChild++;
    // console.log("Child number " + this.nbChild + " added!");
    // this.children.push("Frère / Sœur " + this.nbChild);
    this.addFS();
  }

  onRemoveChild(){
    if(this.nbChild>0){
      // this.nbChild--;
      // this.children.pop();
      // console.log("Child removed!")
      const control = <FormArray>this.childrenForm.controls['freresoeur'];
      control.removeAt(control.length-1);
    } else {
      console.log("Can't remove 0 child");
    }
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.patchValue(response.data[0]);
          this.completeProfile();
        }
      )
  }

  createProfile(){
    this.myProfile.parents[0]= new MyAccountParentMdl();
    this.myProfile.parents[0].address = new MyAccountAdresse();
    this.myProfile.address= new MyAccountAdresse();
    // this.myProfile.socialAddresses = new MyAccountSocialAdrMdl();
    // this.myProfile.academicHistories[0] = new MyAccountHistoryMdl(); 
    // this.myProfile.bulletins[0] = new MyAccountBulletin();
    this.myProfile.siblings[0] = new MyAccountSiblingsMdl();
    console.log(this.myProfile);
  }

}
