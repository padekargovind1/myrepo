import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import {date} from "ng2-validation/dist/date";

//const self = this;
@Component({
  selector: 'app-myaccount-children',
  templateUrl: './myaccount-children.component.html',
  styleUrls: ['./myaccount-children.component.scss']
})
export class MyaccountChildrenComponent implements OnInit {

  @Input() userData;
  public childrenForm : FormGroup;
  canDisplay: boolean = false;
  maxDate = new Date();

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route : Router,
              private authService : AuthService) {}

  ngOnInit() {
    if(this.authService.getToken() != "") { // If user is logged
      setTimeout(()=>{
        this.getUserProfile();
      }, 1500)
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
    }
  }

  getUserProfile(){
    delete this.userData._id; //userData is used when update profile and we only remove id to don't make conflict
    this.buildFormGroup();
    this.patchValue(this.userData);
    this.canDisplay=true;
  }

  // Build the form
  buildFormGroup(){
    this.childrenForm = this.fb.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      age : [''],
      gender : ['', Validators.required],
      datenaissance : ['', Validators.compose([Validators.required, CustomValidators.date])],
      lieu : ['', Validators.required],
    })
    console.log(this.childrenForm)
  }

  // createfs(){
  //   return this.fb.group({
  //     gender : ['', Validators.required],
  //     age : ['', Validators.required],
  //     niveau : ['', Validators.required]
  //   })
  // }

 // patchValue(data: any){ 

  // Patch the value from the API
  patchValue(data: any){
    console.log(data.birthDate);
    // data.birthDate.getDay()+'/'+data.birthDate.getMonth()+'/'+data.birthDate.getFullYear()

    this.childrenForm.patchValue({
      nom : data.lastName=='A compléter' ? '' : data.lastName,
      prenom : data.firstName=='A compléter' ? '' : data.firstName,
      age : data.age,
      gender : data.gender,
      lieu : data.birthPlace,
    })
    console.log(new Date(data.birthDate), this.childrenForm.value)
  }

<<<<<<< HEAD

  completeProfile(){
    this.myProfile.lastName = this.childrenForm.value.nom;
    this.myProfile.firstName = this.childrenForm.value.prenom;
    this.myProfile.age = this.childrenForm.value.age;
    this.myProfile.gender = this.childrenForm.value.gender;
    this.myProfile.email = this.childrenForm.value.email;
    this.myProfile.mobilePhone = this.childrenForm.value.portable;
    // this.myProfile.address.address1 = this.childrenForm.controls.adresse.value;
    // this.myProfile.address.postCode = this.childrenForm.controls.codepostal.value.toString();
    // this.myProfile.address.city = this.childrenForm.controls.ville.value;
    // this.myProfile.birthDate = this.childrenForm.controls.datenaissance.value;
    // this.myProfile.birthPlace = this.childrenForm.controls.lieu.value;
    // console.log(this.myProfile.siblings)
    // for(let i = 0; i<this.childrenForm.controls['freresoeur']['controls'].length; i++){
    //   this.myProfile.siblings[i].age=this.childrenForm.controls['freresoeur']['controls'][i].controls.age.value;
    //   this.myProfile.siblings[i].gender=this.childrenForm.controls['freresoeur']['controls'][i].controls.gender.value;
    //   this.myProfile.siblings[i].study=this.childrenForm.controls['freresoeur']['controls'][i].controls.niveau.value;
    // }

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

  // After click on submit
=======
  // Complete the profile to send to the API
>>>>>>> origin/master
  onSubmit(){
    this.userData.lastName = this.childrenForm.value.nom;
    this.userData.firstName = this.childrenForm.value.prenom;
    this.userData.age = this.childrenForm.value.age;
    this.userData.gender = this.childrenForm.value.gender;
    this.userData.birthDate = this.childrenForm.controls.datenaissance.value;
    this.userData.birthPlace = this.childrenForm.controls.lieu.value;
    console.log(this.userData);
    this.save();
  }
  // Call API to send new data of the user
  save(){
    this.usersService.putProfile(this.userData)
      .subscribe(
        (data)=>{
          let response = data;
          console.log(response);
          if(response.code==200){
            swal({
              title: 'Vos données ont bien été enregistré.',
              text: '',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.route.navigate(['/'])
          }
        }
      )
  }
}
