import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterViewInit {

  tokenLog : string ="";
  bookingData=[];
  wizardForm : FormGroup;
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
  userData : any;
  appointmentData=[];
  adviserData: any;
  activeTabIndex = 0;

  checked:boolean=false;

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder,
              private router : ActivatedRoute) { 
                this.initAdviserData();
                this.buildForm();
                this.getUserProfile();
                
              }

  ngOnInit() {
    this.getAdviserId();
    this.tokenLog=this.authService.getToken();
    if(this.tokenLog==""){
      alert("Vous devez être connecté afin de prendre un rendez-vous.");
      this.route.navigate(['/login']);
    } else {
      for(let i = 0; i<4; i++){
        // console.log(this.router.snapshot.params[i])
        this.bookingData[i]=this.router.snapshot.params[i];
      }
      console.log(this.bookingData);
    }
  }

  ngAfterViewInit() {
    // this.datePicker();
    this.checked = false;
  }

  /*
  Remove this method if the api work
  */
  initAdviserData(){
    this.adviserData={
      title : "",
      firstName : "",
      lastName : "",
      photo : ""
    }
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
            this.userData=data[0];
            this.patchValue(this.userData);
          }
        }
      ) 
  }

  patchValue(userData){
    this.wizardForm.patchValue({
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

  getAdviserId(){
    // this.appointmentData=this.bookingService.getAdviserData()
    for(let i = 4; i<9; i++){
      this.appointmentData.push(this.router.snapshot.params[i]);
    }
    console.log(this.appointmentData);
    this.getAdviserData();
  }

  getAdviserData(){
    this.usersService.getAdviserData(this.appointmentData[0])
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
            this.adviserData={
              title : "Mme",
              firstName : "Anita",
              lastName : "Lubies",
              photo : "assets/images/advisor-1.jpg"
            }
          } else {
            this.adviserData=data;
          }
        }
      )
  }

  buildForm(){
    this.wizardForm = this.fb.group({
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
      childSisBroTitle : [''],
      childSisBroAge:[''],
      childSisBroStudy:[''],
      schoolName:['', Validators.required],
      schoolCity : ['', Validators.required],
      schoolClasse : ['', Validators.required],
      schoolOption : ['', Validators.required],
      schoolLv1 : ['', Validators.required],
      schoolLv2: [''],
      schoolLv3: [''],
      schoolHelp : [false],
      schoolHelpSubject : ['', Validators.required],
      bestSubject : ['', Validators.required],
      weakSubject : ['', Validators.required],
      interestJob : ['', Validators.required],
      interestAge : ['', Validators.required],
      yourInterest : ['', Validators.required],
      practiceInterest : ['', Validators.required],
      primarySchoolName : [''],
      primarySchoolRepeat : [''],
      causeOfRepeatPrimary : [''],
      secondarySchoolName : [''],
      secondarySchoolRepeat : [''],
      causeOfRepeatSecondary : [''],
      reasonDiagnostic : ['', Validators.required],
      note :['', Validators.required],
    })
  }

  onSubmit(){
    console.log(this.wizardForm);

    const lienParent = this.wizardForm.controls.lienParent.value;
    const title = this.wizardForm.controls.title.value;
    const lastName = this.wizardForm.controls.lastName.value;
    const firstName = this.wizardForm.controls.firstName.value;
    const job = this.wizardForm.controls.job.value;
    const email = this.wizardForm.controls.email.value;
    const tel = this.wizardForm.controls.tel.value;
    const horaireJoingnable = this.wizardForm.controls.horaireJoingnable.value;
    const childLastName =this.wizardForm.controls.childFirstName.value;
    const childFirstName = this.wizardForm.controls.childFirstName.value;
    const childAge = this.wizardForm.controls.childAge.value;
    const childTitle= this.wizardForm.controls.childTitle.value;
    const childMel = this.wizardForm.controls.childMel.value;
    const childTel = this.wizardForm.controls.childTel.value;
    const childAddr = this.wizardForm.controls.childAddr.value;
    const childPostalCode = this.wizardForm.controls.childPostalCode.value;
    const childCity = this.wizardForm.controls.childCity.value;
    const childBirthDay = this.wizardForm.controls.childBirthDay.value;
    const childBirthPlace = this.wizardForm.controls.childBirthPlace.value;
    const childSisBroTitle = this.wizardForm.controls.childSisBroTitle.value;
    const childSisBroAge = this.wizardForm.controls.childSisBroAge.value;
    const childSisBroStudy = this.wizardForm.controls.childSisBroStudy.value;
    const schoolName = this.wizardForm.controls.schoolName.value;
    const schoolCity = this.wizardForm.controls.schoolCity.value;
    const schoolClasse = this.wizardForm.controls.schoolClasse.value;
    const schoolOption = this.wizardForm.controls.schoolOption.value;
    const schoolLv1 = this.wizardForm.controls.schoolLv1.value;
    const schoolLv2 = this.wizardForm.controls.schoolLv2.value;
    const schoolLv3 = this.wizardForm.controls.schoolLv3.value;
    const schoolHelp = this.wizardForm.controls.schoolHelp.value;
    const schoolHelpSubject = this.wizardForm.controls.schoolHelpSubject.value;
    const bestSubject = this.wizardForm.controls.bestSubject.value;
    const weakSubject = this.wizardForm.controls.weakSubject.value;
    const interestJob = this.wizardForm.controls.interestJob.value;
    const interestAge = this.wizardForm.controls.interestAge.value;
    const yourInterest = this.wizardForm.controls.yourInterest.value;
    const practiceInterest = this.wizardForm.controls.practiceInterest.value;
    const primarySchoolName = this.wizardForm.controls.primarySchoolName.value;
    const primarySchoolRepeat = this.wizardForm.controls.primarySchoolRepeat.value;
    const causeOfRepeatPrimary = this.wizardForm.controls.causeOfRepeatPrimary.value;
    const secondarySchoolName = this.wizardForm.controls.secondarySchoolName.value;
    const secondarySchoolRepeat = this.wizardForm.controls.secondarySchoolRepeat.value;
    const causeOfRepeatSecondary = this.wizardForm.controls.causeOfRepeatSecondary.value;
    const reasonDiagnostic = this.wizardForm.controls.reasonDiagnostic.value;
    const note = this.wizardForm.controls.note.value;

    const data = ({
      lienParent, title, lastName, firstName, job, email, tel, horaireJoingnable, childLastName,
      childFirstName, childAge, childTitle, childMel, childTel, childAddr, childPostalCode, 
      childCity, childBirthDay, childBirthPlace, childSisBroAge, childSisBroStudy, childSisBroTitle,
      schoolName, schoolCity, schoolClasse, schoolOption, schoolLv1, schoolLv2, schoolLv3, schoolHelp,
      schoolHelpSubject, bestSubject, weakSubject, interestJob, interestAge, yourInterest, practiceInterest,
      primarySchoolName, primarySchoolRepeat, causeOfRepeatPrimary, secondarySchoolName, secondarySchoolRepeat,
      causeOfRepeatSecondary, reasonDiagnostic, note 
    });

    // this.usersService.postDataAppointments(data)
    //   .subscribe(
    //     (response)=>{
    //       let data = response.data;
    //       console.log(data);
    //       if(response.code==400){
    //         console.log(response.message);
    //       } else {
    //         console.log('Appointement register')
    //       }
    //     }
    //   )

    console.log(data);
    this.createAppointement();
  }

  createAppointement(){
    const data = {
      "adviser": this.appointmentData[0],
      "from": this.appointmentData[1],
      "to": this.appointmentData[2]
    }

    this.usersService.postCreateNewAppointment(data, this.appointmentData[4]);
  }

  onChecked() {
    var check = this.wizardForm.controls.schoolHelp.value;

    console.log(check);

    this.checked = !check;
  }
}
