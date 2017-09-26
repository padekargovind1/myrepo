import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../services/wizard.service';

@Component({
  selector: 'app-wizard-profession',
  templateUrl: './wizard-profession.component.html',
  styleUrls: ['./wizard-profession.component.css']
})
export class WizardProfessionComponent implements OnInit {

  professionList = {
    professionFormA:[],
    professionFormB:[],
    professionFormC:[],
    professionFormD:[],
    professionFormE:[],
    professionFormF:[]
  }


  constructor(private wizardService : WizardService) { }

  ngOnInit() {
    this.wizardService.createProfession();
    this.professionList=this.wizardService.getProfessionForm();
    console.log(this.professionList);
  }

  clickOnSmiley(group : string, index : number, value:boolean){
    console.log(group, index, value);
    this.professionList[group][index].isFavorite = value;
    this.wizardService.storeProfessionList(this.professionList);
  }

}
