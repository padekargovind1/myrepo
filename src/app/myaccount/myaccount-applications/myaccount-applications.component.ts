import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { date } from "ng2-validation/dist/date";
import { BrochureService } from '../../services/brochure.service';
import { SendService } from '../../services/send.service';
import { CompareService } from '../../services/compare.service';
import { MdDialog } from '@angular/material';
import { SendMessageComponent } from '../../shared/send-message/send-message.component';
import { CompareDialogComponent } from '../../compare-mode/compare-dialog/compare-dialog.component';
import { SchoolChoiceComponent } from '../../shared/school-choice/school-choice.component';

//const self = this;
@Component({
  selector: 'app-myaccount-applications',
  templateUrl: './myaccount-applications.component.html',
  styleUrls: ['./myaccount-applications.component.scss']
})
export class MyaccountApplicationsComponent implements OnInit {
  applyList = [];
  wishAsc: boolean = false;
  canCompare: boolean = false;
  four: boolean = false;
  canFilter: boolean = false;
  compareList = [];
  compareListFilter = [];
  schoolListFilter = [];
  imageExtensions = ['png', 'gif', 'jpeg'];
  imagePathPre = 'http://54.255.254.97:9080/cideapi/';
  filterList = ['Cycles & Classes', 'Langues', 'Spécialités',
      'Internat', 'Stages', 'Restauration',
      'Externat', 'Statut', 'Enseignement Confessionel',
      'Sections', 'Diplôme', 'Options', 'Places Disponibles']
  config: any;

  constructor(private usersService: UsersService,
      private brochureService: BrochureService,
      private router: Router,
      private sendService: SendService,
      private compareService: CompareService,
      public dialog: MdDialog) { }

  ngOnInit() {
      this.getApplications();
  }

  // get Application list
  getApplications() {
      this.usersService.getApplication()
          .subscribe(
          response => {
              console.log(response)
              if (response.code == 400) {
                  console.log(response.message)
              } else {
                  this.applyList = [];
                  for (let data of response.data) {
                      if (data.type != 'wish') {
                          this.applyList.push(data.school)
                      }
                  }
                  console.log(this.applyList);
              }
          }
          )
  }
  imageExists(image_url) {
      // console.log("test")
      var http = new XMLHttpRequest();
      http.open('HEAD', image_url, false);
      http.send();
      return http.status != 404;
  }
  // Separate the application list into 3 category
  filterApplications(data) {
      /*for(var j=0;j<data.length;j++)
      {
        var imgpath = data[j].cycles[0].logo1
        for(var i=0;i<this.imageExtensions.length;i++){
          var tempimgpath = "uploads/school/"+data[j]._id+"/logo/"+data[j]._id+"."+this.imageExtensions[i];
          if(this.imageExists(this.imagePathPre + tempimgpath)){
            imgpath = tempimgpath;
            break;
          }
        }
          data[j].cycles[0].logo1 = imgpath;
      }*/
      this.schoolListFilter = data.filter(
          application => {
              return application.type == "wish"
          }
      )
      console.log(this.schoolListFilter);
  }

  // Delete an applycation
  onDeleteApplication(schoolId, applyId) {
      let data = {
          'school': schoolId,
          'id': applyId
      }
      console.log(data)
      this.usersService.deleteApplication(data)
          .subscribe(
          response => {
              console.log(response)
              if (response.code == 400) {
                  console.log(response.message)
              } else {
                  this.getApplications();
              }
          }
          )
  }

  // Sort the application
  custom_sort_asc(a, b) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }
  custom_sort_desc(a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  // After click on sort the list
  onSortClick(sortType) {
      switch (sortType) {
          case "wish": // sort wish
              if (this.wishAsc) {
                  this.schoolListFilter = this.schoolListFilter.sort(this.custom_sort_desc);
                  this.wishAsc = false;
              }
              else {
                  this.schoolListFilter = this.schoolListFilter.sort(this.custom_sort_asc);
                  this.wishAsc = true;
              }
              break;
      }
  }
  saveInWish(schoolId) {
      const data = {
          type: "wish",
          schools: [{ school: schoolId, class: 'EE' }]
      }
      this.usersService.postApplication(data)
          .subscribe(
          response => {
              console.log(response)
              // Bad Request.
              if (response.code == 200) {
                  swal({
                      title: 'Ajout à la liste des voeux',
                      text: "L'école séléctionné a bien été ajouté à votre liste des voeux",
                      type: 'warning',
                      confirmButtonText: "J'ai compris"
                  })
              } else {
                  swal({
                      title: 'Attention',
                      text: response.message,
                      type: 'warning',
                      confirmButtonText: "J'ai compris"
                  })
              }
          }
          )
  }
  sendMessage(school) {
      let config = this.sendService.makeProfile(school)
      let dialogref = this.dialog.open(SendMessageComponent, config);
  }
  goToBrochure(schoolName) {
      // console.log(schoolName)
      this.brochureService.storeSchoolSearch(schoolName);
      this.router.navigate(['/brochure']);
  }
  onCheckbox(schoolId) {
      // console.log(schoolId);
      if (this.compareList.includes(schoolId)) { // If user uncheck a school
          // console.log("remove checkbox");
          let i = this.compareList.indexOf(schoolId, 0);
          // console.log(i);
          this.compareList.splice(i, 1);
          this.four = false;
          if (this.compareList.length <= 1) {
              this.canCompare = false;
          }
      } else if (this.compareList.length >= 4) { // If the compare list is already 4 -> sweet alert -> max 4
          swal({
              title: 'Attention',
              text: 'Vous ne pouvez comparer plus de 4 écoles à la fois. Vous pouvez tout de même désélectionner une école déjà sélectionné',
              type: 'warning',
              confirmButtonText: 'Ok'
          });
          this.four = true;
      } else { // Else -> add the school to the array to compare
          this.compareList.push(schoolId);
          if (this.compareList.length > 1) {
              this.canCompare = true;
          }
      }
  }
  // when user click on a checkbox to select category to compare the schools
//   onFilterCheckbox(index) {
//       this.compareListFilter[index] = !this.compareListFilter[index];
//       this.canFilter = this.checkFilterBox();
//   }
//   checkFilterBox() {
//       let i = 0;
//       for (const filter of this.compareListFilter) {
//           if (filter) {
//               return true;
//           }
//           i++;
//       }
//       return false;
//   }
//   onCompare() {
//       this.compareService.storeCompareFilter(this.compareListFilter);
//       this.compareService.storeSchoolId(this.compareList);
//       this.router.navigate(['/compare-mode/']);
//   }

  onLaunchCompare() {
    this.makeProfile(this.compareList);
    this.dialog.open(CompareDialogComponent, this.config);
  }

  //Make the config for the md dialog
  makeProfile(school) {
    this.config = {
      data: {
        schoolData: school
      },
      disableClose: false,
      width: '800px',
      height: '',
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

  applyTo(school) {
    this.makeProfile(school);
    this.dialog.open(SchoolChoiceComponent, this.config);
  }

}
