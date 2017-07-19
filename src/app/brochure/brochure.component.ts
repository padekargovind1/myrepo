import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PublicService } from '../services/public.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import {BrochpopupComponent} from './brochpopup/brochpopup.component'

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit, AfterViewInit {

    listBrochures = [];
    listBrochuresFiltered = [];
    lastCloseResult: string;
    config: MdDialogConfig = {
        disableClose: true,
        width: '300',
        height: '450',
        position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
        }
    };
    searchForm : FormGroup;
    options: any;
    schoolsOptions: any;

  constructor(private publicService : PublicService,
              public dialog:MdDialog,
              private fb : FormBuilder) { 
      this.getBrochure();
      this.buildForm();
      // this.doBrochure();
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  	// this.doBrochure();
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
    this.publicService.getBrochure()
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
        }else {
        this.options=null;
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
            this.options=data
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
        let data = [
            this.searchForm.controls.classe.value,
            this.searchForm.controls.lieu.value,
            this.searchForm.controls.etablissement.value
        ]
        this.getSearchFilter(data);
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

    onCheckbox(brochureId){
        console.log(brochureId);
    }

}