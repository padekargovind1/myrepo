import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

import {MyAccountMdl, 
        MyAccountParentMdl, 
        MyAccountAdresse,
        MyAccountSocialAdrMdl,
        MyAccountHistoryMdl,
        MyAccountBulletin,
        MyAccountSiblingsMdl } from '../../model/myaccount.model';

const self = this;
@Component({
  selector: 'app-myaccount-children',
  templateUrl: './myaccount-children.component.html',
  styleUrls: ['./myaccount-children.component.scss']
})
export class MyaccountChildrenComponent implements OnInit {

  myProfile : MyAccountMdl = new MyAccountMdl();

  parentData : MyAccountParentMdl = new MyAccountParentMdl();;

  public childrenForm : FormGroup;
  // children = ["Frère / Sœur 1"];
  canDisplay: boolean = false;
  siblings : any;
  maxDate = new Date();

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) { 
    if(this.authService.getToken() != "") {
      this.getUserProfile();
      this.parentData.address = new MyAccountAdresse();
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
    } 
    console.log(Date.now().toString())
    // let date = new Date();
    // this.maxDate = date.getFullYear()+'/0'+date.getMonth()+'/0'+date.getDay();
    // console.log(this.maxDate)
  }

  ngOnInit() {
    let date = new Date().toISOString();
    // console.log(date);
  }

  ngAfterViewInit(){
    this.runScript()
  }
  runScript(){
	// Select your input element.
	
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.buildFormGroup(response.data[0].siblings);
          this.createProfile(response.data[0]);
          this.patchValue(response.data[0]);
          this.completeProfile();
          this.canDisplay=true;
          console.log(this.childrenForm)
        }
      )
  }

  buildFormGroup(siblings){
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
      datenaissance : [new Date(), Validators.compose([Validators.required, CustomValidators.date])],
      lieu : ['', Validators.required],
      freresoeur : this.fb.array([this.createfs()])
    })
    if(siblings.length>1){
      for(let i = 1; i<siblings.length; i++){
        this.childrenForm.controls['freresoeur']['controls'].push((this.createfs()))
      }
    }
    console.log(this.childrenForm)
    // this.addFS();
  }

  createfs(){
    return this.fb.group({
      gender : ['', Validators.required],
      age : ['', Validators.required],
      niveau : ['', Validators.required]
    })
  }

  patchValue(data: any){
    console.log("TJ");
    console.log(data);
    this.childrenForm.patchValue({
      nom : data.lastName,
      prenom : data.firstName,
      age : data.age,
      gender : data.gender,
      email : data.email,
      portable : data.mobilePhone,
      datenaissance : (data.birthDate!=null && data.birthDate != "") ? new Date(data.birthDate) : new Date(),
      lieu : data.birthPlace,
    })
    if(typeof data.address != "undefined"){
      this.childrenForm.patchValue({
        adresse : data.address.address1,
        codepostal : data.address.postCode,
        ville : data.address.city,
      })
    // this.childrenForm.controls['freresoeur'].patchValue({
    //   age : data.siblings
    // })
    }
    for (let i = 0; i<this.childrenForm.controls['freresoeur']['controls'].length; i++){
      if(data.siblings.length!=0){
        this.childrenForm.controls['freresoeur']['controls'][i].patchValue({
          gender : data.siblings[i].gender,
          age : data.siblings[i].age,
          niveau : data.siblings[i].study
        })
      }
    }
    console.log(this.childrenForm);
  }

  completeProfile(){
    this.myProfile.lastName = this.childrenForm.controls.nom.value;
    this.myProfile.firstName = this.childrenForm.controls.prenom.value;
    this.myProfile.age = this.childrenForm.controls.age.value;
    this.myProfile.gender = this.childrenForm.controls.gender.value;
    this.myProfile.email = this.childrenForm.controls.email.value;
    this.myProfile.mobilePhone = this.childrenForm.controls.portable.value;
    this.myProfile.address.address1 = this.childrenForm.controls.adresse.value;
    this.myProfile.address.postCode = this.childrenForm.controls.codepostal.value.toString();
    this.myProfile.address.city = this.childrenForm.controls.ville.value;
    this.myProfile.birthDate = this.childrenForm.controls.datenaissance.value;
    this.myProfile.birthPlace = this.childrenForm.controls.lieu.value;
    console.log(this.myProfile.siblings)
    for(let i = 0; i<this.childrenForm.controls['freresoeur']['controls'].length; i++){
      this.myProfile.siblings[i].age=this.childrenForm.controls['freresoeur']['controls'][i].controls.age.value;
      this.myProfile.siblings[i].gender=this.childrenForm.controls['freresoeur']['controls'][i].controls.gender.value;
      this.myProfile.siblings[i].study=this.childrenForm.controls['freresoeur']['controls'][i].controls.niveau.value;
    }
    
    // let i=0;
    // console.log(this.childrenForm.controls.freresoeur.value)
    // for (let sibling of this.childrenForm.controls.freresoeur.value){
    //   this.myProfile.siblings[i].age = sibling[i].age.value;
    //   this.myProfile.siblings[i].gender = sibling[i].gender.value;
    //   this.myProfile.siblings[i].study = sibling[i].niveau.value;
    //   i++;
    // }
    console.log(this.myProfile);
    this.usersService.storeChildData(this.myProfile);
  }

  onSubmit(){
    console.log("Click on submit", this.childrenForm.value);
    this.completeProfile();
    this.save();
    swal({
      title: 'Vos données ont bien été enregistré.',
      text: '',
      type: 'success',
      confirmButtonText: 'Ok'
    })
    this.route.navigate(['/'])
  }

  save(){
    this.myProfile.parents = this.usersService.getParentData();
    // console.log(this.myProfile);
    this.usersService.putProfile(this.myProfile)
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
        }
      )
  }

  onAddChild(){
    this.siblings = this.childrenForm.get('freresoeur') as FormArray;
    this.siblings.push(this.createfs());
    this.myProfile.siblings.push(new MyAccountSiblingsMdl);
  }

  onRemoveChild(index){
    this.siblings = this.childrenForm.get('freresoeur') as FormArray;
    this.siblings.removeAt(index, 1);
    this.myProfile.siblings.splice(index, 1);
  }

  createProfile(data){
    console.log(data)
    this.myProfile.parents= [];
    this.myProfile.address= new MyAccountAdresse();
    this.myProfile.socialAddresses = new MyAccountSocialAdrMdl();
    this.myProfile.academicHistories[0]={};
    this.myProfile.academicHistories[0] = new MyAccountHistoryMdl(); 
    this.myProfile.bulletins[0] = new MyAccountBulletin();
    this.myProfile.siblings[0]=new MyAccountSiblingsMdl();
    for(let i = 1; i<data.siblings.length; i++){
      this.myProfile.siblings[i]=new MyAccountSiblingsMdl();
    }
  }

}
