import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-wish-apply-popup',
  templateUrl: './wish-apply-popup.component.html',
  styleUrls: ['./wish-apply-popup.component.scss']
})
export class WishApplyPopupComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup;
  wishList = [];
  applyList = [];

  constructor(public dialogref:MdDialogRef<WishApplyPopupComponent>,
              @Inject(MD_DIALOG_DATA) private data: {tabNb : number},
              private usersService : UsersService,
              private route : Router) { }

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

  onSchoolApply(schoolId){
    this.route.navigate(['/apply', schoolId])
    this.dialogref.close();
  }

}
