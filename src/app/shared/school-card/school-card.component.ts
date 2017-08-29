import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { PublicService } from '../../services/public.service';
import { SchoolChoiceComponent } from '../school-choice/school-choice.component';
import { EtablissementComponent } from '../../etablissement/etablissement.component';

@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})
export class SchoolCardComponent implements OnInit {

  @Input() SchoolData : any;
  @Input() pathName : any;
  brochureData={brochure : ""}
  config: MdDialogConfig;
  configSchoolDetail : MdDialogConfig;
  schoolTag=[];

  constructor(private router : Router,
              private usersService : UsersService,
              private publicService : PublicService,
              public dialog:MdDialog) { }

  ngOnInit() {
    setTimeout(()=>{
      // console.log(this.SchoolData);
      this.getSchoolBrochureById();
      this.getSchoolTag();
    }, 500)
  }

  onSchoolDetail(){
    console.log("Click on school detail")
    this.makeSchoolDetailProfil();
    let dialogref = this.dialog.open(EtablissementComponent, this.configSchoolDetail);
    // this.router.navigate(['etablissement', this.SchoolData._id]);
  }
   
  applyToSchool(){
    this.makeProfile()
    let dialogref = this.dialog.open(SchoolChoiceComponent,this.config);
    // dialogref.afterClosed().subscribe(result => {
    //   this.lastCloseResult = result;
    //   // console.log(result)
    //   dialogref = null;
    //   const closeResponse = this.brochureService.getResponse();
    //   console.log(closeResponse)
    //   if(closeResponse=="submit"){
    //     this.downloadDialog();
    //   }
    // });
    // this.router.navigate(['applyto', this.SchoolData._id]);
  }

  makeProfile(){
    let screenWidth : string = (((window.screen.width/3)*2)).toString()+'px';
    let screenHeight : string = (window.screen.height/2).toString()+'px';
    this.config= {
      data:{
        schoolData : this.SchoolData
      },
      disableClose: false,
      width: screenWidth,
      height: screenHeight,
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

  makeSchoolDetailProfil(){
    // console.log(window.screen.width)
    let screenWidth :string = ((window.screen.width/5)*4).toString()+'px';
    let screenHeight :string = ((window.screen.height/7)*6).toString()+'px';
    this.configSchoolDetail= {
      data:{
        schoolData : this.SchoolData
      },
      disableClose: false,
      width: screenWidth,
      height: screenHeight,
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

  saveInWish(){
    const data = {
      type : "wish",
      schools : [{school : this.SchoolData._id, class:'EE'}]
    }
    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  }

  getSchoolBrochureById(){
    // console.log(this.SchoolData);
    this.publicService.getBrochurebyId(this.SchoolData._id, this.SchoolData.cycles[0]._id)
      .subscribe(
        response=>{
          // console.log(response.data)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.brochureData=response.data;
          }
        }
      )
  }

  getSchoolTag(){
    for(let cycle of this.SchoolData.cycles){
      var name : string = cycle.cycle.nom;
      if(name.substring(0, 5)=='Lycée'){
        name='Lycée';
      }
      if(this.schoolTag.indexOf(name)==-1){
        this.schoolTag.push(name)
      }
    }
    this.schoolTag.sort(
        (a : any, b : any)=>{
          if(a<b) return -1;
          if(a>b) return 1;
          return 0
      })
    if(this.schoolTag[2]=='École'){
      this.schoolTag[0]='École';
      this.schoolTag[1]='Collège';
      this.schoolTag[2]='Lycée';
    } else if (this.schoolTag[1]=='École'){
      let name = this.schoolTag[0];
      this.schoolTag[0] = 'École';
      this.schoolTag[1] = name;
    }
    // console.log(this.schoolTag);
  }
  
}
