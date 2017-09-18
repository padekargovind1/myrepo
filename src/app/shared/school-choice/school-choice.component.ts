import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { SchoolService } from '../../services/school.service';
import { ClassChoiceComponent } from '../class-choice/class-choice.component';

@Component({
  selector: 'app-school-choice',
  templateUrl: './school-choice.component.html',
  styleUrls: ['./school-choice.component.scss']
})
export class SchoolChoiceComponent implements OnInit {

  schoolData : any;
  classList =[];
  config: MdDialogConfig;
  constructor(public dialogref:MdDialogRef<SchoolChoiceComponent>,
              @Inject(MD_DIALOG_DATA) private data: {schoolData : any},
              private usersService : UsersService,
              private router : Router,
              private authService : AuthService,
              private schoolService : SchoolService,
              public dialog:MdDialog) { }

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

  selectTo(index){
    // this.router.navigate(['applyto', this.schoolData._id]);
    // this.dialogref.close()
    this.makeProfile(index);
    let dialogref = this.dialog.open(ClassChoiceComponent, this.config);
    dialogref.afterClosed().subscribe(result => {
      if(this.schoolService.isOnApply()){
        this.dialogref.close();
      }
    });
  } 

  makeProfile(index){
    this.config= {
      data:{
        schoolData : this.schoolData,
        schoolIndex : index
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
    };
  }

  // onCheckBox(event, className : string){
  //   // console.log(event)
  //   if(this.classList.indexOf(className)==-1){
  //     this.classList.push(className)
  //   } else {
  //     let index = this.classList.indexOf(className);
  //     this.classList.splice(index, 1)
  //   }
  //   console.log(this.classList)
  // }

  navigateBack(){
    this.schoolService.isOnCancel();
    this.dialogref.close();
  }

}
