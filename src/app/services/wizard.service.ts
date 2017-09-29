import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import {UsersService} from "./users.service";

@Injectable()
export class WizardService {

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
          "Journaliste", "Professeur de langue", "Ecrivain", "Guide touristique", "Notaire"];
  groupE=["Consultant en agriculture", "Diététicien", "Chercheur scientifique", "Ingénieur", "Analyste-programmeur",
          "Médecin", "Pharmacien", "Géologue", "Physicien", "Mathématicien-statisticien", "Météorologue"];
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
  langues = ["Français", "Anglais", "Espagnol", "Allemand", "Italien"];

  constructor(private usersService : UsersService) { }

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

  transformToOneObject(){
    for(var i=0; i<this.professionList.professionFormA.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormA)
    }for(var i=0; i<this.professionList.professionFormB.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormB)
    }for(var i=0; i<this.professionList.professionFormC.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormC)
    }for(var i=0; i<this.professionList.professionFormD.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormD)
    }for(var i=0; i<this.professionList.professionFormE.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormE)
    }for(var i=0; i<this.professionList.professionFormF.length; i++){
      this.finalProfessionList.push(this.professionList.professionFormF)
    }
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

  getSubjectList(){
    return this.subjectList;
  }

  getLienParent(){
    return this.lienparents;
  }

  getLangues(){
    return this.langues;
  }

}
