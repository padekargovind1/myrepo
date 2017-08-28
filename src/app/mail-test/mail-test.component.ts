import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from './mail.service';

@Component({
  selector: 'app-mail-test',
  templateUrl: './mail-test.component.html',
  styleUrls: ['./mail-test.component.scss'],
  providers: [MailService]
})
export class MailTestComponent implements OnInit {
  mailType = ["inbox", "sent", "important", "draft", "trash", "any"];
  rank = ["a","cc","c"];
  mailForm : FormGroup;
  mailList = [];
  constructor(private fb : FormBuilder,
              private mailService : MailService) { }

  ngOnInit() {
    this.buildForm();
    setTimeout(()=>{
      this.getMail('inbox')
    }, 500)
  }

  buildForm(){
    this.mailForm = this.fb.group({
      sender : [''],
      receiver : [''],
      subject : [''],
      message : [''],
      mailType : [''],
      rank : ['']
    })
  }

  onSubmit(){
    console.log(this.mailForm.value)
    let data = {
      mailType : this.mailForm.controls.mailType.value,
      subject : this.mailForm.controls.subject.value,
      message : this.mailForm.controls.message.value,
      isSent : true,
      tags : [],
      emails : [{
        email : this.mailForm.controls.receiver.value,
        rank : this.mailForm.controls.rank.value,
      }]
    }
    console.log(data);
    this.mailService.postMail(data)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
  } 
  getMail(type){
    this.mailService.getMail(type)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.mailList=response.data
          }
        }
      )
  }

  clickOnSelect(type: string){
    this.getMail(type);
  }
}
