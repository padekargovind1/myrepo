import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdDialog, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SchoolChoiceComponent } from '../../shared/school-choice/school-choice.component';
import { EtablissementComponent } from '../../etablissement/etablissement.component';

@Component({
  selector: 'app-wish-apply-popup',
  templateUrl: './wish-apply-popup.component.html',
  styleUrls: ['./wish-apply-popup.component.scss']
})
export class WishApplyPopupComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup;
  wishList = [];
  applyList = [];
  config: MdDialogConfig;
  configSchoolDetail : MdDialogConfig;
  schoolApplyToList=[];

  constructor(public dialogref:MdDialogRef<WishApplyPopupComponent>,
              @Inject(MD_DIALOG_DATA) private data: {tabNb : number},
              private usersService : UsersService,
              private route : Router,
              public dialog:MdDialog) { }

  ngOnInit() {
    // console.log(this.data.tabNb)
    this.tabGroup.selectedIndex=this.data.tabNb
    this.getApplications()
  }

  onCancel(){
    this.dialogref.close();
  }

  // get the application to display on the MdDialog
  getApplications(){
    this.usersService.getApplication()
      .subscribe(
        response=>{
          console.log(response)
          if(response.code==400){
            console.log(response.message)
          } else {
            for(let data of response.data){
              if(data.type=='wish'){
                console.log(data)
                this.wishList.push(data)
              } else {
                this.applyList.push(data);
              }
            }
            console.log(this.wishList, this.applyList)
          }
        }
      )
  }

  // Open the school detail
  onSchoolDetail(school){
    // this.route.navigate(['/etablissement', schoolId]);
    this.makeSchoolDetailProfil(school)
    this.dialogref.close();
	  let dialogref = this.dialog.open(EtablissementComponent, this.configSchoolDetail);
  }

  // Make the config of the MdDialog of the school detail
  makeSchoolDetailProfil(school){
    // console.log(window.screen.width)
    let screenWidth :string = ((window.screen.width/5)*4).toString()+'px';
    let screenHeight :string = ((window.screen.height/7)*6).toString()+'px';
    this.configSchoolDetail= {
      data:{
        schoolData : school.school
      },
      disableClose: false,
      width: screenWidth,
      height: screenHeight,
	  //width: '',
      //height: '',
      // position: {
      // top: '',
      // bottom: '',
      // left: '',
      // right: ''
      // }
    };
  }

  // On apply to a school -> make the config and open the MdDialog
  onSchoolApply(schoolId, index){
    // this.route.navigate(['/applyto', schoolId])
    this.makeProfile(this.wishList[index])
    let dialogref = this.dialog.open(SchoolChoiceComponent,this.config);
    this.dialogref.close();
  }

  // Make the school cycle choice popup
  makeProfile(schoolData){
    let screenWidth : string = (((window.screen.width/3)*2)).toString()+'px';
    let screenHeight : string = (window.screen.height/2).toString()+'px';
    this.config= {
      data:{
        schoolData : schoolData.school
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

  //After click on apply to
  applyOnMultiple(){
    this.onSchoolApply(this.schoolApplyToList, 0)
  }

  // Add or remove school to apply in schoolApplyTo list
  onSchoolCheckbox(school){
    console.log(school)
    let index = this.schoolApplyToList.indexOf(school)
    if(index==-1){
      this.schoolApplyToList.push(school)
    } else{
      this.schoolApplyToList.splice(index, 1)
    }
  }

}
