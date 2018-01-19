import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WizardService} from "../../../services/wizard.service";
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-jobs-tab',
  templateUrl: './jobs-tab.component.html',
  styleUrls: ['./jobs-tab.component.css']
})
export class JobsTabComponent implements OnInit {
  fromFlagA:boolean;
  fromFlagB:boolean;
  fromFlagC:boolean;
  fromFlagD:boolean;
  fromFlagE:boolean;
  fromFlagF:boolean;

  professionList = {
    professionFormA:[],
    professionFormB:[],
    professionFormC:[],
    professionFormD:[],
    professionFormE:[],
    professionFormF:[]
  }
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private wizardService : WizardService,
              private bookingService : BookingService) { 
                this.fromFlagA = false;
                this.fromFlagB = false;
                this.fromFlagC = false;
                this.fromFlagD = false;
                this.fromFlagE = false;
                this.fromFlagF = false;
              }

  ngOnInit() {
    this.wizardService.createProfession(); //Create profession tab
    this.professionList=this.wizardService.getProfessionForm(); //Get all the tab from service
    console.log(this.professionList);
  }
  //Click on one smiley
  clickOnSmiley(group : string, index : number, value:boolean){
    console.log(group, index, value);
    if(group=="professionFormA")
      this.fromFlagA = true;
    if(group=="professionFormB")
      this.fromFlagB = true;
    if(group=="professionFormC")
      this.fromFlagC = true;
    if(group=="professionFormD")
      this.fromFlagD = true;
    if(group=="professionFormE")
      this.fromFlagE = true;
    if(group=="professionFormF")
      this.fromFlagF = true;
    this.professionList[group][index].isFavorite = value;
    this.wizardService.storeProfessionList(this.professionList);
  }
  //save and go to next tab
  nextTab(nb:number){
    console.log("===>",this.wizardService.professionListIsvalid());
    //if(this.wizardService.professionListIsvalid()){
    if(this.fromFlagA || this.fromFlagB || this.fromFlagC || this.fromFlagD || this.fromFlagE || this.fromFlagF)
    {
      this.tabChange.emit(nb);
    }else{
      this.bookingService.failSubmit();     
    }
  }
  prevTab(nb:number){
      console.log("---->",nb);
      this.tabChange.emit(nb);
  }
}
