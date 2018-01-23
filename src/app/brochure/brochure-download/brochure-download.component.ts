import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Http, Response } from '@angular/http';

import { PublicService } from '../../services/public.service';
import { UsersService } from '../../services/users.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
              private userService: UsersService,
              private http : Http,
              private route: Router,
              private authService: AuthService
              ) { }

  ngOnInit() {
    console.log(this.data)
    for(let i=0; i<this.data.brochureList.length; i++){
      this.getbrochureDetail(this.data.schoolList[i],this.data.brochureList[i]);
    }
  }

  // Get the brochure detail
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
            console.log('bronchure List..');
            console.log(this.brochureList);
          }
        }
      )
  }

  // remove one of the item in the list
  onRemoveBrochure(index){
    this.brochureList.splice(index, 1);
    if(this.brochureList.length==0){
      this.dialogref.close();
    }
  }


  // After click on the cancel button
  onCancel(){
    this.dialogref.close();
  }


  // After click on the submit
  onSubmit(){
    // Check if user is logged in before downloading the bronchure
    if(!this.authService.isUserLoggedIn()){
      swal({
        title: 'Attention',
        text: "Merci de vous connecter pour continuer",
        type: 'warning',
        confirmButtonText: "Connecter"
      }).then(() => {
        this.route.navigate(['/login']);
      });
    }
    this.dialogref.close();
    let brochures = [];
    // for (let i in this.brochureList) {
      let brochureData = {
        "link": this.brochureList[0].brochure.replace(/\\/g, "\\\\").toString(),
        "placeholder": this.brochureList[0].nom.toString(),
        "title": this.brochureList[0].nom.toString(),
        "_id": this.brochureList[0]._id,
        "type": "brochure"
      // }
      // brochures.push(brochureData);
    }
    //console.log(brochures);
    this.userService.postBrochure(brochureData).subscribe(response => {
      console.log(response);
    });
    // this.http.get(
    //   'http://13.229.117.64/cideapi/uploads/brochure/1.pdf').subscribe(
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
