import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdDialog, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SchoolChoiceComponent } from '../../shared/school-choice/school-choice.component';

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

  onSchoolDetail(schoolId){
    this.route.navigate(['/etablissement', schoolId]);
    this.dialogref.close();
  }

  onSchoolApply(schoolId, index){
    // this.route.navigate(['/applyto', schoolId])
    this.makeProfile(this.wishList[index])
    let dialogref = this.dialog.open(SchoolChoiceComponent,this.config);
    this.dialogref.close();
  }

  makeProfile(schoolData){
    this.config= {
      data:{
        schoolData : schoolData.school
      },
      disableClose: false,
      width: '1000px',
      height: '400px',
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

}
