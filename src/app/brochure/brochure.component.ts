import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from '../services/public.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import {BrochpopupComponent} from './brochpopup/brochpopup.component'
import { BrochureDownloadComponent } from './brochure-download/brochure-download.component';
import { BrochureService } from '../services/brochure.service';
import {HelperService} from "../services/helper.service";
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit, OnDestroy {

    listBrochures = [];
    listBrochuresFiltered = [];
    schoolList = [];
    lastCloseResult: string;
    config: any = {
        disableClose: false,
        width: '400px',
        height: '550px',
        position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
        }
    };
    config2: any;
    searchForm : FormGroup;
    options={
        regions : [],
        departements : [],
        villes : []
    };
    schoolsOptions: any;
    downloadList = [];
    downloadSchoolList = [];
    searchBrochure = {
        class : "",
        place : "",
        name : ""
    };
    lieuSelected:any;

  constructor(private publicService : PublicService,
              public dialog:MdDialog,
              private fb : FormBuilder,
              private brochureService : BrochureService,
              public helperService : HelperService,
              private authService: AuthService,
              private route: Router) {
      this.buildForm();
      this.makeProfile();
      this.getSearch();
  }
  ngOnInit() {

  }

  // Cleaning the school search after user quit the page
  ngOnDestroy(){
    this.brochureService.cleanSchoolSearch()
  }

  // Get search data from service
  // Then search brochure from the data
  // if they is no data in the services, we get the brochure
  getSearch(){
    if(this.brochureService.hasSchoolSearch()){
        let data = this.brochureService.getSchoolSearch()
        console.log(data)
        this.searchForm.patchValue({
            etablissement : data
        })
        this.onSubmitSearch();
    } else {
        this.getBrochure();
    }
  }

  // Getting the brochure with the API
  // And store the response data in listBrochure
  getBrochure(){
    console.log(this.searchBrochure)
    this.publicService.postBrochure(this.searchBrochure)
      .subscribe(
      (data)=>{
          let response = data;
          // console.log(response.data);
          if(response.code==400){
            console.log(response.message);
          } else {
            this.listBrochures=response.data;
            this.listBrochuresFiltered=response.data;
            console.log(this.listBrochures);
          }
        }
      )
    }

  // open the first md dialog to field the form
  // If submit we open the second dialog to download the brochure
  brochDialog(){
    let dialogref = this.dialog.open(BrochpopupComponent,this.config);
    dialogref.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      // console.log(result)
      dialogref = null;
      //const closeResponse = this.brochureService.getResponse();
      //console.log(closeResponse)
      if(this.brochureService.getResponse()=="submit"){
        this.downloadDialog();
      }
    });
  }

  // Make the config of the 2 md dialog
  makeProfile(){
    let screenWidth : string = (window.screen.width/3).toString()+'px';
    let screenHeight : string = ((window.screen.height/3)*2).toString()+'px';
    this.config= {
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
    this.config2 = {
      data:{
        brochureList : this.downloadList,
        schoolList : this.downloadSchoolList
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
    }
  }


  // Open the md dialog to download the brochure
  downloadDialog(){
    let dialogref : MdDialogRef<BrochureDownloadComponent>;
    dialogref = this.dialog.open(BrochureDownloadComponent, this.config2);
    dialogref.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      dialogref = null;
    });
  }

  // Build the form to search a brochure
  buildForm(){
    this.searchForm = this.fb.group({
      classe : [''],
      lieu: [''],
      etablissement : ['']
    })
  }


  //Getting the location list
  filterLieu(event){
    // console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=2){
      this.getLieuFilter(filter)
    }
  }

  //Getting the location list from API
  getLieuFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutoCompleteLieu(data)
    .subscribe(
    (response)=>{
        let data = response.data;
        // console.log(data);
        console.log(data);
        if(response.code!=400){
          this.options['regions']=data.regions
          this.options['departements']=data.departments
          this.options['villes']=data.cities
        }
      }
    )
  }

  // getting the school list
  filterSchool(event){
    // console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
    this.getSchoolFilter(filter)
    }else {
    this.schoolsOptions=null;
    }
  }

  //Getting the school list from API
  getSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutocompleteSchool(data)
    .subscribe(
      (response)=>{
      let data = response.data;
      // console.log(data);
      this.schoolsOptions=data
      }
    )
  }

  // After submit search for brochure
  onSubmitSearch(){
    console.log("click on submit");
    this.searchBrochure.class = this.searchForm.value.classe;
    this.searchBrochure.place = this.searchForm.value.lieu;
    this.searchBrochure.name = this.searchForm.value.etablissement;
    this.getBrochure()
    this.downloadList.length=0;
    this.downloadSchoolList.length=0;
  }

  // After click on the clean button
  onClearSearch(){
    console.log("click on clear");
    this.searchBrochure.class = "";
    this.searchBrochure.place = "";
    this.searchBrochure.name = "";
    this.buildForm();
    this.getBrochure()
    this.downloadList.length=0;
    this.downloadSchoolList.length=0;
  }

//   getSearchFilter(searchFilter){
//     if(searchFilter[0]!="" && searchFilter[1]!="" && searchFilter[2]==""){
//     this.listBrochuresFiltered = this.listBrochures.filter(
//     school => {
//         return school.cycle.nom == searchFilter[0] &&
//         school.address.city == searchFilter[1];
//     })
//     } else if (searchFilter[0]=="" && searchFilter[1]=="" && searchFilter[2]!=""){
//       this.listBrochuresFiltered = this.listBrochures.filter(
//     school => {
//         return school.school==searchFilter[2]
//     })
//     } else if (searchFilter[0]!="" && searchFilter[1]!="" && searchFilter[2]!=""){
//       this.listBrochuresFiltered = this.listBrochures.filter(
//     school => {
//         return school.school==searchFilter[2] && school.cycle.nom == searchFilter[0] &&
//         school.address.city == searchFilter[1]
//     })
//     } else {
//       this.listBrochuresFiltered=this.listBrochures;
//     }
//   }

  // After click on one of the checkbox in the brochure item
  // Store the id and the school data in the array to use it when user click on download brochure for mutiple brochure
  onCheckbox(schoolId, brochureId){
    // console.log(brochureId);
    if(this.downloadList.includes(brochureId)){
      // console.log("remove checkbox");
      let i = this.downloadList.indexOf(brochureId, 0);
      // console.log(i);
      this.downloadList.splice(i, 1);
      this.downloadSchoolList.splice(i, 1);
    } else {
      this.downloadList.push(brochureId);
      this.downloadSchoolList.push(schoolId)
    }
    console.log(this.downloadList);
  }

  // After click on the download button (not the button next to the search)
  onDownloadBrochure(schoolId, brochureId){
    console.log(brochureId);
    // if(!this.authService.isUserLoggedIn()){
    //   swal({
    //     title: 'Attention',
    //     text: "Merci de vous connecter pour continuer",
    //     type: 'warning',
    //     confirmButtonText: "Connecter"
    //   }).then(() => {
    //     this.route.navigate(['/login']);
    //   })
    // }
    this.downloadList[0]=brochureId;
    this.downloadSchoolList[0]=schoolId;
    this.brochDialog();
  }

  // Use the good location name to send into the body of the API
  onSelectLieu(type:string, index:number){
    this.lieuSelected=[];
    if(type=='R'){
      this.lieuSelected=this.options.regions[index].departments;
    } else if(type=='D'){
      this.lieuSelected[0]=this.options.departements[index].departmentNumber;
    }else {
      this.lieuSelected[0]=this.options.villes[index].postcode;
    }
    console.log(this.lieuSelected);
  }

}
