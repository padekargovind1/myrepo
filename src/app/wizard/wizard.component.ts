import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
//import { PublicService } from '../services/public.service';
import { DateAdapter } from '@angular/material';

import {MyAccountMdl,
        MyAccountParentMdl,
        MyAccountAdresse,
        MyAccountSocialAdrMdl,
        MyAccountHistoryMdl,
        MyAccountBulletin,
        MyAccountSiblingsMdl } from '../model/myaccount.model';

import { CustomValidators } from 'ng2-validation';
import swal from "sweetalert2";
import {HelperService} from "../services/helper.service";
import {WizardService} from "../services/wizard.service";
@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers:[DatePipe]
})
export class WizardComponent implements OnInit, AfterViewInit {

  //tokenLog : boolean = false;
  //bookingData:any;
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
  subjectSchool = ["Maths", "Sciences", "Physiques", "Sciences Naturelles", "Histoire",
                  "Géographie", "Instruction Civique", "Sport", "Musique",
                  "Arts Plastiques", "Français", "Anglais", "Espagnol", "Allemand",
                  "Italien"]
  userData : any;
  appointmentData=[];
  adviserData: any;
  activeTabIndex = 0;
  checked:boolean=false;
  //addParents : boolean = true;
  newAppointment={}
  parents : any;
  // siblings : any;
  metiers : any;
  primaires : any;
  secondaires : any;
  // canDisplaySiblings : boolean = false;
  canDisplayWizard : boolean = false;
  canDisplaySchool : boolean = false;
  @ViewChild('tabGroup') tabGroup;
  maxDate = new Date();
  onMobile:boolean=false;

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder,
              //private router : ActivatedRoute,
              //private publicService : PublicService,
			        private dateAdapter: DateAdapter<Date>,
              //public datepipe: DatePipe
              public helperService : HelperService,
              public wizardService : WizardService
              ) {
    this.dateAdapter.setLocale('nl');
    this.initAdviserData();
    if(this.authService.isUserLoggedIn()){
      this.getUserProfile();
    }else{
      let data = null;
      this.buildForm(data);
      this.canDisplayWizard=true;
      this.makeUserDataProfile();
    }
  }

  ngOnInit() {
    if(!this.bookingService.haveBookingData()){
      swal({
        title: 'Attention',
        text: "Vous devez choisir un conseiller avant de remplir le formulaire",
        type: 'warning',
        confirmButtonText: "J'ai compris"
      })
      this.route.navigate(['/booking']);
    } else {
      this.appointmentData = this.bookingService.getBookingData();
      console.log(this.appointmentData);
    }
    this.loadScript('assets/js/select2.min.js');
    this.runScript();
    var self = this;
    swal({
        text: "<font color='#fff'>Afin de preparer votre entretien dans les meilleures conditions, merci de bien vouloir completer ce questionnaire 48h avant le rendez-vous.</font>",
        showCancelButton: true,
        width: 550,
        confirmButtonColor: '#70AD47',
        cancelButtonClass: 'btn-cancel-wizard',
        confirmButtonText: "Je complete maintenant",
        cancelButtonText: 'Je complete plus tard',
        background: '#4472C4',
        reverseButtons: true
    }).then(function () {
      //user click on Je complete maintenant
    }, function (dismiss) {
      //user click on Je complete plus tard -> create a new Appointment
      console.log(dismiss)
      self.getPackageById(self.appointmentData[9]);
    })
  }

   loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }

  ngAfterViewInit() {
    // this.datePicker();
    this.checked = false;
  }
  runScript(){
		var checkMobile = this.helperService.detectmob();
		if (checkMobile) {
		  console.log(checkMobile)
		  this.onMobile=true;
		  $('.select-all-advisor').on('click', function() {
			  $(this).hide();
			  $('.deselect-all-advisor').show();
		  });
		  $('.deselect-all-advisor').on('click', function() {
			  $(this).hide();
			  $('.select-all-advisor').show();
		  });
		}else {
		  this.onMobile=false;
		}
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

  makeUserDataProfile(){
    this.userData=new MyAccountMdl();
    this.userData.parents=[];
    this.userData.parents.push(new MyAccountParentMdl());
    this.userData.parents[0].address = new MyAccountAdresse();
    this.userData.address = new MyAccountAdresse();
    this.userData.socialAddresses = new MyAccountSocialAdrMdl();
    this.userData.academicHistories[0]={};
    this.userData.academicHistories[0] = new MyAccountHistoryMdl();
    this.userData.bulletins[0] = new MyAccountBulletin();
    this.userData.siblings[0]=new MyAccountSiblingsMdl();
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
            this.buildForm(this.userData);
            this.patchValue(this.userData);
            this.canDisplayWizard=true;
          }
        }
      )
  }

  patchValue(userData){
    console.log(userData)
	  var IsAdress = (userData.address!==undefined && userData.address!=null) ? true : false;
    var haveLanguage = (userData.academicHistories.length!=0) ? true : false;
    var haveLv1 = false;
    var haveLv2 = false;
    var hobbies = (userData.hobbies!==undefined && userData.hobbies!=null) ? true : false;
    var interest = (userData.interest!==undefined && userData.interest!=null) ? true : false;
    this.wizardForm.patchValue({
      childLastName : userData.lastName=="A compléter" ? "" :userData.lastName,
      childFirstName : userData.firstName=="A compléter" ? "" :userData.firstName,
      childAge : userData.age=="A compléter" ? "" :userData.age,
      childTitle : userData.gender=="A compléter" ? "" :userData.gender,
      childMel : userData.email=="A compléter" ? "" :userData.email,
      childTel : userData.mobilePhone=="A compléter" ? "" :userData.mobilePhone,
      childBirthPlace: (userData.birthPlace != null && userData.birthPlace != "" && userData.birthPlace != "A compléter") ? userData.birthPlace : "",
      //Strong and weak subject
      bestSubject : userData.attractionToSubjects,
      weakSubject : userData.weakAtSubjects,
      //Interests
      yourInterest : hobbies ? userData.hobbies : '',
      practiceInterest : interest ? userData.interest : '',
      //School help
      schoolHelp : '',
      //Diagnostic
      reasonDiagnostic : '',
      note : ''
    });
    if(haveLanguage){
      this.wizardForm.patchValue({
        //Current Institution
        schoolName : userData.academicHistories[0].schoolName=="A compléter" ? "" : userData.academicHistories[0].schoolName,
        schoolCity : userData.academicHistories[0].city=="A compléter" ? "" : userData.academicHistories[0].city,
        schoolClasse : userData.academicHistories[0].class=="A compléter" ? "" :userData.academicHistories[0].class,
        schoolOption : userData.academicHistories[0].classType=="A compléter" ? "" :userData.academicHistories[0].classType,
        schoolLv1 : userData.academicHistories[0].languages[0]=="A compléter" ? "" : userData.academicHistories[0].languages[0],
        schoolLv2 : haveLv1 ? userData.academicHistories[0].languages[1] : "",
        schoolLv3 : haveLv2 ? userData.academicHistories[0].languages[2] : "",
      })
    }
    //Patch parent form
    for (let i = 0; i<this.wizardForm.controls['parents']['controls'].length; i++){
      if(userData.parents!==undefined && userData.parents!=null && userData.parents.length!=0){
        IsAdress = (userData.parents[i].address!==undefined && userData.parents[i].address!=null) ? true : false;
        this.wizardForm.controls['parents']['controls'][i].patchValue({
        lienParent : userData.parents[i].relationship,
        titre : userData.parents[i].gender,
        nom : userData.parents[i].lastName,
        prenom : userData.parents[i].firstName,
        email : userData.parents[i].email,
        portable : userData.parents[i].phoneNumber,
        adresse : IsAdress ? userData.parents[i].address.address1 : "",
        codepostal : IsAdress ? userData.parents[i].address.postCode : "",
        ville : IsAdress ? userData.parents[i].address.city : "",
        pays : IsAdress ? userData.parents[i].address.country : ""
        })
      }
    }
	//Jobs
    for (let i = 0; i<this.wizardForm.controls['job']['controls'].length; i++){
      if(userData.jobs!==undefined && userData.jobs!=null && userData.jobs.length!=0){
        this.wizardForm.controls['job']['controls'][i].patchValue({
          interestJob : userData.jobs[i].profession,
          interestAge : userData.jobs[i].age
        })
      }
    }
	//Primary SChool
    //for (let i = 0; i<this.wizardForm.controls['primary']['controls'].length; i++){
      //if(userData.primary!==undefined && userData.primary!=null && userData.primary.length!=0){
        //this.wizardForm.controls['primary']['controls'][i].patchValue({
          //primarySchoolName : '',//userData.primary[i].job,
          //primarySchoolRepeat : '',
          //causeOfRepeatPrimary : ''
        //})
      //}
    //}
	//Secondary SChool
    //for (let i = 0; i<this.wizardForm.controls['secondary']['controls'].length; i++){
      //if(userData.secondary!==undefined && userData.secondary!=null && userData.secondary.length!=0){
        //this.wizardForm.controls['secondary']['controls'][i].patchValue({
          //secondarySchoolName : '',//userData.secondary[i].job,
          //secondarySchoolRepeat : '',
          //causeOfRepeatSecondary : ''
        //})
      //}
    //}
  }

  buildForm(data){
    this.wizardForm = this.fb.group({
      parents : this.fb.array([this.createParent()]),
      childLastName: ['', Validators.required],
      childFirstName : ['', Validators.required],
      childAge : ['', Validators.required],
      childTitle : ['', Validators.required],
      childBirthDay : [null, Validators.compose([CustomValidators.date, Validators.required])],
      childBirthPlace : ['', Validators.required],
      schoolName:['', Validators.required],
      schoolCity : ['', Validators.required],
      schoolClasse : ['', Validators.required],
      schoolOption : [''],
      schoolLv1 : [''],
      schoolLv2: [''],
      schoolLv3: [''],
      schoolHelp : [false],
      schoolHelpSubject : [''],
      bestSubject : ['', Validators.required],
      weakSubject : ['', Validators.required],
      interestSubject : ['', Validators.required],
      job : this.fb.array([this.createJob()]),
      yourInterest : ['', Validators.required],
      practiceInterest : [''],
      primary : this.fb.array([this.createPrimaireSchool()]),
      secondary : this.fb.array([this.createSecondarySchool()]),
      reasonDiagnostic : [''],
      note :[''],
    });
    if(data!=null){
      if(data.parents!==undefined && data.parents!=null && data.parents.length>1){
        for(let i = 1; i<data.parents.length; i++){
          this.wizardForm.controls['parents']['controls'].push(this.createParent())
        }
      }
      if(data.jobs!==undefined && data.jobs!=null && data.jobs.length>1){
        for(let i = 1; i<data.jobs.length; i++){
          this.wizardForm.controls['job']['controls'].push(this.createJob())
        }
      }
    }
    this.canDisplaySchool=true;
  }

  createParent(){
    return this.fb.group({
      lienParent : ['', Validators.required],
      titre : ['', Validators.required],
      nom : ['',Validators.required],
      prenom : ['', Validators.required],
      job : ['', Validators.required],
      email : ['', Validators.compose([CustomValidators.email, Validators.required])],
      portable : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      horaireJoignable : ['', Validators.required]
    })
  }

  createJob(){
    return this.fb.group({
      interestJob : ['', Validators.required],
      interestAge : ['', Validators.required]
    })
  }

  createPrimaireSchool(){
    return this.fb.group({
      primarySchoolName : ['', Validators.required],
      primarySchoolRepeat : ['', Validators.required],
      causeOfRepeatPrimary : ['', Validators.required]
    })
  }
  createSecondarySchool(){
    return this.fb.group({
      secondarySchoolName : ['', Validators.required],
      secondarySchoolRepeat : ['', Validators.required],
      causeOfRepeatSecondary : ['', Validators.required]
    })
  }

  onSubmit(){
    if(!this.wizardService.professionListIsvalid()){
      this.wizardService.notValid();
    } else {
      let professionList = this.wizardService.transformToOneObject();
      console.log(this.wizardForm, this.userData);
      this.userData['favoriteProfessions']=professionList;
      if(this.userData.parents.length!=0){
        for(let i = 0; i<this.wizardForm.value.parents.length; i++){
          this.userData.parents[i].profession = this.wizardForm.value.parents[i].job;
          this.userData.parents[i].relationship = this.wizardForm.value.parents[i].lienParent
          this.userData.parents[i].gender = this.wizardForm.value.parents[i].titre
          this.userData.parents[i].lastName = this.wizardForm.value.parents[i].nom
          this.userData.parents[i].firstName = this.wizardForm.value.parents[i].prenom
          this.userData.parents[i].email = this.wizardForm.value.parents[i].email
          this.userData.parents[i].phonenumber = this.wizardForm.value.parents[i].portable
          this.userData.parents[i].availability = this.wizardForm.value.parents[i].horaireJoignable
        }
      }
      this.userData.lastName = this.wizardForm.value.childLastName
      this.userData.firstName = this.wizardForm.value.childFirstName
      this.userData.age = this.wizardForm.value.childAge===undefined || this.wizardForm.value.childAge==' '? this.wizardForm.value.childAge : 2;
      this.userData.gender = this.wizardForm.value.childTitle!==undefined ? this.wizardForm.value.childTitle : 'A compléter'
      this.userData.email = this.wizardForm.value.childMel
      this.userData.mobilePhone = this.wizardForm.value.childTel
      this.userData.birthDate = this.wizardForm.value.childBirthDay
      this.userData.birthPlace = this.wizardForm.value.childBirthPlace
      if(this.userData.academicHistories.length!=0){
        this.userData.academicHistories[0].city = this.wizardForm.value.schoolCity
        this.userData.academicHistories[0].class = this.wizardForm.value.schoolClasse
        this.userData.academicHistories[0].classType = this.wizardForm.value.schoolOption
        this.userData.academicHistories[0].schoolName = this.wizardForm.value.schoolName
        this.userData.academicHistories[0].languages = []
        this.userData.academicHistories[0].languages.push(this.wizardForm.value.schoolLv1)
        this.userData.academicHistories[0].languages.push(this.wizardForm.value.schoolLv2)
        this.userData.academicHistories[0].languages.push(this.wizardForm.value.schoolLv3)
      }
      this.userData.attractionToSubjects = [];
      this.userData.attractionToSubjects.push(this.wizardForm.value.bestSubject)
      this.userData.weakAtSubjects = [];
      this.userData.weakAtSubjects.push(this.wizardForm.value.weakSubject)
      this.userData.jobs=[]
      console.log(this.userData)
      for(let i = 0; i<this.wizardForm.value.job.length; i++){
        this.userData.jobs[i]={};
        console.log(this.userData.jobs[i])
        this.userData.jobs[i].profession=this.wizardForm.value.job[i].interestJob;
        this.userData.jobs[i].age=this.wizardForm.value.job[i].interestAge!='' ? this.wizardForm.value.job[i].interestAge : 0
      }
      this.userData.interest = this.wizardForm.value.yourInterest;
      this.userData.hobbies = this.wizardForm.value.practiceInterest;
      this.userData.photo = false;
      this.userData.disabilityStatus = false;
      this.userData.address = new MyAccountAdresse();
      this.newAppointment = {
        adviser : this.appointmentData[5],
        from: this.appointmentData[0],
        to:this.appointmentData[0]
      }
      console.log(this.wizardForm)
      if(this.authService.isUserLoggedIn()){
        console.log(this.appointmentData);
        this.getPackageById(this.appointmentData[9]);
        //this.putProfile(); // Wait for API fix
      } else {
        var packageIndex = this.bookingService.getBookingPackage()[3];
        console.log(packageIndex);
        this.bookingService.storeAppointmentData(this.newAppointment, packageIndex, this.userData);
        this.route.navigate(['/login']);
      }
    }
  }

  putProfile(){
    console.log(this.userData)
    this.usersService.putProfile(this.userData)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code==400){
            this.failSubmit(response.message);
          } else {
            this.bookingService.successSubmit();
          }
        }
      )
  }

  failSubmit(message){
    swal({
      title: 'Attention',
      text: 'Il nous manque des informations',
      type: 'error',
      confirmButtonText: "J'AI COMPRIS"
    })
  }

  getPackageById(packageId){
    //console.log(packageId)
    this.usersService.getAppointmentsPackage()
      .subscribe(
        response=>{
          console.log(response)
          if(response.code==400){
            console.log(response.message)
          } else {
            console.log(response.data[packageId]._id)
            this.postCreateNewAppointment(response.data[packageId]._id);
          }
        }
      )
  }

  postCreateNewAppointment(packageId){
    console.log(packageId);
    this.usersService.postCreateNewAppointment(this.newAppointment, packageId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(data.code==400){
            console.log(response.message);
            this.failSubmit(response.message);
          } else {
            //Update the appointment
            //this.wizardService.updateAppointment(data._id, this.wizardForm.value)
            console.log('Appointement register')
            this.bookingService.successSubmit();
            setTimeout(()=>{
              this.bookingService.cleanBooking();
            }, 20);
          }
        }
      )
  }

  onChecked() {
    var check = this.wizardForm.controls['schoolHelp'].value;

    console.log(check);

    this.checked = !check;
  }

  onAddParent(){
    this.parents = this.wizardForm.get('parents') as FormArray;
    this.parents.push(this.createParent());
  }
  onRemoveParent(index){
    this.parents = this.wizardForm.get('parents') as FormArray;
    this.parents.removeAt(index, 1);
  }

  onAddJob(){
    this.metiers = this.wizardForm.get('job') as FormArray;
    this.metiers.push(this.createJob());
  }

  onRemoveJob(index){
    this.metiers = this.wizardForm.get('job') as FormArray;
    this.metiers.removeAt(index, 1);
  }

  onAddPrimaire(){
    this.primaires = this.wizardForm.get('primary') as FormArray;
    this.primaires.push(this.createPrimaireSchool());
  }

  onRemovePrimaire(index){
    this.primaires = this.wizardForm.get('primary') as FormArray;
    this.primaires.removeAt(index, 1);
  }

  onAddSecondaire(){
    this.secondaires = this.wizardForm.get('secondary') as FormArray;
    this.secondaires.push(this.createSecondarySchool());
  }

  onRemoveSecondaire(index){
    this.secondaires = this.wizardForm.get('secondary') as FormArray;
    this.secondaires.removeAt(index, 1);
  }

  nextTab(nb){
    this.tabGroup.selectedIndex=nb;
  }
}
