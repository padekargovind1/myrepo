import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { WizardService } from "../../services/wizard.service";
import { date } from "ng2-validation/dist/date";
import { Subscription } from 'rxjs/Subscription';

//const self = this;
@Component({
  selector: 'app-myaccount-myfiles',
  templateUrl: './myaccount-myfiles.component.html',
  styleUrls: ['./myaccount-myfiles.component.scss']
})
export class MyaccountMyfilesComponent implements OnInit {
    
  canDisplay: boolean = false;
  maxDate = new Date();
  userData: any;
  subscription: Subscription;
  childData: {};

  constructor(private fb : FormBuilder,
              private usersService : UsersService,
              private route: Router,
              private router: ActivatedRoute,
              private wizardService: WizardService,
              private authService: AuthService) {

        this.subscription = this.router.params
            .subscribe(
            params => {
                this.getUserProfile();
                //this.wizardService.saveData('childData', this.userData.parents);
            }
            )
  }

  ngOnInit() {
    if(this.authService.getToken() != "") { // If user is logged
      setTimeout(()=>{
        //this.getUserProfile();
      }, 1500)
    } else {
      console.log("navigate back");
      this.route.navigate(['/login']);
      }
  }

  //Get user profile data
  //Then call methods to build the form and patch value
  getUserProfile() {
      this.usersService.getProfile()
          .subscribe(
          (response) => {
              let data = response.data;
              // console.log(data);
              if (response.code == 400) {
                  console.log(response.message);
              } else {
                  this.userData = data[0];
                  console.log(this.userData);

                  var tempParentData = [];
                  var IsAdress = (this.userData.address !== undefined && this.userData.address != null) ? true : false;
                  for (let i = 0; i < this.userData.parents.length; i++) {
                      if (this.userData.parents !== undefined && this.userData.parents != null && this.userData.parents.length != 0) {
                          IsAdress = (this.userData.parents[i].address !== undefined && this.userData.parents[i].address != null) ? true : false;
                          tempParentData.push({
                              lienParent: this.userData.parents[i].relationship,
                              titre: this.userData.parents[i].gender,
                              nom: this.userData.parents[i].lastName,
                              prenom: this.userData.parents[i].firstName,
                              email: this.userData.parents[i].email,
                              portable: this.userData.parents[i].phoneNumber,
                              adresse: IsAdress ? this.userData.parents[i].address.address1 : "",
                              codepostal: IsAdress ? this.userData.parents[i].address.postCode : "",
                              ville: IsAdress ? this.userData.parents[i].address.city : "",
                              pays: IsAdress ? this.userData.parents[i].address.country : "",
                              job: this.userData.parents[i].profession,
                              horaireJoignable: this.userData.parents[i].availability
                          });
                      }
                  }
                  this.wizardService.saveData('parentData', tempParentData);

                  this.childData = {
                      childLastName: this.userData.lastName == "A compléter" ? "" : this.userData.lastName,
                      childFirstName: this.userData.firstName == "A compléter" ? "" : this.userData.firstName,
                      childAge: this.userData.age == "A compléter" ? "" : this.userData.age,
                      childTitle: this.userData.gender == "A compléter" ? "" : this.userData.gender,
                      childBirthDay: this.userData.birthDate == "A compléter" ? "" : this.userData.birthDate,
                      childMel: this.userData.email == "A compléter" ? "" : this.userData.email,
                      childTel: this.userData.mobilePhone == "A compléter" ? "" : this.userData.mobilePhone,
                      childBirthPlace: (this.userData.birthPlace != null && this.userData.birthPlace != "" && this.userData.birthPlace != "A compléter") ? this.userData.birthPlace : ""
                  };
                  this.wizardService.saveData('childData', this.childData);
                  this.wizardService.saveData('pageName', "myaccount");
              }
          }
          )
  }
  //navigate to the different tab of the md-tab
  nextTab(nb) {
      //this.tabGroup.selectedIndex = nb;
      //this.nbTab = nb;
      //this.cdr.detectChanges();
  }

}
