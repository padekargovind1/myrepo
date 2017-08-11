import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { SchoolService } from '../services/school.service';
import { AdvancedSearchMdl } from '../model/advanced-search.model';
import swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-superieur',
  templateUrl: './superieur.component.html',
  styleUrls: ['./superieur.component.scss']
})
export class SuperieurComponent implements OnInit {

  schoolList : any;
  schoolListFilter = [];
  defaultSchoolList : any;
  compareList= [];
  compareListFilter = [];
  canFilter : boolean = false;
  searchFilter = ["", "", ""];
  searchForm : FormGroup;
  options={
    regions : [],
    departements : [],
    villes : []
  };
  schoolsOptions: any;
  advancedSearch={
    code : []
  };
  advancedSearchToDisplay=[];
  advancedSearchCategory=[];
  advancedSearchValue=[];
  religiousChecked : boolean = false;
  langues = [];
  languesRegio = [];
  diplomes = [];
  optionValue: string="";
  schoolComponentTitle = "";
  limit=20;
  apbSchools =[];
  searchBody={
    courses : {
      educationLevel : '',
      professionalSector : '',
      courseType : ''
    },
    postcode : '',
    departmentNumber : '',
    region : '',
    keyword : ''
  };
  domaines=[];

  constructor(private publicService : PublicService,
              private schoolService : SchoolService,
              private compareService : CompareService,
              private router : Router,
              private fb : FormBuilder,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.getApbSchool();
    this.runScript();
    this.setBackgroundImage();
    this.buildForm();
    // console.log(this.advancedSearch);
    this.langues=this.schoolService.getLangues();
    this.languesRegio=this.schoolService.getLanguesRegio();
    this.diplomes=this.schoolService.getDiplomes();
    this.domaines=this.publicService.getDomaines();
  }

  getApbSchool(){
    this.publicService.getApbSchool(this.limit, this.searchBody)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.apbSchools = response.data;
          }
        }
      )
  }

  onSubmitSearch(){
    this.searchBody.courses.professionalSector=this.searchForm.controls.domaine.value;
    this.searchBody.keyword=this.searchForm.controls.etablissement.value;
    this.searchFilter[0]=this.searchBody.courses.professionalSector;
    this.searchFilter[1]=this.searchBody.keyword;
    let lieu = this.searchForm.controls.lieu.value;
    this.searchFilter[2]=lieu
    console.log(this.searchForm.value, this.options)
    this.resetSearchBodyLieu()
    if(lieu!=''){
      if(this.options['regions'].indexOf(lieu)!=-1){
        this.searchBody.region=lieu;
      }
      for(let i =0; i<this.options['departements'].length; i++){
        if(this.options['departements'][i].departementNumber==lieu){
          this.searchBody.departmentNumber=lieu
        }
      }
      let i=0
      while(i<this.options['villes'].length){
        if(this.options['villes'][i].postcode==lieu){
          this.searchBody.postcode=lieu
        }
        i++;
      }
    }
    console.log(this.searchBody)
    this.getApbSchool();
  }

  resetSearchBodyLieu(){
    this.searchBody.region='';
    this.searchBody.departmentNumber='';
    this.searchBody.postcode='';
  }

  runScript(){
    $('.filter-holder').on('click', function() {
      if($('.advance-filter').is(':visible')){
        $('.advance-filter').hide();
      } else {
        $('.advance-filter').show();
      }
	  });
    $('.advance-filter a').on('click', function(e) {
      if ($(this).hasClass('open')) {
        $(this).siblings('ul').toggleClass('fadeIn open');
        $(this).removeClass('open');
      } else {
        $('.advance-filter a.open').removeClass('open').siblings('ul').removeClass('fadeIn open');
        $(this).siblings('ul').toggleClass('fadeIn open');
        $(this).addClass('open');
      }
    });
    $('body').on('mousedown', function($event){
      // console.log($event.target.attributes)
      if(typeof $event.target.attributes['class']!='undefined'){
        if($event.target.attributes['class'].value == 'main' || $event.target.attributes['class'].value == 'filter-form-holder' || $event.target.attributes['class'].value == 'form-inline searchform  school-page ng-untouched ng-pristine ng-valid'){
          $('.advance-filter').hide();
        }
      }
    })
    $('#mobileFilter').on('click', function(e){
      if($('.advance-filter').is(':visible')){
        $('.advance-filter').hide();
      } else {
        $('.advance-filter').show();
      }
    })
    
    $('.slickjs').slick({
      arrows : false,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
      
  }

  setBackgroundImage(){
    this.advancedSearch.code=["enseignement"]
    this.schoolComponentTitle="Enseignement Supérieur";
    $('.filter-form-holder').css('background-image', "url('./assets/images/enseignement-school.jpg')")
  }

  buildForm(){
    this.searchForm = this.fb.group({
      domaine : [''],
      lieu : [''],
      etablissement : ['']
    })
    // console.log(this.searchForm)
    this.initOptions()
  }

  initOptions(){
    this.options['regions']=[];
    this.options['departements']=[];
    this.options['villes']=[];
    // console.log(this.options)
  }

  filterLieu(event){
    // console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=2){
      this.getLieuFilter(filter)
    }
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

  getLieuFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutoCompleteLieu(data)
      .subscribe(
        (response)=>{
          let data = response.data;
          // console.log(data);
          if(response.code!=400){
            this.options['regions']=data.regions
            this.options['departements']=data.departments
            this.options['villes']=data.cities
            console.log(this.options)
          }
        }
      )
  }

  getSchoolFilter(filter: string){
    this.publicService.getAutoCompleteApb(filter)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.schoolsOptions=[]
            for(let i = 0; i<response.data.length; i++){
              if(this.schoolsOptions.indexOf(response.data[i].longName)==-1){
                this.schoolsOptions.push(response.data[i].longName)
              }
            }
            console.log(this.schoolsOptions)
          }
        }
      )
  }

  postAdvancedFilter(){
    // console.log(this.advancedSearch)
    this.publicService.postSearchSchool(this.advancedSearch, this.limit)
      .subscribe(
        response=>{
          console.log(response);
          let data = response.data
          if(response.code==400){
            // console.log(response.message)
          } else {
            this.defaultSchoolList=response.data;
            this.schoolListFilter=data;
            // console.log(this.schoolListFilter)
            // this.filterCycleSchool(data)
          }
        }
      )
  }

  filterCycleSchool(cycleFromSearch){
    // console.log(cycleFromSearch)
    if(cycleFromSearch.length==0){
      this.schoolListFilter=[];
    } else {
      var schoolIdTab =[];
      for(let schoolId of cycleFromSearch){
        schoolIdTab.push(schoolId.school._id)
      }
      this.schoolListFilter = this.defaultSchoolList.filter(
        school => {
          if(schoolIdTab.indexOf(school._id)!=-1){
            return true
          } else{
            return false
          }
        }
      )
    }
  }

  onLevelRythme(event){
    console.log(event.srcElement.value)
    this.searchBody.courses.educationLevel=event.srcElement.value
    if(event.srcElement.value!=''){
      this.advancedSearchToDisplay.push(event.srcElement.value)
    } else {
      let index = this.advancedSearchToDisplay.indexOf(event.srcElement.value)
      this.advancedSearchToDisplay.splice(index, 1)
    }
    this.getApbSchool();
  }

  onReconnaissanceClick(event){
    console.log(event.srcElement.localName,event.srcElement.checked)
    if(event.srcElement.localName=='input'){
      if(event.srcElement.checked){
        this.searchBody['recognizedByState']=true;
        this.advancedSearchToDisplay.push("Reconnu par l'État");
      } else {
        delete this.searchBody['recognizedByState']
        let index = this.advancedSearchToDisplay.indexOf("Reconnu par l'État")
        this.advancedSearchToDisplay.splice(index, 1)
      }
      this.getApbSchool();
    }
  }

  onEtrangerClick(event){
    console.log(event.srcElement.localName,event.srcElement.checked)
    if(event.srcElement.localName=='input'){
      if(event.srcElement.checked){
        this.searchBody.courses['curriculumAbroad']=true
        this.advancedSearchToDisplay.push("Cursus avec une période à l'étranger");
      } else {
        delete this.searchBody.courses['curriculumAbroad'];
        let index = this.advancedSearchToDisplay.indexOf("Cursus avec une période à l'étranger")
        this.advancedSearchToDisplay.splice(index, 1)
      }
      this.getApbSchool();
    }
  }

  onAdvancedClick(event, category){
    console.log(event, category);
    // if(event.srcElement.localName=="input"){
    //   console.log(event.srcElement.checked)
    //   if(event.srcElement.checked){
    //     // console.log("checked!")
    //     if(typeof this.advancedSearch[category] == "undefined"){
    //       this.advancedSearch[category]={}
    //     }
    //     this.advancedSearch[category][event.srcElement.name]=true;
    //     this.advancedSearchToDisplay.push(event.srcElement.parentElement.children[1].textContent)
    //     this.advancedSearchCategory.push(category);
    //     this.advancedSearchValue.push(event.srcElement.name);
    //     console.log(this.advancedSearch);
    //     this.limit=20
    //     this.postAdvancedFilter();
    //   } else{
    //     // console.log("unchecked!");
    //     console.log(this.advancedSearch[category], event.srcElement.name)
    //     if(this.advancedSearch[category]!==undefined){
    //       delete this.advancedSearch[category][event.srcElement.name];
    //     }
    //     this.checkCategory(category);
    //     console.log(this.advancedSearch);
    //     this.limit=20
    //     this.postAdvancedFilter();
    //     let index = this.advancedSearchToDisplay.indexOf(event.srcElement.parentElement.children[1].textContent);
    //     this.advancedSearchToDisplay.splice(index, 1);
    //     this.advancedSearchCategory.splice(index, 1)
    //     this.advancedSearchValue.splice(index, 1);
        
    //   }
    // }
  }

  checkCategory(category){
    let i = 0;
    for(var prop in this.advancedSearch[category]){
      i++;
    } 
    if(i==0){
      delete this.advancedSearch[category];
    }
  }

  addOptionFilter(event){
    // console.log(event.srcElement.value);  
    this.advancedSearch['options'] = {option : event.srcElement.value}
    // console.log(this.advancedSearch['options']['option'])
    if(this.advancedSearch['options']['option']==""){
      delete this.advancedSearch['options']
    }
    // console.log(this.advancedSearch)
    this.postAdvancedFilter();
  }

  cleanSearch(){
    // console.log("clean search")
    delete this.advancedSearch;
    // this.advancedSearchToDisplay=[];
    // this.advancedSearchCategory=[];
    // this.advancedSearchValue=[]
    this.searchForm.reset();
    this.buildForm();
    this.searchFilter = ["", "", ""];
    this.searchBody.courses.professionalSector='';
    this.searchBody.postcode='';
    this.searchBody.departmentNumber='';
    this.searchBody.region='';
    this.searchBody.keyword='';
    this.publicService.storeSearchSchool(this.searchFilter);
    this.limit=20
    this.getApbSchool()
    // this.getSearchFilter();
  }

  cleanAdvancedSearch(){
    // console.log("Clean all search");
    this.cleanSearch();
    this.optionValue="";
    // console.log($('.checkbox'));
    $('.checkbox').prop('checked', false)
  }

  onRemoveFilter(index, advanced){
    // console.log("click sur la croix", advanced)
    // this.advancedSearchToDisplay.splice(index, 1)
    // this.getApbSchool()
    // delete this.advancedSearch[this.advancedSearchCategory[index]][this.advancedSearchValue[index]]
    // this.checkCategory(this.advancedSearchCategory[index]);
    // $('.'+this.advancedSearchValue).prop('checked', false)
    // this.advancedSearchCategory.splice(index, 1);
    // this.advancedSearchValue.splice(index, 1);
    // this.limit=20;
    // this.postAdvancedFilter();
  }

  showMore(){
    this.limit+=20
    this.getApbSchool()
  }

}
