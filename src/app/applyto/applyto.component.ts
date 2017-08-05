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
            // console.log(this.userData);
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
        pays : userData.parents[i].address.country
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

    // const lienParent = this.applytoForm.controls.lienParent.value;
    // const title = this.applytoForm.controls.title.value;
    // const lastName = this.applytoForm.controls.lastName.value;
    // const firstName = this.applytoForm.controls.firstName.value;
    // const job = this.applytoForm.controls.job.value;
    // const email = this.applytoForm.controls.email.value;
    // const tel = this.applytoForm.controls.tel.value;
    // const horaireJoingnable = this.applytoForm.controls.horaireJoingnable.value;
    // const childLastName =this.applytoForm.controls.childFirstName.value;
    // const childFirstName = this.applytoForm.controls.childFirstName.value;
    // const childAge = this.applytoForm.controls.childAge.value;
    // const childTitle= this.applytoForm.controls.childTitle.value;
    // const childMel = this.applytoForm.controls.childMel.value;
    // const childTel = this.applytoForm.controls.childTel.value;
    // const childAddr = this.applytoForm.controls.childAddr.value;
    // const childPostalCode = this.applytoForm.controls.childPostalCode.value;
    // const childCity = this.applytoForm.controls.childCity.value;
    // const childBirthDay = this.applytoForm.controls.childBirthDay.value;
    // const childBirthPlace = this.applytoForm.controls.childBirthPlace.value;
    // const childSisBroTitle = this.applytoForm.controls.childSisBroTitle.value;
    // const childSisBroAge = this.applytoForm.controls.childSisBroAge.value;
    // const childSisBroStudy = this.applytoForm.controls.childSisBroStudy.value;
    // const schoolName = this.applytoForm.controls.schoolName.value;
    // const schoolCity = this.applytoForm.controls.schoolCity.value;
    // const schoolClasse = this.applytoForm.controls.schoolClasse.value;
    // const schoolOption = this.applytoForm.controls.schoolOption.value;
    // const schoolLv1 = this.applytoForm.controls.schoolLv1.value;
    // const schoolLv2 = this.applytoForm.controls.schoolLv2.value;
    // const schoolLv3 = this.applytoForm.controls.schoolLv3.value;
    // const bestSubject = this.applytoForm.controls.bestSubject.value;
    // const weakSubject = this.applytoForm.controls.weakSubject.value;
    // const interestJob = this.applytoForm.controls.interestJob.value;
    // const interestAge = this.applytoForm.controls.interestAge.value;
    // const yourInterest = this.applytoForm.controls.yourInterest.value;
    // const practiceInterest = this.applytoForm.controls.practiceInterest.value;
    // const type = 'cadidate';
    // const school = this.schoolID;

    // const data = ({
    //   lienParent, title, lastName, firstName, job, email, tel, horaireJoingnable, childLastName,
    //   childFirstName, childAge, childTitle, childMel, childTel, childAddr, childPostalCode, 
    //   childCity, childBirthDay, childBirthPlace, childSisBroAge, childSisBroStudy, childSisBroTitle,
    //   schoolName, schoolCity, schoolClasse, schoolOption, schoolLv1, schoolLv2, schoolLv3, bestSubject, 
    //   weakSubject, interestJob, interestAge, yourInterest, practiceInterest, type, school
    // });
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
          } else {
            console.log("apply successful")
          }
        }
      )
    swal({
      title: 'Votre demande à bien été enregistré.',
      text: 'Redirection vers le menu principal',
      type: 'success',
      confirmButtonText: 'Ok'
    })
    this.route.navigate(['/']);
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
