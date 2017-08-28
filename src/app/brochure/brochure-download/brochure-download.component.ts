import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Http, Response } from '@angular/http';

import { PublicService } from '../../services/public.service';

declare var saveAs:any; 

@Component({
  selector: 'app-brochure-download',
  templateUrl: './brochure-download.component.html',
  styleUrls: ['./brochure-download.component.scss']
})
export class BrochureDownloadComponent implements OnInit {

  brochureList = [];

  constructor(public dialogref:MdDialogRef<BrochureDownloadComponent>,
              @Inject(MD_DIALOG_DATA) private data: {
                brochureList : any,
                schoolList : any},
              private publicService : PublicService,
              private http : Http) { }

  ngOnInit() {
    console.log(this.data)
    for(let i=0; i<this.data.brochureList.length; i++){
      this.getbrochureDetail(this.data.schoolList[i],this.data.brochureList[i]);
    }
  }

  getbrochureDetail(schoolId, brochureId){
    console.log(schoolId, brochureId)
    this.publicService.getBrochurebyId(schoolId, brochureId)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code==400){
            console.log(response.message);
          } else {
            for(let i=0; i<data.cycles.length; i++){
              if(data.cycles[i]._id==brochureId){
                let cycleData=data.cycles[i];
                cycleData.nom=data.shortName;
                this.brochureList.push(cycleData)
              }
            }
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
    // console.log("test1")
    // this.http.get(
    //   'http://54.254.203.172/cideapi/uploads/brochure/1.pdf').subscribe(
    //     (response:Response)=>{
    //       console.log(response['_body'])
    //       var mediaType = 'application/pdf';
    //       var blob = new Blob([response['_body']], {type: mediaType});
    //       var filename = 'test.pdf';
    //       saveAs(blob, filename);
    //     }
    //   )
  }

}
