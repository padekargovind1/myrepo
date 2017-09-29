import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WizardService} from "../../../services/wizard.service";

@Component({
  selector: 'app-jobs-tab',
  templateUrl: './jobs-tab.component.html',
  styleUrls: ['./jobs-tab.component.css']
})
export class JobsTabComponent implements OnInit {

  professionList = {
    professionFormA:[],
    professionFormB:[],
    professionFormC:[],
    professionFormD:[],
    professionFormE:[],
    professionFormF:[]
  }
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private wizardService : WizardService) { }

  ngOnInit() {
    this.wizardService.createProfession(); //Create profession tab
    this.professionList=this.wizardService.getProfessionForm(); //Get all the tab from service
    console.log(this.professionList);
  }
  //Click on one smiley
  clickOnSmiley(group : string, index : number, value:boolean){
    console.log(group, index, value);
    this.professionList[group][index].isFavorite = value;
    this.wizardService.storeProfessionList(this.professionList);
  }
  //save and go to next tab
  nextTab(nb:number){
    this.tabChange.emit(nb);
  }

}
