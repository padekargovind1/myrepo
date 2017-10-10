import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { PublicService } from '../../services/public.service';
import { EtablissementComponent } from '../../etablissement/etablissement.component';

@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})
export class SchoolCardComponent implements OnInit {

  @Input() SchoolData : any;
  @Input() pathName : any;
  brochureData={brochure : ""}
  configSchoolDetail : any;
  schoolTag=[];

  constructor(private publicService : PublicService,
              public dialog:MdDialog) { }

  ngOnInit() {
    setTimeout(()=>{
      // console.log(this.SchoolData);
      this.getSchoolBrochureById();
      this.getSchoolTag();
    }, 500)
  }

  onSchoolDetail(){
    console.log("Click on school detail")
    this.makeSchoolDetailProfil();
    this.dialog.open(EtablissementComponent, this.configSchoolDetail);
    // this.router.navigate(['etablissement', this.SchoolData._id]);
  }

  makeSchoolDetailProfil(){
    // console.log(window.screen.width)
    let screenWidth :string = ((window.screen.width/5)*4).toString()+'px';
    let screenHeight :string = ((window.screen.height/7)*6).toString()+'px';
    this.configSchoolDetail= {
      data:{
        schoolData : this.SchoolData
      },
      disableClose: false,
      width: screenWidth,
      height: screenHeight,
      position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
      }
    };
  }

  getSchoolBrochureById(){
    // console.log(this.SchoolData);
    this.publicService.getBrochurebyId(this.SchoolData._id, this.SchoolData.cycles[0]._id)
      .subscribe(
        response=>{
          // console.log(response.data)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.brochureData=response.data;
          }
        }
      )
  }

  getSchoolTag(){
    for(let cycle of this.SchoolData.cycles){
      var name : string = cycle.cycle.nom;
      if(name.substring(0, 5)=='Lycée'){
        name='Lycée';
      }
      if(this.schoolTag.indexOf(name)==-1){
        this.schoolTag.push(name)
      }
    }
    this.schoolTag.sort(
        (a : any, b : any)=>{
          if(a<b) return -1;
          if(a>b) return 1;
          return 0
      })
    if(this.schoolTag[2]=='École'){
      this.schoolTag[0]='École';
      this.schoolTag[1]='Collège';
      this.schoolTag[2]='Lycée';
    } else if (this.schoolTag[1]=='École'){
      let name = this.schoolTag[0];
      this.schoolTag[0] = 'École';
      this.schoolTag[1] = name;
    }
    // console.log(this.schoolTag);
  }

}
