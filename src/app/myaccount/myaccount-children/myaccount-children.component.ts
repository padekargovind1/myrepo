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
  nbChild : number = 1;

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) { 
    if(this.authService.getToken() != "") {
      this.buildFormGroup();
      this.getUserProfile();
      this.parentData.address = new MyAccountAdresse();
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
    } 
  }

  ngOnInit() {
    let date = new Date().toISOString();
    // console.log(date);
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
      // gender : ['', Validators.required],
      // age : ['', Validators.required],
      // niveau : ['', Validators.required]
    })
  }

  patchValue(data: any){
    // console.log(data.address);
    this.childrenForm.patchValue({
      nom : data.lastName,
      prenom : data.firstName,
      age : data.age,
      gender : data.gender,
      email : data.email,
      portable : data.mobilePhone,
      datenaissance : data.birthDate,
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
  }

  completeProfile(){
    this.myProfile.lastName = this.childrenForm.controls.nom.value;
    this.myProfile.firstName = this.childrenForm.controls.prenom.value;
    this.myProfile.age = this.childrenForm.controls.age.value;
    this.myProfile.gender = this.childrenForm.controls.gender.value;
    this.myProfile.email = this.childrenForm.controls.email.value;
    this.myProfile.mobilePhone = this.childrenForm.controls.portable.value;
    this.myProfile.address.address1 = this.childrenForm.controls.adresse.value;
    this.myProfile.address.postCode = this.childrenForm.controls.codepostal.value;
    this.myProfile.address.city = this.childrenForm.controls.ville.value;
    this.myProfile.birthDate = this.childrenForm.controls.datenaissance.value;
    this.myProfile.birthPlace = this.childrenForm.controls.lieu.value;
    // let i=0;
    // console.log(this.childrenForm.controls.freresoeur.value)
    // for (let sibling of this.childrenForm.controls.freresoeur.value){
    //   this.myProfile.siblings[i].age = sibling[i].age.value;
    //   this.myProfile.siblings[i].gender = sibling[i].gender.value;
    //   this.myProfile.siblings[i].study = sibling[i].niveau.value;
    //   i++;
    // }
    // console.log(this.myProfile);
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
    this.myProfile.parents[0] = this.usersService.getParentData();
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
    // this.nbChild++;
    // console.log("Child number " + this.nbChild + " added!");
    // this.children.push("Frère / Sœur " + this.nbChild);
    this.addFS();
    this.myProfile.siblings.push(new MyAccountSiblingsMdl());
  }

  onRemoveChild(){
    if(this.nbChild>0){
      // this.nbChild--;
      // this.children.pop();
      // console.log("Child removed!")
      const control = <FormArray>this.childrenForm.controls['freresoeur'];
      control.removeAt(control.length-1);
      this.myProfile.siblings.pop();
    } else {
      console.log("Can't remove 0 child");
    }
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (data)=>{
          let response = data;
          // console.log(response);
          this.createProfile(response.data[0]);
          this.patchValue(response.data[0]);
          this.completeProfile();
        }
      )
  }

  createProfile(data){
    this.myProfile.parents[0]= new MyAccountParentMdl();
    this.myProfile.parents[0].address = new MyAccountAdresse();
    this.myProfile.address= new MyAccountAdresse();
    this.myProfile.socialAddresses = new MyAccountSocialAdrMdl();
    this.myProfile.academicHistories[0]={};
    this.myProfile.academicHistories[0] = new MyAccountHistoryMdl(); 
    this.myProfile.bulletins[0] = new MyAccountBulletin();
    this.myProfile.siblings[0]=new MyAccountSiblingsMdl();
    // for(let sibling of data.siblings){
    //   this.myProfile.siblings.push(new MyAccountSiblingsMdl());
    // }
    // console.log(this.myProfile);
  }

}
