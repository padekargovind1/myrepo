import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-school-choice',
  templateUrl: './school-choice.component.html',
  styleUrls: ['./school-choice.component.scss']
})
export class SchoolChoiceComponent implements OnInit {

  schoolData : any;
  classList =[];
  constructor(public dialogref:MdDialogRef<SchoolChoiceComponent>,
              @Inject(MD_DIALOG_DATA) private data: {schoolData : any},
              private usersService : UsersService,
              private router : Router,
              private authService : AuthService) { }

  ngOnInit() {
    if(!this.authService.isUserLoggedIn()){
      this.router.navigate(['/login'])
      this.dialogref.close()
    }
    console.log(this.data.schoolData)
    this.schoolData=this.data.schoolData
  }

  saveOnWish(){
    const data = {
      type : "wish",
      schools : [{school : this.schoolData._id, class:'EE'}]
    }
    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
    this.dialogref.close()
  }

  applyTo(){
    this.router.navigate(['applyto', this.schoolData._id]);
    this.dialogref.close()
  } 

  onCheckBox(event, className : string){
    // console.log(event)
    if(this.classList.indexOf(className)==-1){
      this.classList.push(className)
    } else {
      let index = this.classList.indexOf(className);
      this.classList.splice(index, 1)
    }
    console.log(this.classList)
  }

}
