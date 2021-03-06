﻿import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-class-choice',
  templateUrl: './class-choice.component.html',
  styleUrls: ['./class-choice.component.scss']
})
export class ClassChoiceComponent implements OnInit {

  schoolData : any;
  schoolIndex : any;

  constructor(public dialogref:MdDialogRef<ClassChoiceComponent>,
              @Inject(MD_DIALOG_DATA) private data: {schoolData : any, schoolIndex : any},
              private router : Router,
              private schoolService : SchoolService) { }

  ngOnInit() {
    console.log(this.data.schoolData, this.data.schoolIndex)
    this.schoolData=this.data.schoolData;
    this.schoolIndex=this.data.schoolIndex;
  }

  onselect(index){
    this.router.navigate(['applyto', this.schoolData._id]);
    this.schoolService.onApplyTo(true);
    this.schoolService.storeClassName(this.schoolData.cycles[this.schoolIndex].classes[index]._id)
    console.log(this.schoolData, this.schoolData.cycles[this.schoolIndex].classes[index]._id)
    this.dialogref.close()
  }

  navigateBack(){
    this.schoolService.onApplyTo(false);
    this.dialogref.close();
  }

}
