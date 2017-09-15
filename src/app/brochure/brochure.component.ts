import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PublicService } from '../services/public.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import {BrochpopupComponent} from './brochpopup/brochpopup.component'
import { BrochureDownloadComponent } from './brochure-download/brochure-download.component';
import { BrochureService } from '../services/brochure.service';
@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit, AfterViewInit, OnDestroy {

    listBrochures = [];
    listBrochuresFiltered = [];
    schoolList = [];
    lastCloseResult: string;
    config: MdDialogConfig = {
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
    config2: MdDialogConfig;
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

  constructor(private publicService : PublicService,
              public dialog:MdDialog,
              private fb : FormBuilder,
              private brochureService : BrochureService) { 
      this.buildForm();
      this.makeProfile();
      this.getSearch();
      // this.doBrochure();
  }
  ngOnInit() {
    
  }

  ngAfterViewInit() {
  	// this.doBrochure();
  }

  ngOnDestroy(){
    this.brochureService.cleanSchoolSearch()
  }

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

  doBrochure() {
    (<any> $('#js-grid-juicy-projects')).cubeportfolio({
        filters: '#js-filters-juicy-projects',
        loadMore: '#js-loadMore-juicy-projects',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'quicksand',
        gapHorizontal: 35,
        gapVertical: 30,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 5
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        caption: 'overlayBottomReveal',
        displayType: 'sequentially',
        displayTypeSpeed: 80,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            console.log('Hi');

            // $.ajax({
            //         url: url,
            //         type: 'GET',
            //         dataType: 'html',
            //         timeout: 10000
            //     })
            //     .done(function(result) {
            //         t.updateSinglePage(result);
            //     })
            //     .fail(function() {
            //         t.updateSinglePage('AJAX Error! Please refresh the page!');
            //     });
        },
    });  
  }

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

    brochDialog(){  
        let dialogref = this.dialog.open(BrochpopupComponent,this.config);
        dialogref.afterClosed().subscribe(result => {
            this.lastCloseResult = result;
            // console.log(result)
            dialogref = null;
            const closeResponse = this.brochureService.getResponse();
            console.log(closeResponse)
            if(closeResponse=="submit"){
                this.downloadDialog();
            }
        });
    }

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

    downloadDialog(){
        let dialogref : MdDialogRef<BrochureDownloadComponent>;
        dialogref = this.dialog.open(BrochureDownloadComponent, this.config2);
        dialogref.afterClosed().subscribe(result => {
            this.lastCloseResult = result;
            dialogref = null;
        });
    }

    buildForm(){
        this.searchForm = this.fb.group({
            classe : [''],
            lieu: [''],
            etablissement : ['']
        })
    }   

    filterLieu(event){
        // console.log(event.target.value);
        let filter: string = event.target.value;
        if(filter.length>=2){
            this.getLieuFilter(filter)
        }
    }
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

    filterSchool(event){
        // console.log(event.target.value);
        let filter: string = event.target.value;
        if(filter.length>=3){
        this.getSchoolFilter(filter)
        }else {
        this.schoolsOptions=null;
        }
    }

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

    onSubmitSearch(){
        console.log("click on submit");
        this.searchBrochure.class = this.searchForm.controls.classe.value;
        this.searchBrochure.place = this.searchForm.controls.lieu.value;
        this.searchBrochure.name = this.searchForm.controls.etablissement.value;
        this.getBrochure()
    }

    onClearSearch(){
        console.log("click on clear");
        this.searchBrochure.class = "";
        this.searchBrochure.place = "";
        this.searchBrochure.name = "";
		this.buildForm();
        this.getBrochure()
    }

    getSearchFilter(searchFilter){
        if(searchFilter[0]!="" && searchFilter[1]!="" && searchFilter[2]==""){
        this.listBrochuresFiltered = this.listBrochures.filter(
        school => {
            return school.cycle.nom == searchFilter[0] &&
            school.address.city == searchFilter[1];
        })
        } else if (searchFilter[0]=="" && searchFilter[1]=="" && searchFilter[2]!=""){
        this.listBrochuresFiltered = this.listBrochures.filter(
        school => {
            return school.school==searchFilter[2]
        })
        } else if (searchFilter[0]!="" && searchFilter[1]!="" && searchFilter[2]!=""){
        this.listBrochuresFiltered = this.listBrochures.filter(
        school => {
            return school.school==searchFilter[2] && school.cycle.nom == searchFilter[0] && 
            school.address.city == searchFilter[1]
        })
        } else {
        this.listBrochuresFiltered=this.listBrochures;
        }
    }

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

    onDownloadBrochure(schoolId, brochureId){
        console.log(brochureId)
        this.downloadList[0]=brochureId;
        this.downloadSchoolList[0]=schoolId;
        this.brochDialog();
    }

}