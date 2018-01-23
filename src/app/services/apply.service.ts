import { Injectable } from '@angular/core';
import {WizardService} from "./wizard.service";
import {UsersService} from "./users.service";
import {Router} from "@angular/router";
import swal from 'sweetalert2';
import {SchoolService} from "./school.service";

@Injectable()
export class ApplyService {
  wizardData : any;
  userData : any = {
    _id: "",
    lastName: "",
    firstName: "",
    age: "",
    gender: "",
    email: "",
    mobilePhone: "",
    birthDate: "",
    birthPlace: "",
    parents: [{
      profession: "",
      relationship: "",
      gender: "",
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      availability: ""
    }],
    academicHistories: [{
      city: "",
      class: "",
      classType: "",
      schoolName: "",
      languages: []
    }],
    attractionToSubjects: [],
    weakAtSubjects: [],
    jobs: [],
    interest: [],
    hobbies: []
  };
  
  schoolId: string;

  constructor(private wizardService : WizardService,
              private usersService : UsersService,
              private route : Router,
              private schoolService : SchoolService,) {
  }

  storeUrlPath(data){
    console.log("test1", data)
    this.schoolId=data;
  }

  //Get wizard dataform and Get UserProfile to update it
  onSubmit(){
    this.wizardData = this.wizardService.getUserData();
    this.usersService.getProfile()
      .subscribe((response)=>{
        console.log(response);
        if(response.code==200){
          // this.userData=response.data[0];
          delete this.userData._id;
          this.completeUserData();
        }
      })
  }

  //Data to send to API
  completeUserData(){
    console.log(this.userData, this.wizardData);
    for(let i = 0; i<this.wizardData.parentData.length; i++){
      this.userData.parents[i].profession = this.wizardData.parentData[i].job;
      this.userData.parents[i].relationship = this.wizardData.parentData[i].lienParent;
      this.userData.parents[i].gender = this.wizardData.parentData[i].titre;
      this.userData.parents[i].lastName = this.wizardData.parentData[i].nom;
      this.userData.parents[i].firstName = this.wizardData.parentData[i].prenom;
      this.userData.parents[i].email = this.wizardData.parentData[i].email;
      this.userData.parents[i].phoneNumber = this.wizardData.parentData[i].portable;
      this.userData.parents[i].availability = this.wizardData.parentData[i].horaireJoignable;
    }
    this.userData.lastName = this.wizardData.childData['childLastName'];
    this.userData.firstName = this.wizardData.childData['childFirstName'];
    this.userData.age = this.wizardData.childData['childAge']===undefined || this.wizardData.childData['childAge']==' '? this.wizardData.childData['childAge'] : 2;
    this.userData.gender = this.wizardData.childData['childTitle']!==undefined ? this.wizardData.childData['childTitle'] : 'A compléter';
    this.userData.email = this.wizardData.parentData[0].email;
    this.userData.mobilePhone = this.wizardData.parentData[0].portable;
    this.userData.birthDate = this.wizardData.childData['childBirthDay'];
    this.userData.birthPlace = this.wizardData.childData['childBirthPlace'];
    this.userData.academicHistories[0].city = this.wizardData.currentSchoolData['schoolCity']
    this.userData.academicHistories[0].class = this.wizardData.currentSchoolData['schoolClasse']
    this.userData.academicHistories[0].classType = this.wizardData.currentSchoolData['schoolOption']
    this.userData.academicHistories[0].schoolName = this.wizardData.currentSchoolData['schoolName']
    this.userData.academicHistories[0].languages = []
    this.userData.academicHistories[0].languages.push(this.wizardData.currentSchoolData['schoolLv1'])
    this.userData.academicHistories[0].languages.push(this.wizardData.currentSchoolData['schoolLv2'])
    this.userData.academicHistories[0].languages.push(this.wizardData.currentSchoolData['schoolLv3'])
    this.userData.attractionToSubjects = [];
    this.userData.attractionToSubjects.push(this.wizardData.subjectData['bestSubject']);
    this.userData.weakAtSubjects = [];;
    this.userData.weakAtSubjects.push(this.wizardData.subjectData['weakSubject']);
    this.userData.jobs=[];
    console.log(this.wizardData)
    if(this.wizardData['hobbiesData']['job']!==undefined){
      for(let i = 0; i<this.wizardData['hobbiesData']['job'].length; i++){
        this.userData.jobs[i]={};
        console.log(this.userData.jobs[i])
        this.userData.jobs[i].profession=this.wizardData['hobbiesData']['job'][i].interestJob;
        this.userData.jobs[i].age=this.wizardData['hobbiesData']['job'][i].interestAge!='' ? this.wizardData['hobbiesData']['job'][i].interestAge : 0
      }
    }
    this.userData.interest = this.wizardData['hobbiesData']['yourInterest'];
    this.userData.hobbies = this.wizardData['hobbiesData']['practiceInterest'];
    console.log(this.userData);
    this.sendToApi();
  }

  //Data to send to API
  sendToApi() {
      console.log(this.schoolId);
      console.log(this.wizardData.pageName);
      if (this.wizardData['pageName'] != "myaccount") {
        const data = { //Create a new applying school
          type: "apply",
          school: this.schoolId,
          class: this.schoolService.getClassName()
        }
        console.log(data);
        this.usersService.postApplication(data)
          .subscribe( response => {
            console.log(response)
            // Bad Request.
            if (response.code==200){
              swal({
                title: 'Merci d\'avoir choisi CIDE',
                text: 'Nous transmettons votre dossier aux écoles sélectionné. \nLeurs directions vous contactera dans les meilleurs délais.\nNous venons de vous envoyer un mél de confirmation.',
                type: 'success',
                confirmButtonText: "J'ai compris"
                }).then(() => { this.route.navigate(['/']) },
                        (dismiss) => {
                          if (dismiss === 'overlay') { this.route.navigate(['/'])  }
                        })
                  .catch((err) => console.log(err));
            } else {
              swal({
                title: 'Attention',
                text: response.message,
                type: 'warning',
                confirmButtonText: "J'ai compris"
                });
            }
          })
        }
    // this.usersService.postApplication(data) //Post data to create a new applying school
    //   .subscribe(
    //     response=>{
    //       let data = response.data;
    //       console.log(response);
    //       if(response.code==200) { //If success
    //         console.log("apply successful");
    //         this.usersService.deleteApplication(data.schools[0].school) //We delete the school in wish list if it's in wish list
    //           .subscribe(
    //             response=>{
    //               console.log(response)
    //             }
    //           )
    //         this.updateProfile();
    //       } else {
    //         console.log(response.message);
    //         this.failSubmit(response.message);
    //       }
    //     }
    //   )
      this.updateProfile();
  }

  updateProfile() {
    // console.log(this.userData);
    this.usersService.putProfile(this.userData) //Update user profile
      .subscribe(
        response => {
          console.log(response)
          if(response.code==400){
            this.failSubmit(response.message.toString());
          } else {
            this.successSubmit();
            this.schoolService.cleanClassName();
          }
        }
      );
  }

  successSubmit() {
    swal({
      title: 'Merci d\'avoir choisi CIDE',
      text: 'Nous transmettons votre dossier aux écoles sélectionné. \nLeurs directions vous contactera dans les meilleurs délais.\nNous venons de vous envoyer un mél de confirmation.',
      type: 'success',
      confirmButtonText: "J'AI COMPRIS"
    });
    if (this.wizardData['pageName'] != "myaccount") {
      this.route.navigate(['/']);
    }
  }

  // Sweet Alert if it fail to submit
  failSubmit(message) {
    swal({
      title: 'Attention',
      text: message,
      type: 'error',
      confirmButtonText: 'Ok'
    })
  }

}
