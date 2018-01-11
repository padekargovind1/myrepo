import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-class-choice',
  templateUrl: './class-choice.component.html',
  styleUrls: ['./class-choice.component.scss']
})
export class ClassChoiceComponent implements OnInit {

  schoolData : any;
  schoolIndex : any;
  selectValue:boolean;
  constructor(public dialogref:MdDialogRef<ClassChoiceComponent>,
              @Inject(MD_DIALOG_DATA) private data: {schoolData : any, schoolIndex : any},
              private router : Router,
              private schoolService : SchoolService) { }

  ngOnInit() {
    console.log(this.data.schoolData, this.data.schoolIndex)
    this.schoolData=this.data.schoolData;
    this.schoolIndex=this.data.schoolIndex;
  }

  onChange() {
    this.selectValue = true;
  }
  onselect(index){
    if(this.selectValue){
        this.selectValue = false;
        this.router.navigate(['applyto', this.schoolData._id]);
        this.schoolService.onApplyTo(true);
        this.schoolService.storeClassName(this.schoolData.cycles[this.schoolIndex].classes[index]._id)
        console.log(this.schoolData, this.schoolData.cycles[this.schoolIndex].classes[index]._id)
        this.dialogref.close()
    }
    else {
        this.selectValue = false;
        swal({
              title: 'Please select value of dropdown',
              text: '',
              type: 'success',
              confirmButtonText: 'Ok'
            });
    }
  }

  navigateBack(){
    this.schoolService.onApplyTo(false);
    this.dialogref.close();
  }

}
