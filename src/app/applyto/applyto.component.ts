import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { PublicService } from '../services/public.service';
import { BookingService } from '../services/booking.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';

const URL = 'http://54.254.203.172/cideapi/';

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
  canDisplaySiblings : boolean = false;
  canDisplayApply : boolean = false;
  parents : any;
  siblings:any;
  metiers : any;

  constructor(private usersService: UsersService,
              private authService : AuthService,
              private publicService : PublicService,
              private bookingService : BookingService,
              private route : Router,
              private fb : FormBuilder,
              private router : ActivatedRoute) { 
                
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
    this.tokenLog=this.authService.getToken();
    // console.log(this.tokenLog)
    if(this.tokenLog=="" || this.tokenLog == null){
      swal({
        title: 'Attention',
        text: 'Vous devez être connecté afin de prendre un rendez-vous.',
        type: 'warning',
        confirmButtonText: 'Ok'
      })
      this.route.navigate(['/login']);
    }
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
    this.applytoForm.patchValue({
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
    for (let i = 0; i<this.applytoForm.controls['parents']['controls'].length; i++){
      this.applytoForm.controls['parents']['controls'][i].patchValue({
        lienParent : userData.parents[i].relationship,
        titre : userData.parents[i].gender,
        nom : userData.parents[i].lastName,
        prenom : userData.parents[i].firstName,
        email : userData.parents[i].email,
        portable : userData.parents[i].phoneNumber,
        adresse : userData.parents[i].address.address1,
        codepostal : userData.parents[i].address.postCode,
        ville : userData.parents[i].address.city,
        pays : userData.parents[i].address.country,
        job : userData.parents[i].profession,
        horaireJoignable : userData.parents[i].availability
      })
    }
    for (let i = 0; i<this.applytoForm.controls['freresoeur']['controls'].length; i++){
      if(userData.siblings.length!=0){
        this.applytoForm.controls['freresoeur']['controls'][i].patchValue({
          gender : userData.siblings[i].gender,
          age : userData.siblings[i].age,
          niveau : userData.siblings[i].study
        })
      }
    }
    this.canDisplaySiblings=true;
  }

  buildForm(data){
    this.applytoForm = this.fb.group({
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
      bestSubject : ['', Validators.required],
      weakSubject : ['', Validators.required],
      job : this.fb.array([this.createJob()]),
      yourInterest : ['', Validators.required],
      practiceInterest : ['', Validators.required],
    })
    console.log(data)
    if(data.siblings.length>1){
      for(let i = 1; i<data.siblings.length; i++){
        this.applytoForm.controls['freresoeur']['controls'].push((this.createfs()))
      }
    }
    if(data.parents.length>1){
      for(let i = 1; i<data.parents.length; i++){
        this.applytoForm.controls['parents']['controls'].push(this.createParent())
      }
    }
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
    this.userData.address.address1 = this.applytoForm.value.childAddr
    this.userData.address.postCode = this.applytoForm.value.childPostalCode
    this.userData.address.city = this.applytoForm.value.childCity
    this.userData.birthDate = this.applytoForm.value.childBirthDay
    this.userData.birthPlace = this.applytoForm.value.childBirthPlace

    for(let i = 0; i<this.applytoForm.value.freresoeur.length; i++){
      this.userData.siblings[i].age = this.applytoForm.value.freresoeur[i].age
      this.userData.siblings[i].gender = this.applytoForm.value.freresoeur[i].gender
      this.userData.siblings[i].study = this.applytoForm.value.freresoeur[i].niveau
    }

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
      school : this.schoolID
    }

    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          let data = response.data;
          console.log(response);
          if(response.code==400){
            console.log(response.message)
            this.failSubmit(response.message)
          } else {
            console.log("apply successful")
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
            this.successSubmit()
          }
        }
      )
    
}

  successSubmit(){
    swal({
      title: 'Votre demande à bien été enregistré.',
      text: 'Redirection vers le menu principal',
      type: 'success',
      confirmButtonText: 'Ok'
    })
    this.route.navigate(['/']);
  }

  failSubmit(message){
    console.log("test")
    swal({
      title: 'Erreur',
      text: message,
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

  onAddFrSo(){
    this.siblings = this.applytoForm.get('freresoeur') as FormArray;
    this.siblings.push(this.createfs());
  }

  onRemoveFrSo(index){
    this.siblings = this.applytoForm.get('freresoeur') as FormArray;
    this.siblings.removeAt(index, 1);
  }

  onAddJob(){
    this.metiers = this.applytoForm.get('job') as FormArray;
    this.metiers.push(this.createJob());
  }

  onRemoveJob(index){
    this.metiers = this.applytoForm.get('job') as FormArray;
    this.metiers.removeAt(index, 1);
  }
}
