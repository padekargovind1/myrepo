﻿import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PublicService } from '../../services/public.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BrochpopupComponent } from '../../brochure/brochpopup/brochpopup.component'
import { BrochureDownloadComponent } from '../../brochure/brochure-download/brochure-download.component';
import { BrochureService } from '../../services/brochure.service';

@Component({
  selector: 'app-myaccount-documentations',
  templateUrl: './myaccount-documentations.component.html',
  styleUrls: ['./myaccount-documentations.component.scss']
})
export class MyaccountDocumentationsComponent implements OnInit {

  docList =[]
  brochureList = [];
  downloadList = [];
  downloadSchoolList = [];
  showDownload: boolean = false;
  lastCloseResult: string;
  config: any = {
      disableClose: false,
      width: '400px',
      height: '550px',
      position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
      }
  };
  config2: any;
  constructor(private usersService: UsersService,
              public dialog: MdDialog,
              private brochureService: BrochureService,
              private publicService : PublicService) { }

  ngOnInit() {
    console.log(this.brochureList);
    this.getApplication();

    this.docList= [{
      school : {
        shortName:"",
        longName:"",
        cycles:[]
      }
    }];
    this.config2 = {
        data: {
            brochureList: this.downloadList,
            schoolList: this.downloadSchoolList
        },
        disableClose: false,
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        }
    }
    // console.log(this.brochureList);
  }

  //Get the application list
  getApplication(){
    this.usersService.getApplication()
      .subscribe(
        response => {
          console.log(response.data)
          let data = response.data.filter(
            application=>{
              return application.type=="apply"
            }
          )
          if(response.code==400){
            console.log(response.message);
          } else {
            delete this.docList[0];
            this.docList=data;
            // console.log(this.docList)
            for(let doc of this.docList){
              // console.log(doc)
              this.getBrochureById(doc.school._id, doc.school.cycles[0]._id)
            }
            setTimeout(()=>{
              this.showDownload=true;
              console.log(this.brochureList, this.docList)
            }, 1000)
          }
        }
      )
  }

  // get the brochure by Id from API
  getBrochureById(schoolId, cycleId){
    this.publicService.getBrochurebyId(schoolId, cycleId)
      .subscribe(
        response=>{
          // console.log(response.data)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.brochureList.push(response.data);
          }
        }
      )
  }
  onDownloadBrochure(schoolId, brochureId) {
      this.downloadList[0] = brochureId;
      this.downloadSchoolList[0] = schoolId;
      this.brochDialog();
  }
  onCheckbox(schoolId, brochureId) {
      // console.log(brochureId);
      if (this.downloadList.includes(brochureId)) {
          // console.log("remove checkbox");
          let i = this.downloadList.indexOf(brochureId, 0);
          // console.log(i);
          this.downloadList.splice(i, 1);
          this.downloadSchoolList.splice(i, 1);
      } else {
          this.downloadList.push(brochureId);
          this.downloadSchoolList.push(schoolId)
      }
      console.log(this.downloadList);
  }
  // open the first md dialog to field the form
  // If submit we open the second dialog to download the brochure
  brochDialog() {
      let dialogref = this.dialog.open(BrochpopupComponent, this.config);
      dialogref.afterClosed().subscribe(result => {
          this.lastCloseResult = result;
          // console.log(result)
          dialogref = null;
          //const closeResponse = this.brochureService.getResponse();
          //console.log(closeResponse)
          if (this.brochureService.getResponse() == "submit") {
              this.downloadDialog();
          }

      });
  }
  // Open the md dialog to download the brochure
  downloadDialog() {
      let dialogref: MdDialogRef<BrochureDownloadComponent>;
      dialogref = this.dialog.open(BrochureDownloadComponent, this.config2);
      dialogref.afterClosed().subscribe(result => {
          this.lastCloseResult = result;
          dialogref = null;
          this.downloadList = [];
          this.downloadSchoolList = [];
      });
  }
}
