import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class WizardService {

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
  finalProfessionList = [];

  constructor() { }

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

}
