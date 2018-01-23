import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { UsersService } from '../../services/users.service';
import { SendService } from '../../services/send.service';
import { AuthService } from '../../services/auth.service';
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup;
  sendMessageForm : FormGroup;
  profileData: any;
  isSuivant: boolean;

  constructor(public dialogref:MdDialogRef<SendMessageComponent>,
              private fb : FormBuilder,
              private usersService : UsersService,
              private sendService : SendService,
              private authService : AuthService,
              @Inject(MD_DIALOG_DATA) private data: {school : any},
              public helperService : HelperService) {
                this.buildFormGroup();
                this.getProfile();
                this.isSuivant = false;
              }

  ngOnInit() {
  }

  buildFormGroup(){
    this.sendMessageForm = this.fb.group({
      lienParent : ['', Validators.required],
      title : [''],
      lastName : ['', Validators.required],
      firstName : ['', Validators.required],
      mel : ['', Validators.compose([Validators.required, CustomValidators.email])],
      tel : ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      childLastName : ['', Validators.required],
      childFirstName : ['', Validators.required],
      childTitle : [''],
      classe : ['', Validators.required],
      copy : [false],
      subject : ['', Validators.required],
      message : ['']
    });
  }

  getProfile(){
    if(this.authService.isUserLoggedIn()){
      this.usersService.getProfile()
        .subscribe(
          (response)=>{
            let data = response.data[0];
            console.log(data);
            if(response.code==400){
              console.log(response.message);
            } else {
              this.patchValue(response.data[0]);
              this.profileData = data;
            }
          }
        )
    }
  }

  patchValue(profile){
    console.log(profile);
    if(profile.parents!==undefined && profile.parents.length>0){
      this.sendMessageForm.patchValue({
        lienParent : profile.parents[0].relationship === undefined ? "" : profile.parents[0].relationship,
        title : profile.parents[0].gender === undefined ? "" : profile.parents[0].gender,
        lastName : profile.parents[0].lastName === undefined ? "" : profile.parents[0].lastName,
        firstName : profile.parents[0].firstName === undefined ? "" : profile.parents[0].firstName,
        mel : profile.parents[0].email === undefined ? "" : profile.parents[0].email,
        tel : profile.parents[0].phoneNumber === undefined ? "" : profile.parents[0].phoneNumber,
        childLastName : profile.lastName,
        childFirstName : profile.firstName,
        childTitle : profile.gender,
        etablissement : profile.academicHistories[0].schoolName,
        city : profile.academicHistories[0].schoolName
      });
    }
  }

  onCancel(){
    this.dialogref.close();
  }

  onSubmit(){
    console.log(this.sendMessageForm)
    if(this.sendMessageForm.value.mel!='' && this.sendMessageForm.value.subject!='' && this.sendMessageForm.value.mel!=''){
      let data = {
        emails: [{
          recipient: [this.sendMessageForm.value.mel],
          module: "candidate",
          rank: "a"
        }],
        // sender : this.sendMessageForm.value.mel,
        // receiver : this.data.school.address,
        // user: this.profileData._id,
        // school: "School Name",
        mailType: "sent",
        subject : this.sendMessageForm.value.subject,
        message : this.sendMessageForm.value.message,
        attachments: [],
        tags: [],
        isSent: true
      }
      this.sendService.sendMessage(data)
      this.dialogref.close();
    } else {
      this.sendService.failSend();
    }
  }

  toSecondTab(){
    if(this.sendMessageForm.value.childFirstName !="" && this.sendMessageForm.value.childLastName !="" && this.sendMessageForm.value.childTitle !="" && this.sendMessageForm.value.classe !="" && this.sendMessageForm.value.firstName !="" && this.sendMessageForm.value.lastName !="" && this.sendMessageForm.value.lienParent !="" && this.sendMessageForm.value.mel !="" && this.sendMessageForm.value.mel.tel !="" )
    {
      this.tabGroup.selectedIndex=1;
    }
    else {
      this.sendService.failSend();
    }
  }

  showSuivantBtn(){
    if(this.sendMessageForm.value.childFirstName !="" && this.sendMessageForm.value.childLastName !="" && this.sendMessageForm.value.childTitle !="" && this.sendMessageForm.value.classe !="" && this.sendMessageForm.value.firstName !="" && this.sendMessageForm.value.lastName !="" && this.sendMessageForm.value.lienParent !="" && this.sendMessageForm.value.mel !="" && this.sendMessageForm.value.mel.tel !="" )
    {
      this.isSuivant = true;
    }
    else{
      this.isSuivant = false;  
    }
  }

}
