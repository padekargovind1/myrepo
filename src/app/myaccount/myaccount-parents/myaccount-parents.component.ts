import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

import {MyAccountMdl, 
        MyAccountParentMdl, 
        MyAccountAdresse,
        MyAccountSocialAdrMdl,
        MyAccountHistoryMdl,
        MyAccountBulletin,
        MyAccountSiblingsMdl } from '../../model/myaccount.model';

@Component({
  selector: 'app-myaccount-parents',
  templateUrl: './myaccount-parents.component.html',
  styleUrls: ['./myaccount-parents.component.scss']
})
export class MyaccountParentsComponent implements OnInit {

  myParentProfile = [];
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
  @Output() goToChild = new EventEmitter<boolean>();
  parents: any;
  canDisplay : boolean = false;

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) { 
    if(this.authService.getToken() != ""){
      this.getUserProfile();
    } else {
      // console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.myProfile.address=new MyAccountAdresse();
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          this.buildFormGroup(response.data[0].parents);
          this.createProfile();
          this.canDisplay=true;
          if (response.data[0].parents.length!=0){
            this.patchValue(response.data[0].parents);
            this.completeProfile();
          }
        }
      )
  }

  patchValue(parentData: any){
    // console.log(parentData);
    for (let i = 0; i<this.parentAccountForm.controls['parents']['controls'].length; i++){
      this.parentAccountForm.controls['parents']['controls'][i].patchValue({
        lienParent : parentData[i].relationship,
        titre : parentData[i].gender,
        nom : parentData[i].lastName,
        prenom : parentData[i].firstName,
        email : parentData[i].email,
        portable : parentData[i].phoneNumber,
        adresse : parentData[i].address.address1,
        codepostal : parentData[i].address.postCode,
        ville : parentData[i].address.city,
        pays : parentData[i].address.country
      })
    }
    console.log(this.parentAccountForm);
  }

  buildFormGroup(data){
    this.parentAccountForm = this.fb.group({
      parents : this.fb.array([this.createParent()])
    })
    if(data.length>1){
      for(let i = 1; i<data.length; i++){
        this.parentAccountForm.controls['parents']['controls'].push(this.createParent())
      }
    }
    console.log(this.parentAccountForm);
  }

  createParent(){
    return this.fb.group({
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

  onAddParent(){
    this.parents = this.parentAccountForm.get('parents') as FormArray;
    this.parents.push(this.createParent());
    this.myParentProfile.push(new MyAccountParentMdl);
    let index = this.myParentProfile.length - 1;
    this.myParentProfile[index].address = new MyAccountAdresse();
  }

  onRemoveParent(index){
    this.parents = this.parentAccountForm.get('parents') as FormArray;
    this.parents.removeAt(index, 1);
    this.myParentProfile.splice(index, 1);
  }

  onSubmit(){
    console.log("On submit button");
    this.completeProfile();
    // swal({
    //   title: 'Vos données ont bien été enregistré.',
    //   text: 'Veuillez passer aux données de votre enfant.',
    //   type: 'success',
    //   confirmButtonText: 'Ok'
    // })
    this.goToChild.emit(true);
    this.save()
  }

  // save(){
  //   this.myProfile=this.usersService.getChildData();
  //   this.myProfile.parents[0] = this.myParentProfile;
  //   console.log("Click on submit", this.myProfile);
  //   this.completeProfile();
  //   // console.log(this.myProfile);
  //   this.usersService.putProfile(this.myProfile)
  //     .subscribe(
  //       (data)=>{
  //         let response = data;
  //         console.log(response);
  //       }
  //     )
  // }

  createProfile(){
    console.log(this.myParentProfile, this.parentAccountForm.controls['parents']['controls'])
    for(let i = 0; i<this.parentAccountForm.controls['parents']['controls'].length; i++){
      this.myParentProfile.push(new MyAccountParentMdl);
      this.myParentProfile[i].address = new MyAccountAdresse();
    }
  }

  completeProfile(){
    for (let i = 0; i<this.parentAccountForm.controls['parents']['controls'].length; i++){
      console.log(this.parentAccountForm.controls['parents']['controls'][i].controls)
      this.myParentProfile[i].relationship = this.parentAccountForm.controls['parents']['controls'][i].controls.lienParent.value;
      this.myParentProfile[i].firstName = this.parentAccountForm.controls['parents']['controls'][i].controls.prenom.value;
      this.myParentProfile[i].lastName = this.parentAccountForm.controls['parents']['controls'][i].controls.nom.value;
      this.myParentProfile[i].gender = this.parentAccountForm.controls['parents']['controls'][i].controls.titre.value;
      this.myParentProfile[i].phoneNumber = this.parentAccountForm.controls['parents']['controls'][i].controls.portable.value;
      this.myParentProfile[i].email = this.parentAccountForm.controls['parents']['controls'][i].controls.email.value;
      this.myParentProfile[i].address.address1 = this.parentAccountForm.controls['parents']['controls'][i].controls.adresse.value;
      this.myParentProfile[i].address.postCode = this.parentAccountForm.controls['parents']['controls'][i].controls.codepostal.value.toString();
      this.myParentProfile[i].address.country = this.parentAccountForm.controls['parents']['controls'][i].controls.pays.value;
      this.myParentProfile[i].address.city = this.parentAccountForm.controls['parents']['controls'][i].controls.ville.value;
    }
    this.usersService.storeParentData(this.myParentProfile);
  }

  save(){
    this.myProfile.parents=this.myParentProfile
    console.log(this.myProfile)
    this.myProfile.academicHistories[0]=new MyAccountHistoryMdl();
    this.myProfile.bulletins[0]= new MyAccountBulletin();
    this.myProfile.siblings[0]= new MyAccountSiblingsMdl();
     this.usersService.putProfile(this.myProfile)
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
        }
      )

  }
}
