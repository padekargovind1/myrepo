import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterViewInit, OnDestroy {

  tokenLog : boolean = false;
  bookingData:any;
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
  addParents : boolean = true;
  newAppointment={}
  parents : any;
  siblings : any;
  metiers : any;
  primaires : any;
  secondaires : any;
  canDisplaySiblings : boolean = false;
  canDisplayWizard : boolean = false;
  canDisplaySchool : boolean = false;
  @ViewChild('tabGroup') tabGroup;
  maxDate = new Date();

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder,
              private router : ActivatedRoute) { 
                this.initAdviserData();
                
                this.getUserProfile();
                
              }

  ngOnInit() {
    this.tokenLog=this.authService.isUserLoggedIn()
    if(!this.tokenLog){
      swal({
        title: 'Attention',
        text: "Vous devez être connecté afin de prendre un rendez-vous.",
        type: 'warning',
        confirmButtonText: "J'ai compris"
      })
      this.route.navigate(['/login']);
    } else if(!this.bookingService.haveBookingData()){
      swal({
        title: 'Attention',
        text: "Vous devez hoisir un conseiller avant de remplri le formulaire",
        type: 'warning',
        confirmButtonText: "J'ai compris"
      })
      this.route.navigate(['/booking']);
    } else {
      this.appointmentData = this.bookingService.getBookingData();
      console.log(this.appointmentData);
    }
    this.loadScript('assets/js/select2.min.js'); 
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

  ngOnDestroy(){
    this.bookingService.cleanBooking()
    console.log("destroy")
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
    var haveLv1 = (userData.academicHistories[0].languages[1]!==undefined && userData.academicHistories[0].languages[1]!=null) ? true : false;
    var haveLv2 = (userData.academicHistories[0].languages[2]!==undefined && userData.academicHistories[0].languages[2]!=null) ? true : false;
    var hobbies = (userData.hobbies!==undefined && userData.hobbies!=null) ? true : false;
    var interest = (userData.interest!==undefined && userData.interest!=null) ? true : false;
    this.wizardForm.patchValue({
      childLastName : userData.lastName,
      childFirstName : userData.firstName,
      childAge : userData.age,
      childTitle : userData.gender,
      childMel : userData.email,
      childTel : userData.mobilePhone,
      childAddr : IsAdress ? userData.address.address1 : "",
      childPostalCode : IsAdress ? userData.address.postCode : "",
      childCity : IsAdress ? userData.address.city : "",
      childBirthDay : (userData.birthDate!=null && userData.birthDate!="") ? new Date(userData.birthDate) : new Date(),
      childBirthPlace : IsAdress ? userData.birthPlace : "",
      //Current Institution
      schoolName : userData.academicHistories[0].schoolName=="A compléter" ? "" : userData.academicHistories[0].schoolName,
      schoolCity : userData.academicHistories[0].city=="A compléter" ? "" : userData.academicHistories[0].city,
      schoolClasse : userData.academicHistories[0].class=="A compléter" ? "" :userData.academicHistories[0].class,
      schoolOption : userData.academicHistories[0].classType=="A compléter" ? "" :userData.academicHistories[0].classType,
      schoolLv1 : userData.academicHistories[0].languages[0]=="A compléter" ? "" : userData.academicHistories[0].languages[0],
      schoolLv2 : haveLv1 ? userData.academicHistories[0].languages[1] : "",
      schoolLv3 : haveLv2 ? userData.academicHistories[0].languages[2] : "",
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
    for (let i = 0; i<this.wizardForm.controls['freresoeur']['controls'].length; i++){
      if(userData.siblings!==undefined && userData.siblings!=null && userData.siblings.length!=0){
        this.wizardForm.controls['freresoeur']['controls'][i].patchValue({
          gender : userData.siblings[i].gender,
          age : userData.siblings[i].age,
          niveau : userData.siblings[i].study
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
    this.canDisplaySiblings=true;
  }

  buildForm(data){
    this.wizardForm = this.fb.group({
      parents : this.fb.array([this.createParent()]),
      childLastName: ['', Validators.required],
      childFirstName : ['', Validators.required],
      childAge : ['', Validators.required],
      childTitle : ['', Validators.required],
      childMel : ['', Validators.compose([Validators.required, CustomValidators.email])],
      childTel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      childAddr : ['', Validators.required],
      childPostalCode : ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      childCity : ['', Validators.required],
      childBirthDay : [new Date(), Validators.compose([Validators.required, CustomValidators.date])],
      childBirthPlace : ['', Validators.required],
      freresoeur : this.fb.array([this.createfs()]),
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
      interestSubject : ['', Validators.required],
      job : this.fb.array([this.createJob()]),
      yourInterest : ['', Validators.required],
      practiceInterest : ['', Validators.required],
      primary : this.fb.array([this.createPrimaireSchool()]),
      secondary : this.fb.array([this.createSecondarySchool()]),
      reasonDiagnostic : ['', Validators.required],
      note :['', Validators.required],
    });
    if(data.siblings!==undefined && data.siblings!=null && data.siblings.length>1){
      for(let i = 1; i<data.siblings.length; i++){
        this.wizardForm.controls['freresoeur']['controls'].push((this.createfs()))
      }
    }
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
    this.canDisplaySchool=true;
  }

  createParent(){
    return this.fb.group({
      lienParent : ['', Validators.required],
      titre : ['', Validators.required],
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      job : ['', Validators.required],
      email : ['', Validators.compose([CustomValidators.email, Validators.required])],
      portable : ['', Validators.compose([Validators.required,
                                          Validators.maxLength(10)])],
      horaireJoignable : ['', Validators.required]
    })
  }

  createfs(){
    return this.fb.group({
      gender : ['', Validators.required],
      age : ['', Validators.required],
      niveau : ['', Validators.required]
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
      primarySchoolName : [''],
      primarySchoolRepeat : [''],
      causeOfRepeatPrimary : ['']
    })
  }
  createSecondarySchool(){
    return this.fb.group({
      secondarySchoolName : [''],
      secondarySchoolRepeat : [''],
      causeOfRepeatSecondary : ['']
    })
  }

  onSubmit(){
    console.log(this.wizardForm);
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

    this.userData.lastName = this.wizardForm.value.childLastName
    this.userData.firstName = this.wizardForm.value.childFirstName
    this.userData.age = this.wizardForm.value.childAge
    this.userData.gender = this.wizardForm.value.childTitle
    this.userData.email = this.wizardForm.value.childMel
    this.userData.mobilePhone = this.wizardForm.value.childTel
    this.userData.address.address1 = this.wizardForm.value.childAddr
    this.userData.address.postCode = this.wizardForm.value.childPostalCode
    this.userData.address.city = this.wizardForm.value.childCity
    this.userData.birthDate = this.wizardForm.value.childBirthDay
    this.userData.birthPlace = this.wizardForm.value.childBirthPlace

    for(let i = 0; i<this.wizardForm.value.freresoeur.length; i++){
      this.userData.siblings[i].age = this.wizardForm.value.freresoeur[i].age
      this.userData.siblings[i].gender = this.wizardForm.value.freresoeur[i].gender
      this.userData.siblings[i].study = this.wizardForm.value.freresoeur[i].niveau
    }

    this.userData.academicHistories[0].city = this.wizardForm.value.schoolCity
    this.userData.academicHistories[0].class = this.wizardForm.value.schoolClasse
    this.userData.academicHistories[0].classType = this.wizardForm.value.schoolOption
    this.userData.academicHistories[0].schoolName = this.wizardForm.value.schoolName
    this.userData.academicHistories[0].languages = []
    this.userData.academicHistories[0].languages.push(this.wizardForm.value.schoolLv1)
    this.userData.academicHistories[0].languages.push(this.wizardForm.value.schoolLv2)
    this.userData.academicHistories[0].languages.push(this.wizardForm.value.schoolLv3)

    this.userData.attractionToSubjects = [];
    this.userData.attractionToSubjects.push(this.wizardForm.value.bestSubject)
    this.userData.weakAtSubjects = [];
    this.userData.weakAtSubjects.push(this.wizardForm.value.weakSubject)

    this.userData.jobs=[]
    console.log(this.userData)
    for(let i = 0; i<this.wizardForm.value.job.length; i++){
      this.userData.jobs[i]={};
      console.log(this.userData.jobs[i])
      this.userData.jobs[i].profession=this.wizardForm.value.job[i].interestJob
      this.userData.jobs[i].age=this.wizardForm.value.job[i].interestAge
    }

    this.userData.interest = this.wizardForm.value.yourInterest;
    this.userData.hobbies = this.wizardForm.value.practiceInterest;
    this.initNewAppointment();
    this.putProfile();
  }

  initNewAppointment(){
    this.newAppointment = {
      adviser : this.appointmentData[5],
      from: this.appointmentData[0],
      to:this.appointmentData[0]
    }
    this.getPackageById(this.appointmentData[9]);
  }

  putProfile(){
    this.usersService.putProfile(this.userData)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.failSubmit(response.message);
          } else {
            this.successSubmit()
          }
        }
      )
  }

  successSubmit(){
    swal({
      title: 'Votre rendez-vous à bien été enregistré.',
      text: '',
      type: 'success',
      confirmButtonText: "J'AI COMPRIS"
    })
    this.route.navigate(['/'])
  }

  failSubmit(message){
    swal({
      title: 'Erreur',
      text: message,
      type: 'error',
      confirmButtonText: 'Ok'
    })
  }

  getPackageById(packageId){
    this.usersService.getAppointmentsPackage()
      .subscribe(
        response=>{
          console.log(response)
          if(response.code==400){
            console.log(response.message)
          } else {
            console.log(response.data[packageId]._id)
            this.postCreateNewAppointment(response.data[packageId]._id)
          }
        }
      )
  }

  postCreateNewAppointment(packageId){
    console.log(packageId)
    this.usersService.postCreateNewAppointment(this.newAppointment, packageId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(data.code==400){
            console.log(response.message);
          } else {
            console.log('Appointement register')
            this.bookingService.cleanBooking();
          }
        }
      )
  }

  onChecked() {
    var check = this.wizardForm.controls.schoolHelp.value;

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

  onAddFrSo(){
    this.siblings = this.wizardForm.get('freresoeur') as FormArray;
    this.siblings.push(this.createfs());
  }

  onRemoveFrSo(index){
    this.siblings = this.wizardForm.get('freresoeur') as FormArray;
    this.siblings.removeAt(index, 1);
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
