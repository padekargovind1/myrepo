import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
    this.wizardForm.patchValue({
      childLastName : userData.lastName,
      childFirstName : userData.firstName,
      childAge : userData.age,
      childTitle : userData.gender,
      childMel : userData.email,
      childTel : userData.mobilePhone,
      //childAddr : userData.address.address1,
      //childPostalCode : userData.address.postCode,
      //childCity : userData.address.city,
      //childBirthDay : userData.birthDate,
      //childBirthPlace : userData.birthPlace
    });
    for (let i = 0; i<this.wizardForm.controls['parents']['controls'].length; i++){
		if(userData.parents.length!=0){
		  this.wizardForm.controls['parents']['controls'][i].patchValue({
			lienParent : userData.parents[i].relationship,
			titre : userData.parents[i].gender,
			nom : userData.parents[i].lastName,
			prenom : userData.parents[i].firstName,
			email : userData.parents[i].email,
			portable : userData.parents[i].phoneNumber,
			adresse : userData.parents[i].address.address1,
			codepostal : userData.parents[i].address.postCode,
			ville : userData.parents[i].address.city,
			pays : userData.parents[i].address.country
		  })
		}
    }
    for (let i = 0; i<this.wizardForm.controls['freresoeur']['controls'].length; i++){
      if(userData.siblings.length!=0){
        this.wizardForm.controls['freresoeur']['controls'][i].patchValue({
          gender : userData.siblings[i].gender,
          age : userData.siblings[i].age,
          niveau : userData.siblings[i].study
        })
      }
    }
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
      childBirthDay : ['', Validators.required],
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
      job : this.fb.array([this.createJob()]),
      yourInterest : ['', Validators.required],
      practiceInterest : ['', Validators.required],
      primary : this.fb.array([this.createPrimaireSchool()]),
      secondary : this.fb.array([this.createSecondarySchool()]),
      reasonDiagnostic : ['', Validators.required],
      note :['', Validators.required],
    });
    if(data.siblings.length>1){
      for(let i = 1; i<data.siblings.length; i++){
        this.wizardForm.controls['freresoeur']['controls'].push((this.createfs()))
      }
    }
    if(data.parents.length>1){
      for(let i = 1; i<data.parents.length; i++){
        this.wizardForm.controls['parents']['controls'].push(this.createParent())
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

    // const lienParent = this.wizardForm.controls.lienParent.value;
    // const title = this.wizardForm.controls.title.value;
    // const lastName = this.wizardForm.controls.lastName.value;
    // const firstName = this.wizardForm.controls.firstName.value;
    // const job = this.wizardForm.controls.job.value;
    // const email = this.wizardForm.controls.email.value;
    // const tel = this.wizardForm.controls.tel.value;
    // const horaireJoingnable = this.wizardForm.controls.horaireJoingnable.value;
    // const childLastName =this.wizardForm.controls.childFirstName.value;
    // const childFirstName = this.wizardForm.controls.childFirstName.value;
    // const childAge = this.wizardForm.controls.childAge.value;
    // const childTitle= this.wizardForm.controls.childTitle.value;
    // const childMel = this.wizardForm.controls.childMel.value;
    // const childTel = this.wizardForm.controls.childTel.value;
    // const childAddr = this.wizardForm.controls.childAddr.value;
    // const childPostalCode = this.wizardForm.controls.childPostalCode.value;
    // const childCity = this.wizardForm.controls.childCity.value;
    // const childBirthDay = this.wizardForm.controls.childBirthDay.value;
    // const childBirthPlace = this.wizardForm.controls.childBirthPlace.value;
    // const childSisBroTitle = this.wizardForm.controls.childSisBroTitle.value;
    // const childSisBroAge = this.wizardForm.controls.childSisBroAge.value;
    // const childSisBroStudy = this.wizardForm.controls.childSisBroStudy.value;
    // const schoolName = this.wizardForm.controls.schoolName.value;
    // const schoolCity = this.wizardForm.controls.schoolCity.value;
    // const schoolClasse = this.wizardForm.controls.schoolClasse.value;
    // const schoolOption = this.wizardForm.controls.schoolOption.value;
    // const schoolLv1 = this.wizardForm.controls.schoolLv1.value;
    // const schoolLv2 = this.wizardForm.controls.schoolLv2.value;
    // const schoolLv3 = this.wizardForm.controls.schoolLv3.value;
    // const schoolHelp = this.wizardForm.controls.schoolHelp.value;
    // const schoolHelpSubject = this.wizardForm.controls.schoolHelpSubject.value;
    // const bestSubject = this.wizardForm.controls.bestSubject.value;
    // const weakSubject = this.wizardForm.controls.weakSubject.value;
    // const interestJob = this.wizardForm.controls.interestJob.value;
    // const interestAge = this.wizardForm.controls.interestAge.value;
    // const yourInterest = this.wizardForm.controls.yourInterest.value;
    // const practiceInterest = this.wizardForm.controls.practiceInterest.value;
    // const primarySchoolName = this.wizardForm.controls.primarySchoolName.value;
    // const primarySchoolRepeat = this.wizardForm.controls.primarySchoolRepeat.value;
    // const causeOfRepeatPrimary = this.wizardForm.controls.causeOfRepeatPrimary.value;
    // const secondarySchoolName = this.wizardForm.controls.secondarySchoolName.value;
    // const secondarySchoolRepeat = this.wizardForm.controls.secondarySchoolRepeat.value;
    // const causeOfRepeatSecondary = this.wizardForm.controls.causeOfRepeatSecondary.value;
    // const reasonDiagnostic = this.wizardForm.controls.reasonDiagnostic.value;
    // const note = this.wizardForm.controls.note.value;
    // const id = this.appointmentData[7];

    // const data = ({
    //   lienParent, title, lastName, firstName, job, email, tel, horaireJoingnable, childLastName,
    //   childFirstName, childAge, childTitle, childMel, childTel, childAddr, childPostalCode, 
    //   childCity, childBirthDay, childBirthPlace, childSisBroAge, childSisBroStudy, childSisBroTitle,
    //   schoolName, schoolCity, schoolClasse, schoolOption, schoolLv1, schoolLv2, schoolLv3, schoolHelp,
    //   schoolHelpSubject, bestSubject, weakSubject, interestJob, interestAge, yourInterest, practiceInterest,
    //   primarySchoolName, primarySchoolRepeat, causeOfRepeatPrimary, secondarySchoolName, secondarySchoolRepeat,
    //   causeOfRepeatSecondary, reasonDiagnostic, note, id
    // });
    let data = {};
    data['parents']=[]
    console.log(data);
    this.initNewAppointment();
  }

  initNewAppointment(){
    this.newAppointment = {
      adviser : this.appointmentData[5],
      from: this.appointmentData[0],
      to:this.appointmentData[0]
    }
    this.getPackageById(this.appointmentData[9]);
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
            swal({
              title: 'Votre rendez-vous à bien été enregistré.',
              text: '',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.route.navigate(['/'])
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
}
