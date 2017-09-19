import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-myaccount-documentations',
  templateUrl: './myaccount-documentations.component.html',
  styleUrls: ['./myaccount-documentations.component.scss']
})
export class MyaccountDocumentationsComponent implements OnInit {

  docList =[]
  brochureList = [];
  showDownload : boolean = false;
  constructor(private usersService : UsersService,
              private publicService : PublicService) { }

  ngOnInit() {
    console.log(this.brochureList);
    this.getApplication();
    
    this.docList= [{
      school : {
        shortName:"",
        longName:"",
        cycles:[]
      }
    }];
    // console.log(this.brochureList);
  }

  getApplication(){
    this.usersService.getApplication()
      .subscribe(
        response => {
          console.log(response.data)
          let data = response.data.filter(
            application=>{
              return application.type=="apply"
            }
          )
          if(response.code==400){
            console.log(response.message);
          } else {
            delete this.docList[0];
            this.docList=data;
            // console.log(this.docList)
            for(let doc of this.docList){
              // console.log(doc)
              this.getBrochureById(doc.school._id, doc.school.cycles[0]._id)
            }
            setTimeout(()=>{
              this.showDownload=true;
              console.log(this.brochureList, this.docList)
            }, 1000)
          }
        }
      )
  }

  getBrochureById(schoolId, cycleId){
    this.publicService.getBrochurebyId(schoolId, cycleId)
      .subscribe(
        response=>{
          // console.log(response.data)
          if(response.code==400){
            console.log(response.message)
          } else {
            this.brochureList.push(response.data);
          }
        }
      )
  }

}
