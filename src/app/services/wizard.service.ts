import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import {UsersService} from "./users.service";
import {
  MyAccountAdresse, MyAccountHistoryMdl, MyAccountMdl, MyAccountParentMdl,
  MyAccountSocialAdrMdl, MyAccountBulletin,
} from "../model/myaccount.model";
import {MyAccountSiblingsMdl} from "../model/myaccount.model";
import {BookingService} from "./booking.service";
import {AuthService} from "app/services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class WizardService {

  //* Data send to wizard tabs
  subjectList=["Maths", "Sciences Physiques", "Sciences Naturelles", "Francais", "Anglais", "Espagnol",
                "Allemand", "Italien", "Autre langue", "Histoire", "Géographie", "Instruction Civique",
                "Sport", "Musique", "Arts PLastiques", "Autre matières"];

  groupA=["Chargé de clientèle", "Enseignant", "Médecin", "Travailleur social", "Psychologue", "Animateur",
          "Guide touristique", "Avocat", "Diplomate", "Conseiller d'orientation", "Orthophoniste"];
  groupB=["Gestionnaire", "Economiste", "Comptable", "Analyste financier", "Commerçant", "Assureur",
          "Agent de voyage", "Représentant", "Opticien", "Conseiller juridique", "Attaché commercial"];
  groupC=["Décorateur", "Publicitaire", "Acteur", "Metteur en scène", "Peintre", "Sculpteur",
          "Styliste", "Paysagiste", "Photographe", "Musicien", "Urbaniste"];
  groupD=["Historien", "Archéologue", "Géographe", "Bibliothécaire", "Librairie", "Interprète",
          "Journaliste", "Professeur de langue", "Ecrivain", "Notaire"];
  groupE=["Consultant en agriculture", "Diététicien", "Chercheur scientifique", "Ingénieur", "Analyste-programmeur",
          "Pharmacien", "Géologue", "Physicien", "Mathématicien-statisticien", "Météorologue"];
  groupF=["Ingénieur agronome", "Architecte", "Ingénieur technicien", "Technicien télécommunication", "Responsable réseau informatique",
          "Prothésiste dentaire", "Laborantin", "Radiologue", "Officier", "Homéopathe", "Dentiste"];
  professionList={
    professionFormA : [],
    professionFormB : [],
    professionFormC : [],
    professionFormD : [],
    professionFormE : [],
    professionFormF : []
  }
  finalProfessionList =[];
  //Data to update -> to send to API
  appointmentData;
  lienparents = [ "Père",
    "Mère",
    "Oncle",
    "Tante",
    "Grand-Père",
    "Grand-Mère",
    "Tuteur",
    "Tutrice"];
  langues = ["Allemand", "Anglais", "Arabe", "Chinois", "Espagnol", "Français(FLE)", "Hébreux", "Italien", "Portugais", "Russe"];
  subjectSchool = ["Maths", "Sciences", "Physiques", "Sciences Naturelles", "Histoire",
    "Géographie", "Instruction Civique", "Sport", "Musique",
    "Arts Plastiques", "Français", "Anglais", "Espagnol", "Allemand",
    "Italien"];
  primarySchool = ["CP", "CE1", "CE2", "CM1", "CM2"];
  secondarySchool = ["6ème", "5ème", "4ème", "3ème", "2nde", "1er", "Terminal"];
  //*
  //Data to save and send to API
  userData :any;
  newAppointment={}
  wizardData={
    parentData : [],
    childData:{},
    currentSchoolData:{},
    helpData:{},
    subjectData:{},
    hobbiesData:{},
    establishmentData: {},
    diagnosticData: {},
    pageName: ""
  }

  //*
  constructor(private usersService : UsersService,
              private bookingService : BookingService,
              private authService : AuthService,
              private route : Router) { }

  createProfession(){
    for(var profession of this.groupA){
      this.professionList.professionFormA.push({
        "name" : profession,
        "isFavorite" : null
      })
    }
    for(var profession of this.groupB){
      this.professionList.professionFormB.push({
        "name" : profession,
        "isFavorite" : null
      })
    }
    for(var profession of this.groupC){
      this.professionList.professionFormC.push({
        "name" : profession,
        "isFavorite" : null
      })
    }
    for(var profession of this.groupD){
      this.professionList.professionFormD.push({
        "name" : profession,
        "isFavorite" : null
      })
    }
    for(var profession of this.groupE){
      this.professionList.professionFormE.push({
        "name" : profession,
        "isFavorite" : null
      })
    }
    for(var profession of this.groupF){
      this.professionList.professionFormF.push({
        "name" : profession,
        "isFavorite" : null
      })
    }
  }

  getProfessionForm(){
    return this.professionList;
  }

  storeProfessionList(data){
    this.professionList=data
  }
  //Check if all the form is complete
  professionListIsvalid(): boolean{
    for(var i=0; i<this.professionList.professionFormA.length; i++){
      if(this.professionList.professionFormA[i].isFavorite==null){
        return false
      }
    }
    for(var i=0; i<this.professionList.professionFormB.length; i++){
      if(this.professionList.professionFormB[i].isFavorite==null){
        return false
      }
    }
    for(var i=0; i<this.professionList.professionFormC.length; i++){
      if(this.professionList.professionFormC[i].isFavorite==null){
        return false
      }
    }
    for(var i=0; i<this.professionList.professionFormD.length; i++){
      if(this.professionList.professionFormD[i].isFavorite==null){
        return false
      }
    }for(var i=0; i<this.professionList.professionFormE.length; i++){
      if(this.professionList.professionFormE[i].isFavorite==null){
        return false
      }
    }
    for(var i=0; i<this.professionList.professionFormF.length; i++){
      if(this.professionList.professionFormF[i].isFavorite==null){
        return false
      }
    }
    return true;
  }

  //Sweet alert for user to fill all the radio button
  notValid(){
    swal({
      title: 'Attention',
      text: 'Vous devez entièrement remplir l\'onglet profession. Merci',
      type: 'warning',
      confirmButtonText: "J'AI COMPRIS"
    })
  }
  //Take each list to combine in one single list to send to API
  transformToOneObject(){
    for(var i=0; i<this.professionList.professionFormA.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormA[i])
    }for(var i=0; i<this.professionList.professionFormB.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormB[i])
    }for(var i=0; i<this.professionList.professionFormC.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormC[i])
    }for(var i=0; i<this.professionList.professionFormD.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormD[i])
    }for(var i=0; i<this.professionList.professionFormE.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormE[i])
    }for(var i=0; i<this.professionList.professionFormF.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormF[i])
    }
    return this.finalProfessionList
  }

  //Update an appointment -> send data to API
  updateAppointment(appointmentId, data){
    this.appointmentData.FavoriteProfessionSchema=this.finalProfessionList;
    this.appointmentData.diagnosticReason = data.reasonDiagnostic;
    this.appointmentData.specialRemarks=data.note;
    this.appointmentData.interest=data.yourInterest;
    this.appointmentData.hobbies=data.practiceInterest;
    this.appointmentData.tuition={};
    this.appointmentData.tuition.haveOne=data.schoolHelp;
    this.appointmentData.tuition.list=data.schoolHelpSubject;
    this.appointmentData.currentInstitution={
      language:{
        lv1 : data.schoolLv1,
        lv2 : data.schoolLv2,
        lv3 : data.schoolLv3
      }
    };
    this.appointmentData.child={
      firstName: data.childFirstName,
      age: data.childAge,
      gender: data.childTitle,
      birthplace: data.childBirthPlace,
      birthday: data.childBirthDay
    }
    for(let parent of data.parents){
  //need to check how it handle
    }
    this.appointmentData.strongAtSubjects=[data.bestSubject];
    this.appointmentData.weakAtSubjects=[data.weakSubject];
    this.appointmentData.attractionToSubjects=[data.interestSubject];
    for(let job of data.job){
      //need to check how it handle
    }
    for(let primary of data.primary){
      //need to check how it handle
    }
    for(let secondary of data.secondary){

    }
    this.usersService.putAppointmentData(appointmentId, this.appointmentData)
      .subscribe(response=>{
        console.log(response);
      })
  }
  //*Methods get to send to wizard tabs
  getSubjectList(){
    return this.subjectList;
  }

  getLienParent(){
    return this.lienparents;
  }

  getLangues(){
    return this.langues;
  }

  getSubjectSchool(){
    return this.subjectSchool;
  }

  getPrimarySchool(){
    return this.primarySchool;
  }

  getSecondarySchool(){
    return this.secondarySchool;
  }
  //*

  //Save data into the service

  saveData(dataname:string, dataToSave:any){
    this.wizardData[dataname]=dataToSave;
    console.log(this.wizardData);
  }
  onSubmitForm(){
    this.makeUserDataProfile();
    this.CompleteUserData();
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
  putProfile(){
    console.log(this.userData)
    this.usersService.putProfile(this.userData)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.bookingService.successSubmit();
          }
        }
      )
  }
  //Fill all the data saved in wizardData to userData
  CompleteUserData(){
    let professionList = this.transformToOneObject();
    console.log(this.wizardData, this.userData);
    this.userData['favoriteProfessions']=professionList; // Wait for api fixed
    for(let i = 0; i<this.wizardData.parentData.length; i++){
      this.userData.parents[i].profession = this.wizardData.parentData[i].job;
      this.userData.parents[i].relationship = this.wizardData.parentData[i].lienParent
      this.userData.parents[i].gender = this.wizardData.parentData[i].titre
      this.userData.parents[i].lastName = this.wizardData.parentData[i].nom
      this.userData.parents[i].firstName = this.wizardData.parentData[i].prenom
      this.userData.parents[i].email = this.wizardData.parentData[i].email
      this.userData.parents[i].phoneNumber = this.wizardData.parentData[i].portable
      this.userData.parents[i].availability = this.wizardData.parentData[i].horaireJoignable
    }
    this.userData.lastName = this.wizardData.childData['childLastName']
    this.userData.firstName = this.wizardData.childData['childFirstName']
    this.userData.age = this.wizardData.childData['childAge']===undefined || this.wizardData.childData['childAge']==' '? this.wizardData.childData['childAge'] : 2;
    this.userData.gender = this.wizardData.childData['childTitle']!==undefined ? this.wizardData.childData['childTitle'] : 'A compléter'
    this.userData.email = this.wizardData.parentData[0].email
    this.userData.mobilePhone = this.wizardData.parentData[0].portable
    this.userData.birthDate = this.wizardData.childData['childBirthDay']
    this.userData.birthPlace = this.wizardData.childData['childBirthPlace']
    if(this.userData.academicHistories.length!=0){
      this.userData.academicHistories[0].city = this.wizardData.currentSchoolData['schoolCity']
      this.userData.academicHistories[0].class = this.wizardData.currentSchoolData['schoolClasse']
      this.userData.academicHistories[0].classType = this.wizardData.currentSchoolData['schoolOption']
      this.userData.academicHistories[0].schoolName = this.wizardData.currentSchoolData['schoolName']
      this.userData.academicHistories[0].languages = []
      this.userData.academicHistories[0].languages.push(this.wizardData.currentSchoolData['schoolLv1'])
      this.userData.academicHistories[0].languages.push(this.wizardData.currentSchoolData['schoolLv2'])
      this.userData.academicHistories[0].languages.push(this.wizardData.currentSchoolData['schoolLv3'])
    }
    this.userData.attractionToSubjects = [];
    this.userData.attractionToSubjects.push(this.wizardData.subjectData['bestSubject'])
    this.userData.weakAtSubjects = [];
    this.userData.weakAtSubjects.push(this.wizardData.subjectData['weakSubject'])
    this.userData.jobs=[]
    // console.log(this.userData)
    for(let i = 0; i<this.wizardData['hobbiesData']['job'].length; i++){
      this.userData.jobs[i]={};
      console.log(this.userData.jobs[i])
      this.userData.jobs[i].profession=this.wizardData['hobbiesData']['job'][i].interestJob;
      this.userData.jobs[i].age=this.wizardData['hobbiesData']['job'][i].interestAge!='' ? this.wizardData['hobbiesData']['job'][i].interestAge : 0
    }
    this.userData.interest = this.wizardData['hobbiesData']['yourInterest'];
    this.userData.hobbies = this.wizardData['hobbiesData']['practiceInterest'];
    this.userData.photo = false;
    this.userData.disabilityStatus = false;
    this.userData.address = new MyAccountAdresse();
    var appointment = this.bookingService.getBookingData();
    this.newAppointment = {
      adviser : appointment[5],
      from: appointment[0],
      to:appointment[0]
    }
    // console.log(this.wizardForm)
      //If user is logged -> we get the package Id and we create new appointment
    if(this.authService.isUserLoggedIn()){
      console.log(this.appointmentData);
      this.getPackageById(appointment[9]);
      this.putProfile(); // Wait for API fix
    } else { // Else we store the data into booking service and user redirect to login to login
      var packageIndex = this.bookingService.getBookingPackage()[3];
      console.log(packageIndex);
      this.bookingService.storeAppointmentData(this.newAppointment, packageIndex, this.userData);
      this.route.navigate(['/login']);
    }
  }
  //get the packages and take the correct package
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
  //Create a new appointment based on the newAppointment data and the package Id
  postCreateNewAppointment(packageId){
    console.log(packageId);
    this.usersService.postCreateNewAppointment(this.newAppointment, packageId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(data.code==400){
            console.log(response.message);
            this.bookingService.failSubmit();
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

  getUserData(){
    return this.wizardData;
  }

}
