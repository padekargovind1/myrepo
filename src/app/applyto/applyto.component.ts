import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { PublicService } from '../services/public.service';
import { BookingService } from '../services/booking.service';
import { SchoolService } from '../services/school.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';

const URL = 'http://54.254.203.172/cide-school/upload/';

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
  userData:any;
  schoolName : string ="";
  schoolID : string ="";
  schoolLogo : string ="";
  // canDisplaySiblings : boolean = false;
  canDisplayApply : boolean = false;
  parents : any;
  // siblings:any;
  metiers : any;
  @ViewChild('tabGroup') tabGroup;
  maxDate = new Date();

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private publicService : PublicService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder,
              private router : ActivatedRoute,
              private schoolService : SchoolService) { 
                
                this.subscription = this.router.params
                  .subscribe(
                    params => {
                      if(params.hasOwnProperty('schoolId')){
                        this.schoolId=params['schoolId'];
                        this.getSchoolDataById();
                        this.getUserProfile();
                      }
                    }
                  )
              }

  ngOnInit() {
    // console.log(this.tokenLog)
    if(!this.authService.isUserLoggedIn()){
      swal({
        title: 'Attention',
        text: 'Vous devez être connecté afin de prendre un rendez-vous.',
        type: 'warning',
        confirmButtonText: 'Ok'
      })
      this.route.navigate(['/login']);
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
 
  getSchoolDataById(){
    this.publicService.getSchoolById(this.schoolId)
      .subscribe(
        (data) => {
          let response = data;
          // console.log(response);
          if (response.code==400){
            console.log(response.message);
          }else {
            this.schoolName = response.data.longName;
            this.schoolID = response.data._id
            this.schoolLogo = response.data.cycles[0].logo1
          }
        }
      )
  }

  getUserProfile(){
    this.usersService.getProfile()
      .subscribe(
        (response)=>{
          let data = response.data;
          // console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.userData = data[0];
            console.log(this.userData);
            this.buildForm(data[0]);
            this.patchValue(data[0]);
            this.canDisplayApply=true;
          }
        }
      )
  }

  patchValue(userData){
	  var IsAdress = (userData.address!==undefined && userData.address!=null) ? true : false;
    var haveLv1 = false;
    var haveLv2 = false;
	if(userData.academicHistories.length>0 && userData.academicHistories[0].languages !== undefined)
	{
		haveLv1 = (userData.academicHistories[0].languages[1]!==undefined && userData.academicHistories[0].languages[1]!=null) ? true : false;
		haveLv2 = (userData.academicHistories[0].languages[2]!==undefined && userData.academicHistories[0].languages[2]!=null) ? true : false;
	}
    var hobbies = (userData.hobbies!==undefined && userData.hobbies!=null) ? true : false;
    var interest = (userData.interest!==undefined && userData.interest!=null) ? true : false;
	
	var isAcademicHistories = userData.academicHistories.length>0;
	var AcademicHistoriesFirst = userData.academicHistories[0];
    this.applytoForm.patchValue({
      childLastName : userData.lastName=="A compléter" ? "" :userData.lastName,
      childFirstName : userData.firstName=="A compléter" ? "" : userData.firstName,
      childAge : userData.age,
      childTitle : userData.gender,
      childMel : userData.email=="A compléter" ? "" :userData.email,
      childTel : userData.mobilePhone=="A compléter" ? "" :userData.mobilePhone,
      // childAddr : IsAdress ? userData.address.address1 : "",
      // childPostalCode : IsAdress ? userData.address.postCode : "",
      // childCity : IsAdress ? userData.address.city : "",
      // childBirthDay : (userData.birthDate!=null && userData.birthDate!="") ? new Date(userData.birthDate) : new Date(),
      // childBirthPlace : IsAdress ? userData.birthPlace : "",
      //Current Institution
      schoolName : (!isAcademicHistories || AcademicHistoriesFirst.schoolName===undefined || userData.academicHistories[0].schoolName=="A compléter") ? "" : userData.academicHistories[0].schoolName,
      schoolCity : (!isAcademicHistories || AcademicHistoriesFirst.city===undefined || userData.academicHistories[0].city=="A compléter") ? "" : userData.academicHistories[0].city,
      schoolClasse : (!isAcademicHistories || AcademicHistoriesFirst.class===undefined || userData.academicHistories[0].class=="A compléter") ? "" :userData.academicHistories[0].class,
      schoolOption : (!isAcademicHistories || AcademicHistoriesFirst.classType===undefined || userData.academicHistories[0].classType=="A compléter") ? "" :userData.academicHistories[0].classType,
      schoolLv1 : (!isAcademicHistories || AcademicHistoriesFirst.languages===undefined || userData.academicHistories[0].languages[0]=="A compléter") ? "" : userData.academicHistories[0].languages[0],
      schoolLv2 : haveLv1 ? userData.academicHistories[0].languages[1] : "",
      schoolLv3 : haveLv2 ? userData.academicHistories[0].languages[2] : "",
      //Strong and weak subject
      bestSubject : userData.attractionToSubjects,
      weakSubject : userData.weakAtSubjects,
      //Interests
      yourInterest : hobbies ? userData.hobbies : '',
      practiceInterest : interest ? userData.interest : ''
    });
    for (let i = 0; i<this.applytoForm.controls['parents']['controls'].length; i++){
      if(userData.parents!==undefined && userData.parents!=null && userData.parents.length!=0){
        IsAdress = (userData.parents[i].address!==undefined && userData.parents[i].address!=null) ? true : false;
        this.applytoForm.controls['parents']['controls'][i].patchValue({
        lienParent : userData.parents[i].relationship,
        titre : userData.parents[i].gender,
        nom : userData.parents[i].lastName,
        prenom : userData.parents[i].firstName,
        email : userData.parents[i].email,
        portable : userData.parents[i].phoneNumber,
        adresse : IsAdress ? userData.parents[i].address.address1 : "",
        codepostal : IsAdress ? userData.parents[i].address.postCode : "",
        ville : IsAdress ? userData.parents[i].address.city : "",
        pays : IsAdress ? userData.parents[i].address.country : "",
        job : userData.parents[i].profession=="A compléter" ? "" :userData.parents[i].profession,
        // horaireJoignable : userData.parents[i].availability
        })
      }
    }
    // for (let i = 0; i<this.applytoForm.controls['freresoeur']['controls'].length; i++){
    //   if(userData.siblings!==undefined && userData.siblings!=null && userData.siblings.length!=0){
    //     this.applytoForm.controls['freresoeur']['controls'][i].patchValue({
    //       gender : userData.siblings[i].gender,
    //       age : userData.siblings[i].age,
    //       niveau : userData.siblings[i].study
    //     })
    //   }
    // }
	//Jobs
    for (let i = 0; i<this.applytoForm.controls['job']['controls'].length; i++){
      if(userData.jobs!==undefined && userData.jobs!=null && userData.jobs.length!=0){
        this.applytoForm.controls['job']['controls'][i].patchValue({
          interestJob : userData.jobs[i].profession,
          interestAge : userData.jobs[i].age
        })
      }
    }
    // this.canDisplaySiblings=true;
  }

  buildForm(data){
    this.applytoForm = this.fb.group({
      parents : this.fb.array([this.createParent()]),
      childLastName: ['', Validators.required],
      childFirstName : ['', Validators.required],
      childAge : [''],
      childTitle : [''],
      childMel : ['', Validators.compose([Validators.required, CustomValidators.email])],
      childTel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      // childAddr : ['', Validators.required],
      // childPostalCode : ['', Validators.compose([Validators.required, Validators.maxLength(5)])],
      // childCity : ['', Validators.required],
      // childBirthDay : ['', Validators.required],
      // childBirthPlace : ['', Validators.required],
      // freresoeur : this.fb.array([this.createfs()]),
      schoolName:[''],
      schoolCity : [''],
      schoolClasse : ['', Validators.required],
      schoolOption : [''],
      schoolLv1 : [''],
      schoolLv2: [''],
      schoolLv3: [''],
      bestSubject : [''],
      weakSubject : [''],
      interestSubject : [''],
      job : this.fb.array([this.createJob()]),
      yourInterest : [''],
      practiceInterest : [''],
    })
    console.log(data)
    // if(data.siblings.length>1){
    //   for(let i = 1; i<data.siblings.length; i++){
    //     this.applytoForm.controls['freresoeur']['controls'].push((this.createfs()))
    //   }
    // }
    if(data.parents.length>1){
      for(let i = 1; i<data.parents.length; i++){
        this.applytoForm.controls['parents']['controls'].push(this.createParent())
      }
    }
    if(data.jobs!==undefined && data.jobs!=null && data.jobs.length>1){
      for(let i = 1; i<data.jobs.length; i++){
        this.applytoForm.controls['job']['controls'].push(this.createJob())
      }
    }
  }

  createParent(){
    return this.fb.group({
      lienParent : [''],
      titre : [''],
      nom : [''],
      prenom : [''],
      job : [''],
      email : ['', Validators.compose([CustomValidators.email])],
      portable : ['', Validators.compose([Validators.maxLength(10)])],
      horaireJoignable : ['']
    })
  }

  // createfs(){
  //   return this.fb.group({
  //     gender : ['', Validators.required],
  //     age : ['', Validators.required],
  //     niveau : ['', Validators.required]
  //   })
  // }

  createJob(){
    return this.fb.group({
      interestJob : [''],
      interestAge : ['']
    })
  }

  onSubmit(){
    console.log(this.applytoForm.value);
    for(let i = 0; i<this.applytoForm.value.parents.length; i++){
      this.userData.parents[i].profession = this.applytoForm.value.parents[i].job;
      this.userData.parents[i].relationship = this.applytoForm.value.parents[i].lienParent
      this.userData.parents[i].gender = this.applytoForm.value.parents[i].titre
      this.userData.parents[i].lastName = this.applytoForm.value.parents[i].nom
      this.userData.parents[i].firstName = this.applytoForm.value.parents[i].prenom
      this.userData.parents[i].email = this.applytoForm.value.parents[i].email
      this.userData.parents[i].phonenumber = this.applytoForm.value.parents[i].portable
      this.userData.parents[i].availability = this.applytoForm.value.parents[i].horaireJoignable
    }

    this.userData.lastName = this.applytoForm.value.childLastName
    this.userData.firstName = this.applytoForm.value.childFirstName
    this.userData.age = this.applytoForm.value.childAge
    this.userData.gender = this.applytoForm.value.childTitle
    this.userData.email = this.applytoForm.value.childMel
    this.userData.mobilePhone = this.applytoForm.value.childTel
    // this.userData.address.address1 = this.applytoForm.value.childAddr
    // this.userData.address.postCode = this.applytoForm.value.childPostalCode
    // this.userData.address.city = this.applytoForm.value.childCity
    // this.userData.birthDate = this.applytoForm.value.childBirthDay
    // this.userData.birthPlace = this.applytoForm.value.childBirthPlace

    // for(let i = 0; i<this.applytoForm.value.freresoeur.length; i++){
    //   this.userData.siblings[i].age = this.applytoForm.value.freresoeur[i].age
    //   this.userData.siblings[i].gender = this.applytoForm.value.freresoeur[i].gender
    //   this.userData.siblings[i].study = this.applytoForm.value.freresoeur[i].niveau
    // }

    this.userData.academicHistories[0].city = this.applytoForm.value.schoolCity
    this.userData.academicHistories[0].class = this.applytoForm.value.schoolClasse
    this.userData.academicHistories[0].classType = this.applytoForm.value.schoolOption
    this.userData.academicHistories[0].schoolName = this.applytoForm.value.schoolName
    this.userData.academicHistories[0].languages = []
    this.userData.academicHistories[0].languages.push(this.applytoForm.value.schoolLv1)
    this.userData.academicHistories[0].languages.push(this.applytoForm.value.schoolLv2)
    this.userData.academicHistories[0].languages.push(this.applytoForm.value.schoolLv3)

    this.userData.attractionToSubjects = [];
    this.userData.attractionToSubjects.push(this.applytoForm.value.bestSubject)
    this.userData.weakAtSubjects = [];
    this.userData.weakAtSubjects.push(this.applytoForm.value.weakSubject)

    this.userData.jobs=[]
    console.log(this.userData)
    for(let i = 0; i<this.applytoForm.value.job.length; i++){
      this.userData.jobs[i]={};
      console.log(this.userData.jobs[i])
      this.userData.jobs[i].profession=this.applytoForm.value.job[i].interestJob
      this.userData.jobs[i].age=this.applytoForm.value.job[i].interestAge
    }

    this.userData.interest = this.applytoForm.value.yourInterest;
    this.userData.hobbies = this.applytoForm.value.practiceInterest;

    console.log(this.userData)
    const data = {
      type : "apply",
      schools : [{
        school : this.schoolID.toString(), 
        class : "EEE"
      }]
    }
    // console.log(data)

    this.usersService.postApplication(data)
      .subscribe(
         response=>{
           let data = response.data;
          console.log(response);
          if(response.code==400){
             console.log(response.message)
             this.failSubmit(response.message)
          } else {
            console.log("apply successful");
           }
        }
       )
     this.usersService.putProfile(this.userData)
       .subscribe(
         response=>{
           console.log(response)
           if(response.code==400){
             this.failSubmit(response.message);
           } else {
             this.successSubmit();
             this.schoolService.cleanClassName();
           }
        }
       )
    
}

  successSubmit(){
    swal({
      title: 'Merci d\'avoir choisi CIDE',
      text: 'Nous transmettons votre dossier aux écoles sélectionné. \nLeurs directions vous contactera dans les meilleurs délais.\nNous venons de vous envoyer un mél de confirmation.',
      type: 'success',
      confirmButtonText: "J'AI COMPRIS"
    })
    this.route.navigate(['/']);
  }

  failSubmit(message){
    console.log("test")
    swal({
      title: 'Attention',
      text: 'Merci de vérifier le formulaire',
      type: 'error',
      confirmButtonText: 'Ok'
    })
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
    this.parents = this.applytoForm.get('parents') as FormArray;
    this.parents.push(this.createParent());
  }
  onRemoveParent(index){
    this.parents = this.applytoForm.get('parents') as FormArray;
    this.parents.removeAt(index, 1);
  }

  // onAddFrSo(){
  //   this.siblings = this.applytoForm.get('freresoeur') as FormArray;
  //   this.siblings.push(this.createfs());
  // }

  // onRemoveFrSo(index){
  //   this.siblings = this.applytoForm.get('freresoeur') as FormArray;
  //   this.siblings.removeAt(index, 1);
  // }

  onAddJob(){
    this.metiers = this.applytoForm.get('job') as FormArray;
    this.metiers.push(this.createJob());
  }

  onRemoveJob(index){
    this.metiers = this.applytoForm.get('job') as FormArray;
    this.metiers.removeAt(index, 1);
  }

  nextTab(nb){
    this.tabGroup.selectedIndex=nb;
  }
}
