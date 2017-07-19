import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-brochure-download',
  templateUrl: './brochure-download.component.html',
  styleUrls: ['./brochure-download.component.scss']
})
export class BrochureDownloadComponent implements OnInit {

  brochureList = [];

  constructor(public dialogref:MdDialogRef<BrochureDownloadComponent>,
              @Inject(MD_DIALOG_DATA) private data: {brochureList : any},
              private publicService : PublicService) { }

  ngOnInit() {
    for(let brochureId of this.data.brochureList){
      this.getbrochureDetail(brochureId);
    }
  }

  getbrochureDetail(brochureId){
    this.publicService.getBrochurebyId(brochureId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.brochureList.push(data);
            console.log(this.brochureList);
          }
        }
      )
  }

  onRemoveBrochure(index){
    this.brochureList.splice(index, 1);
    if(this.brochureList.length==0){
      this.dialogref.close();
    }
  }

  onCancel(){
    this.dialogref.close();
  }

  onSubmit(){
    this.dialogref.close();
  }

}
