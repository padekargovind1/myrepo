import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

@Component({
    selector: 'app-myaccount-parents',
    templateUrl: './myaccount-parents.component.html',
    styleUrls: ['./myaccount-parents.component.scss']
})
export class MyaccountParentsComponent implements OnInit {

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

    constructor(private fb: FormBuilder,
        private usersService: UsersService,
        private route: Router,
        private authService: AuthService,
        private publicService: PublicService) {
        
    }

    ngOnInit() {
        this.country = this.publicService.getCountry();
		if (this.authService.getToken() != "") {
        } else {
            // console.log("navigate back");
            this.route.navigate(['/login']);
        }
        if (this.userData === undefined || this.userData == null) {
            this.usersService.getProfile()
                .subscribe((response) => {
                    console.log(response);
                    if (response.data != 400) {
                        this.userData = response.data[0];
                        this.getUserData();
                    }
                })
        }
        else {
            this.getUserData();
        }
    }

    getUserData() {
      // console.log(this.userData);
        delete this.userData._id; //userData is used when update profile and we only remove id to don't make conflict
        this.buildFormGroup(this.userData.parents); // build form
        this.canDisplay = true;
        if (this.userData.parents.length != 0) {
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
                adresse: parentData[i].address.address1,
                codepostal: parentData[i].address.postCode,
                ville: parentData[i].address.city,
                pays: parentData[i].address.country == ' ' ? 'France' : parentData[i].address.country
            })
        }
        // console.log(this.parentAccountForm);
    }

    // Build the form
    buildFormGroup(data) {
        this.parentAccountForm = this.fb.group({
            parents: this.fb.array([this.createParent()])
        })
        if (data.length > 1) {
            for (let i = 1; i < data.length; i++) {
                this.parentAccountForm.controls['parents']['controls'].push(this.createParent())
            }
        }
        // console.log(this.parentAccountForm);
    }

    // Create parent to add to the form
    createParent() {
        return this.fb.group({
            lienParent: ['', Validators.required],
            titre: ['', Validators.required],
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', Validators.compose([CustomValidators.email, Validators.required])],
            portable: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])],
            adresse: ['', Validators.required],
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
        for (let i = 0; i < this.parentAccountForm.controls['parents']['controls'].length; i++) {
            //console.log(this.parentAccountForm.controls['parents']['controls'][i].controls)
            this.userData.parents[i].relationship = this.parentAccountForm.controls['parents']['controls'][i].controls.lienParent.value;
            this.userData.parents[i].firstName = this.parentAccountForm.controls['parents']['controls'][i].controls.prenom.value;
            this.userData.parents[i].lastName = this.parentAccountForm.controls['parents']['controls'][i].controls.nom.value;
            this.userData.parents[i].gender = this.parentAccountForm.controls['parents']['controls'][i].controls.titre.value;
            this.userData.parents[i].phoneNumber = this.parentAccountForm.controls['parents']['controls'][i].controls.portable.value;
            this.userData.parents[i].email = this.parentAccountForm.controls['parents']['controls'][i].controls.email.value;
            this.userData.parents[i].address.address1 = this.parentAccountForm.controls['parents']['controls'][i].controls.adresse.value;
            this.userData.parents[i].address.postCode = this.parentAccountForm.controls['parents']['controls'][i].controls.codepostal.value.toString();
            this.userData.parents[i].address.country = this.parentAccountForm.controls['parents']['controls'][i].controls.pays.value;
            this.userData.parents[i].address.city = this.parentAccountForm.controls['parents']['controls'][i].controls.ville.value;
        }
        this.save();
    }
    // Save the data of the user into the service
    save() {
        console.log(this.userData)
        this.usersService.putProfile(this.userData)
            .subscribe(
            (data) => {
                let response = data;
                console.log(response);
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
}
