import { Injectable } from '@angular/core';

@Injectable()
export class WizardService {

  groupA=["Chargé de clientèle", "Enseignant", "Médecin", "Travailleur social", "Psychologue", "Animateur", 
          "Guide touristique", "Avocat", "Diplomate", "Conseiller d'orientation", "Orthophoniste"];
  groupB=["Gestionnaire", "Economiste", "Comptable", "Analyste financier", "Commerçant", "Assureur", 
          "Agent de voyage", "Représentant", "Opticien", "Conseiller juridique", "Attaché commercial"]
  professionForm = [];

  constructor() { }

  createProfession(){
    for(var profession of this.groupA){
      this.professionForm.push({
        "name" : profession,
        "isFavorite" : true
      })
    }
  }

  returnProfessionForm(){
    return this.professionForm;
  }

}
