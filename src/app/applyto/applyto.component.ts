import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { PublicService } from '../services/public.service';
import { BookingService } from '../services/booking.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CustomValidators } from 'ng2-validation';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-applyto',
  templateUrl: './applyto.component.html',
  styleUrls: ['./applyto.component.scss']
})
export class ApplytoComponent implements OnInit {
  
  tokenLog : string ="";
  applytoForm : FormGroup;
  lienparents = [ "Père", 
                "Mère", 
                "Oncle", 
                "Tante", 
                "Grand-Père", 
                "Grand-Mère", 
                "Tuteur", 
                "Tutrice"];
  langues = ["Français", "Anglais", "Espagnol", "Allemand", "Italien"];
  primarySchool = ["CP", "CE1", "CE2", "CM1", "CM2"];
  secondarySchool = ["6ème", "5ème", "4ème", "3ème", "2nde", "1er", "Terminal"];
  userId ="";
  activeTabIndex = 0;
  subscription : Subscription;
  schoolId="";
  schoolData:any;
  userData:any;
  parents = ["Parent 1"];
  freresoeur = ["Frère/Soeur 1"];

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private publicService : PublicService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder,
              private router : ActivatedRoute) { 
                this.buildForm();
                this.subscription = this.router.params
                  .subscribe(
                    params => {
                      if(params.hasOwnProperty('schoolId')){
                        this.schoolId=params['schoolId'];
                        this.getSchoolDataById();
                      }
                    }
                  )
              }

 ngOnInit() {
    this.tokenLog=this.authService.getToken();
    if(this.tokenLog==""){
      alert("Vous devez être connecté afin de prendre un rendez-vous.");
      this.route.navigate(['/login']);
    }
  }

  getSchoolDataById(){
    this.publicService.getSchoolById(this.schoolId)
      .subscribe(
        (data) => {
          let response = data;
          console.log(response);
          if (response.code==400){
            console.log(response.message);
          }else {
            this.schoolData = response.data;
            console.log(this.schoolData);
          }
        }
      )
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.userData = data[0];
            this.patchValue(data[0]);
          }
        }
      )
  }

  patchValue(userData){
    this.applytoForm.patchValue({
      lienParent : userData.parents[0].relationship,
      title : userData.parents[0].gender,
      lastName : userData.parents[0].lastName,
      firstName : userData.parents[0].firstName,
      email: userData.parents[0].email,
      tel : userData.parents[0].phoneNumber,
      childLastName : userData.lastName,
      childFirstName : userData.firstName,
      childAge : userData.age,
      childTitle : userData.gender,
      childMel : userData.email,
      childTel : userData.mobilePhone,
      childAddr : userData.address.address1,
      childPostalCode : userData.address.postCode,
      childCity : userData.address.city,
      childBirthDay : userData.birthDate,
      childBirthPlace : userData.birthPlace
    });
  }

  buildForm(){
    this.applytoForm = this.fb.group({
      lienParent : ['', Validators.required],
      title : ['', Validators.required],
      lastName : ['', Validators.required],
      firstName : ['', Validators.required],
      job : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, CustomValidators.email])],
      tel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      horaireJoingnable : ['', Validators.required],
      childLastName: ['', Validators.required],
      childFirstName : ['', Validators.required],
      childAge : ['', Validators.required],
      childTitle : ['', Validators.required],
      childMel : ['', Validators.compose([Validators.required, CustomValidators.email])],
      childTel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      childAddr : ['', Validators.required],
      childPostalCode : ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      childCity : ['', Validators.required],
      childBirthDay : ['', Validators.required],
      childBirthPlace : ['', Validators.required],
      childSisBroTitle : ['', Validators.required],
      childSisBroAge:[''],
      childSisBroStudy:[''],
      schoolName:['', Validators.required],
      schoolCity : ['', Validators.required],
      schoolClasse : ['', Validators.required],
      schoolOption : ['', Validators.required],
      schoolLv1 : ['', Validators.required],
      schoolLv2: [''],
      schoolLv3: [''],
      bestSubject : ['', Validators.required],
      weakSubject : ['', Validators.required],
      interestJob : ['', Validators.required],
      interestAge : ['', Validators.required],
      yourInterest : ['', Validators.required],
      practiceInterest : ['', Validators.required],
    })
  }

  onSubmit(){
    console.log(this.applytoForm.value);

    const lienParent = this.applytoForm.controls.lienParent.value;
    const title = this.applytoForm.controls.title.value;
    const lastName = this.applytoForm.controls.lastName.value;
    const firstName = this.applytoForm.controls.firstName.value;
    const job = this.applytoForm.controls.job.value;
    const email = this.applytoForm.controls.email.value;
    const tel = this.applytoForm.controls.tel.value;
    const horaireJoingnable = this.applytoForm.controls.horaireJoingnable.value;
    const childLastName =this.applytoForm.controls.childFirstName.value;
    const childFirstName = this.applytoForm.controls.childFirstName.value;
    const childAge = this.applytoForm.controls.childAge.value;
    const childTitle= this.applytoForm.controls.childTitle.value;
    const childMel = this.applytoForm.controls.childMel.value;
    const childTel = this.applytoForm.controls.childTel.value;
    const childAddr = this.applytoForm.controls.childAddr.value;
    const childPostalCode = this.applytoForm.controls.childPostalCode.value;
    const childCity = this.applytoForm.controls.childCity.value;
    const childBirthDay = this.applytoForm.controls.childBirthDay.value;
    const childBirthPlace = this.applytoForm.controls.childBirthPlace.value;
    const childSisBroTitle = this.applytoForm.controls.childSisBroTitle.value;
    const childSisBroAge = this.applytoForm.controls.childSisBroAge.value;
    const childSisBroStudy = this.applytoForm.controls.childSisBroStudy.value;
    const schoolName = this.applytoForm.controls.schoolName.value;
    const schoolCity = this.applytoForm.controls.schoolCity.value;
    const schoolClasse = this.applytoForm.controls.schoolClasse.value;
    const schoolOption = this.applytoForm.controls.schoolOption.value;
    const schoolLv1 = this.applytoForm.controls.schoolLv1.value;
    const schoolLv2 = this.applytoForm.controls.schoolLv2.value;
    const schoolLv3 = this.applytoForm.controls.schoolLv3.value;
    const bestSubject = this.applytoForm.controls.bestSubject.value;
    const weakSubject = this.applytoForm.controls.weakSubject.value;
    const interestJob = this.applytoForm.controls.interestJob.value;
    const interestAge = this.applytoForm.controls.interestAge.value;
    const yourInterest = this.applytoForm.controls.yourInterest.value;
    const practiceInterest = this.applytoForm.controls.practiceInterest.value;
    

    const data = ({
      lienParent, title, lastName, firstName, job, email, tel, horaireJoingnable, childLastName,
      childFirstName, childAge, childTitle, childMel, childTel, childAddr, childPostalCode, 
      childCity, childBirthDay, childBirthPlace, childSisBroAge, childSisBroStudy, childSisBroTitle,
      schoolName, schoolCity, schoolClasse, schoolOption, schoolLv1, schoolLv2, schoolLv3, bestSubject, weakSubject, interestJob, interestAge, yourInterest, practiceInterest
    });

    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message)
          } else {
            console.log("apply successful")
          }
        }
      )
}
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  onAddParent(){
    if(this.parents.length==1){
      this.parents.push("Parent 2")
    }
  }
  onRemoveParent(){
    if(this.parents.length==2){
      this.parents.splice(1,1);
    }
  }

  onAddFrSo(){
    const nb = this.freresoeur.length+1;
    this.freresoeur.push("Frère/Soeur "+nb);
  }

  onRemoveFrSo(){
    if(this.freresoeur.length!=0){
      const nb = this.freresoeur.length-1;
      this.freresoeur.splice(nb, 1);
    }
  }
}
