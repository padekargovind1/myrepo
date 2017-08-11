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
  filterList = ["Cycles & Classes", "Langues", "Spécialités", 
                "Internat", "Stages", "Restauration", 
                "Externat", "Status", "Ens. Confessionel", 
                "Sections", "Diplôme", "Options", "Places Disponible"]
  four : boolean = false;
  canCompare : boolean = false;
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
  languageAdvancedSearch=[];
  languageAdvancedSearchName=[];
  religiousChecked : boolean = false;
  langues = [];
  languesRegio = [];
  diplomes = [];
  optionValue: string="";
  schoolComponentTitle = "";
  pathName ="";
  confessionChecked : boolean = false;
  lv1: any="";
  lv2: any="";
  lv3: any="";
  ancient: any="";
  regional: any="";
  limit=20;
  apbSchools =[];
  searchBody={
    courses : {
      educationLevel : '',
      professionalSector : ''
    },
    postCode : '',
    departmentNumber : '',
    region : '',
    keyword : ''
  };

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
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
    // console.log(this.advancedSearch);
    this.langues=this.schoolService.getLangues();
    this.languesRegio=this.schoolService.getLanguesRegio();
    this.diplomes=this.schoolService.getDiplomes();
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
          this.searchBody.postCode=lieu
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
    this.searchBody.postCode='';
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

  onCheckbox(schoolId){
    // console.log(schoolId);
    if(this.compareList.includes(schoolId)){
      // console.log("remove checkbox");
      let i = this.compareList.indexOf(schoolId, 0);
      // console.log(i);
      this.compareList.splice(i, 1);
      this.four=false;
      if(this.compareList.length<=1){
        this.canCompare=false;
      }
    } else if(this.compareList.length >= 4){
      swal({
        title: 'Attention',
        text: "Vous ne pouvez comparer plus de 4 écoles à la fois. Vous pouvez tout de même désélectionner une école déjà sélectionné",
        type: 'warning',
        confirmButtonText: 'Ok'
      })
      this.four=true;
    } else {
      this.compareList.push(schoolId);
      if(this.compareList.length>1){
        this.canCompare=true;
      }
    }
  }

  onFilterCheckbox(index){
    // console.log(index, this.compareListFilter[index]);
    this.compareListFilter[index] = !this.compareListFilter[index];
    this.canFilter = this.checkFilterBox();
    // console.log(this.canFilter);
  }

  checkFilterBox(){
    let i = 0;
    for(let filter of this.compareListFilter){
      console.log(filter);
      if(filter==true){
        return true;
      }
      i++;
    }
    return false;
  }

  onCompare(){
    this.compareService.storeCompareFilter(this.compareListFilter);
    this.compareService.storeSchoolId(this.compareList)
    this.router.navigate(['/compare-mode/']);
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

  onAdvancedClick(event, category){
    // console.log(event);
    console.log("test&")
    if(event.srcElement.localName=="input"){
      console.log(event.srcElement.checked)
      if(event.srcElement.checked){
        // console.log("checked!")
        if(typeof this.advancedSearch[category] == "undefined"){
          this.advancedSearch[category]={}
        }
        this.advancedSearch[category][event.srcElement.name]=true;
        this.advancedSearchToDisplay.push(event.srcElement.parentElement.children[1].textContent)
        this.advancedSearchCategory.push(category);
        this.advancedSearchValue.push(event.srcElement.name);
        console.log(this.advancedSearch);
        this.limit=20
        this.postAdvancedFilter();
      } else{
        // console.log("unchecked!");
        console.log(this.advancedSearch[category], event.srcElement.name)
        if(this.advancedSearch[category]!==undefined){
          delete this.advancedSearch[category][event.srcElement.name];
        }
        this.checkCategory(category);
        console.log(this.advancedSearch);
        this.limit=20
        this.postAdvancedFilter();
        let index = this.advancedSearchToDisplay.indexOf(event.srcElement.parentElement.children[1].textContent);
        this.advancedSearchToDisplay.splice(index, 1);
        this.advancedSearchCategory.splice(index, 1)
        this.advancedSearchValue.splice(index, 1);
        
      }
      if(event.srcElement.id=="confessionel" && event.srcElement.checked){
        this.religiousChecked=true;
      } else if(event.srcElement.id=="confessionel" && !event.srcElement.checked){
        this.religiousChecked=false;
      }
    }
  }

  filterLanguage(event, category){
    // console.log(event);
    // this.languageAdvancedSearch.push(category);
    if(typeof this.advancedSearch['language']=='undefined' && event.srcElement.value!=""){
      this.advancedSearch['language']={}
    }
    if(event.srcElement.value=="" && typeof this.advancedSearch['language']!='undefined'){
      if(this.advancedSearch['language'][category]!='undefined'){
        delete this.advancedSearch['language'][category];
        let index = this.languageAdvancedSearchName.indexOf(category)
        this.languageAdvancedSearchName.splice(index, 1);
        this.languageAdvancedSearch.splice(index, 1)
        this.checkCategory('language')
        this.postAdvancedFilter();
      }
    } else if(event.srcElement.value!=""){
      this.advancedSearch['language'][category]=event.srcElement.value
      this.languageAdvancedSearch.push(category);
      this.languageAdvancedSearchName.push(event.srcElement.value);
      // console.log("test", this.languageAdvancedSearch, this.languageAdvancedSearchName)
      this.postAdvancedFilter();
    }
    // console.log(this.advancedSearch)
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
    this.languageAdvancedSearch=[];
    this.languageAdvancedSearchName=[]
    delete this.advancedSearch;
    // this.advancedSearchToDisplay=[];
    // this.advancedSearchCategory=[];
    // this.advancedSearchValue=[]
    this.searchForm.reset();
    this.buildForm();
    this.searchFilter = ["", "", ""];
    this.searchBody.courses.professionalSector='';
    this.searchBody.postCode='';
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

  onConfessionClick(){
    this.confessionChecked=!this.confessionChecked;
    console.log(this.advancedSearchToDisplay, this.advancedSearch)
    if(!this.confessionChecked){
      delete this.advancedSearch['religious']
      console.log(this.advancedSearchCategory)
      for(let i =0; i< this.advancedSearchCategory.length; i++){
        console.log("test1")
        if(this.advancedSearchCategory[i]=='religious'){
          this.advancedSearchCategory.splice(i, 1)
          i--;
        }
      }
      for(let i=0; i<this.advancedSearchToDisplay.length; i++){
        if(this.advancedSearchToDisplay[i]=="Catholique" || this.advancedSearchToDisplay[i]=="Protestant" || this.advancedSearchToDisplay[i]=="Musulman" || this.advancedSearchToDisplay[i]=="Juif" || this.advancedSearchToDisplay[i]=="Boudhiste"){
          this.advancedSearchToDisplay.splice(i, 1)
          i--;
        }
      }
      for(let i=0; i<this.advancedSearchValue.length; i++){
        if(this.advancedSearchValue[i]=="catholic" || this.advancedSearchValue[i]=="protestant" || this.advancedSearchValue[i]=="muslim" || this.advancedSearchValue[i]=="jew" || this.advancedSearchValue[i]=="boudhist"){
          this.advancedSearchValue.splice(i, 1);
          i--;
        }
      }
      console.log(this.advancedSearchToDisplay, this.advancedSearchCategory, this.advancedSearchValue)
    }
  }

  onRemoveFilter(index, advanced){
    // console.log("click sur la croix", advanced)
    this.advancedSearchToDisplay.splice(index, 1)
    delete this.advancedSearch[this.advancedSearchCategory[index]][this.advancedSearchValue[index]]
    this.checkCategory(this.advancedSearchCategory[index]);
    $('.'+this.advancedSearchValue).prop('checked', false)
    this.advancedSearchCategory.splice(index, 1);
    this.advancedSearchValue.splice(index, 1);
    this.limit=20;
    this.postAdvancedFilter();
  }

  onRemoveLanguageFilter(index){
    // console.log("click")
    this[this.languageAdvancedSearch[index]]=""
    this.languageAdvancedSearch.splice(index, 1);
    this.languageAdvancedSearchName.splice(index, 1);
  }

  showMore(){
    this.limit+=20
    this.getApbSchool()
  }

}
