import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { PublicService } from '../../services/public.service';
import swal from 'sweetalert2';

import {
    MyAccountMdl,
    MyAccountParentMdl,
    MyAccountAdresse,
    //MyAccountSocialAdrMdl,
    MyAccountHistoryMdl,
    MyAccountBulletin,
    MyAccountSiblingsMdl
} from '../../model/myaccount.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-myaccount-parents',
    templateUrl: './myaccount-parents.component.html',
    styleUrls: ['./myaccount-parents.component.scss']
})
export class MyaccountParentsComponent implements OnInit, OnChanges {

    @Input() userData;
    public parentAccountForm: FormGroup;
    lienparents = ["Père",
        "Mère",
        "Oncle",
        "Tante",
        "Grand-Père",
        "Grand-Mère",
        "Tuteur",
        "Tutrice"];
    country = [];
    @Output() goToChild = new EventEmitter<boolean>();
    parents: any;
    canDisplay: boolean = false;
    subscription: Subscription;

    constructor(private fb: FormBuilder,
        private usersService: UsersService,
        private route: Router,
        private authService: AuthService,
        private publicService: PublicService) {

    }

    ngOnInit() {
      this.country = this.publicService.getCountry();
      // console.log(this.userData);
      if(this.authService.getToken() != "") { // If user is logged
        setTimeout(()=>{
          this.getUserData();
        }, 1000);
      } else {
        console.log("navigate back");
        this.route.navigate(['/login']);
      }
    }

    ngOnChanges() {
        console.log('onChanges..');
        console.log(this.userData);
        // delete this.userData._id; //userData is used when update profile and we only remove id to don't make conflict
        // this.patchValue(this.userData); // Patching value from value receive from the API
    }

    getUserData() {
      // console.log(this.userData);
        this.buildFormGroup(); // build form
        this.canDisplay = true;
        if (this.userData.parents.length != 0) {
            delete this.userData._id; //userData is used when update profile and we only remove id to don't make conflict
            this.patchValue(this.userData); // Patching value from value receive from the API
        }
    }

    // Patching value
    patchValue(data: any) {
        let parentData = data.parents
        // console.log(data, parentData);
        for (let i = 0; i < this.parentAccountForm.controls['parents']['controls'].length; i++) {
            this.parentAccountForm.controls['parents']['controls'][i].patchValue({
                lienParent: parentData[i].relationship,
                titre: parentData[i].gender,
                nom: parentData[i].lastName,
                prenom: parentData[i].firstName,
                email: parentData[i].email,
                portable: parentData[i].phoneNumber,
                job : this.userData.parents[i].profession,
                horaireJoignable: this.userData.parents[i].availability,
                adresse: parentData[i].address.address1,
                codepostal: parentData[i].address.postCode,
                ville: parentData[i].address.city,
                pays: parentData[i].address.country == ' ' ? 'France' : parentData[i].address.country
            })
        }
        // console.log(this.parentAccountForm);
    }

    // Build the form
    buildFormGroup() {
        this.parentAccountForm = this.fb.group({
            parents: this.fb.array([this.createParent()])
        })
      // console.log(data);
      if (typeof this.userData != 'undefined')
        if (this.userData.parents.length > 1) {
            for (let i = 1; i < this.userData.parents.length; i++) {
                this.parentAccountForm.controls['parents']['controls'].push(this.createParent())
            }
        }
        // console.log(this.parentAccountForm);
    }

    // Create parent to add to the form
    createParent() {
        return this.fb.group({
            lienParent : ['', Validators.required],
            titre : ['', Validators.required],
            nom : ['',Validators.required],
            prenom : ['', Validators.required],
            job : ['', Validators.required],
            email : ['', Validators.compose([CustomValidators.email, Validators.required])],
            portable : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
            horaireJoignable : ['', Validators.required],
            adresse1: ['', Validators.required],
            codepostal: ['', Validators.compose([Validators.maxLength(5), Validators.minLength(5), Validators.required])],
            ville: ['', Validators.required],
            pays: ['']
        })
    }

    // Add a parent to the form
    onAddParent() {
        this.parents = this.parentAccountForm.get('parents') as FormArray;
        this.parents.push(this.createParent());
    }

    // Remove a parent to the form
    onRemoveParent(index) {
        this.parents = this.parentAccountForm.get('parents') as FormArray;
        this.parents.removeAt(index, 1);
    }
    // Complete the profile to send to the service with the data from API and after click on next to go to child form
    onSubmit() {
        delete this.userData._id; //userData is used when update profile and we only remove id to don't make conflict
        this.userData.address = {};
        this.userData.parents = [];
        let parentData = {
            relationship : '',
            firstName : '',
            lastName : '',
            gender : '',
            profession: '',
            phoneNumber : '',
            email : '',
            availability: '',
            address : {
                address1 : '',
                postCode : '',
                country : '',
                city : '',
            }
        };
        console.log("---->",this.parentAccountForm.value);
        console.log("====>",this.parentAccountForm.controls['parents']['controls']);

        if (typeof this.userData.age == 'undefined' || this.userData.age == null) {
          this.userData.age = 20;
        }
        if (typeof this.userData.birthDate == 'undefined' || !(this.userData.birthDate instanceof Date)) {
          this.userData.birthDate = new Date();
        }
        if (typeof this.userData.photo == 'undefined' || typeof this.userData.photo != 'boolean') {
            this.userData.photo = false;
        }
        if (typeof this.userData.favoriteProfessions == 'undefined' || !(this.userData.favoriteProfessions instanceof Array)) {
            this.userData.favoriteProfessions = [];
        }
        // this.userData.address.address1 = this.parentAccountForm.controls['parents']['controls'][0].controls.adresse1.value;
        // this.userData.address.postCode = this.parentAccountForm.controls['parents']['controls'][0].controls.codepostal.value.toString();
        // this.userData.address.city = this.parentAccountForm.controls['parents']['controls'][0].controls.ville.value;

        for (let i = 0; i < this.parentAccountForm.controls['parents']['controls'].length; i++) {
        //    console.log(this.parentAccountForm.controls['parents']['controls'][i].controls)
            parentData.relationship = this.parentAccountForm.controls['parents']['controls'][i].controls.lienParent.value;
            parentData.firstName = this.parentAccountForm.controls['parents']['controls'][i].controls.prenom.value;
            parentData.lastName = this.parentAccountForm.controls['parents']['controls'][i].controls.nom.value;
            parentData.gender = this.parentAccountForm.controls['parents']['controls'][i].controls.titre.value;
            parentData.profession = this.parentAccountForm.controls['parents']['controls'][i].controls.job.value;
            parentData.phoneNumber = this.parentAccountForm.controls['parents']['controls'][i].controls.portable.value;
            parentData.email = this.parentAccountForm.controls['parents']['controls'][i].controls.email.value;
            parentData.availability = this.parentAccountForm.controls['parents']['controls'][i].controls.horaireJoignable.value;
            parentData.address.address1 = this.parentAccountForm.controls['parents']['controls'][i].controls.adresse1.value.toString();
            parentData.address.postCode = this.parentAccountForm.controls['parents']['controls'][i].controls.codepostal.value.toString();
            parentData.address.country = this.parentAccountForm.controls['parents']['controls'][i].controls.pays.value;
            parentData.address.city = this.parentAccountForm.controls['parents']['controls'][i].controls.ville.value;

            //console.log(this.userData.parents[i]);
            // this.userData.parents[i].relationship = this.parentAccountForm.controls['parents']['controls'][i].controls.lienParent.value;
            // this.userData.parents[i].firstName = this.parentAccountForm.controls['parents']['controls'][i].controls.prenom.value;
            // this.userData.parents[i].lastName = this.parentAccountForm.controls['parents']['controls'][i].controls.nom.value;
            // this.userData.parents[i].gender = this.parentAccountForm.controls['parents']['controls'][i].controls.titre.value;
            // this.userData.parents[i].phoneNumber = this.parentAccountForm.controls['parents']['controls'][i].controls.portable.value;
            // this.userData.parents[i].email = this.parentAccountForm.controls['parents']['controls'][i].controls.email.value;
            // this.userData.parents[i].address.address1 = this.parentAccountForm.controls['parents']['controls'][i].controls.adresse.value;
            // this.userData.parents[i].address.postCode = this.parentAccountForm.controls['parents']['controls'][i].controls.codepostal.value.toString();
            // this.userData.parents[i].address.country = this.parentAccountForm.controls['parents']['controls'][i].controls.pays.value;
            // this.userData.parents[i].address.city = this.parentAccountForm.controls['parents']['controls'][i].controls.ville.value;
        }
        this.userData.parents.push(parentData);
        // this.userData =this.parentAccountForm.value;
        this.save();
    }
    // Save the data of the user into the service
    save() {
        console.log("this.userData");
        console.log(this.userData);

        this.usersService.putProfile(this.userData)
            .subscribe(
            (data) => {
                let response = data;
                console.log("hello: ",response);
                if (response.code == 200) {
                    swal({
                        title: 'Vos données ont bien été enregistré.',
                        text: 'Veuillez passer aux données de l\'élève.',
                        type: 'success',
                        confirmButtonText: 'Ok'
                    })
                    this.goToChild.emit(true);
                }
            }
            )

    }

    onCheckValid() {
        console.log(this.parentAccountForm.valid);
    }
}
