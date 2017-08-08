import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { SchoolService } from '../services/school.service';
import { AdvancedSearchMdl } from '../model/advanced-search.model';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  providers: []
})
export class SchoolComponent implements OnInit {

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
  subscription : Subscription;
  schoolComponentTitle = "";
  pathName ="";
  confessionChecked : boolean = false;
  lv1: any="";
  lv2: any="";
  lv3: any="";
  ancient: any="";
  regional: any="";
  limit=20;

  constructor(private publicService : PublicService,
              private schoolService : SchoolService,
              private compareService : CompareService,
              private router : Router,
              private fb : FormBuilder,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.runScript();
    this.setBackgroundImage();
    this.buildForm();
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
    console.log(this.advancedSearch);
    this.langues=this.schoolService.getLangues();
    this.languesRegio=this.schoolService.getLanguesRegio();
    this.diplomes=this.schoolService.getDiplomes();
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
    // console.log(this.route.firstChild())
    this.subscription = this.route.url
      .subscribe(
        params =>{
          // console.log(params[0].path);
          this.pathName = params[0].path
          if(this.pathName == "ecole"){
            this.schoolComponentTitle="École Maternelle / Primaire"
            $('.filter-form-holder').css('background-image', "url('./assets/images/primary-school.jpg')")
            this.advancedSearch.code=["maternelle", "primaire"]
          } else if (this.pathName == "college"){
              this.schoolComponentTitle="Un collège 6ème-3ème"
              $('.filter-form-holder').css('background-image', "url('./assets/images/secondary-school.jpg')")
              this.advancedSearch.code=[this.pathName]
          } else if(this.pathName == "lycee"){
            this.schoolComponentTitle="Un lycée 2nde-Tle"
            $('.filter-form-holder').css('background-image', "url('./assets/images/high-school.jpg')")
            this.advancedSearch.code=[this.pathName]
          } else if(this.pathName == "internat"){
            this.advancedSearch.code=["maternelle", "primaire", "college", "lycee"]
            this.advancedSearch['boarding']={ onSite : true, notOnSite : true }
            this.schoolComponentTitle="Un Internat Maternelle au Lycée"
            $('.filter-form-holder').css('background-image', "url('./assets/images/internat-school.jpg')")
            this.postAdvancedFilter()
          } else {
            this.advancedSearch.code=["enseignement"]
            this.schoolComponentTitle="Enseignement Supérieur";
            $('.filter-form-holder').css('background-image', "url('./assets/images/enseignement-school.jpg')")
          }
          // this.getAllSchool(this.limit);
          
        }
      )
  }

  buildForm(){
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.fieldSearchForm()
    this.initOptions()
  }

  fieldSearchForm(){
    let data = this.publicService.getSearchSchool()
    console.log(data)
    this.searchForm.patchValue({
      classe : data[0],
      lieu : data[1],
      etablissement : data[2]
    })
    this.onSubmitSearch()
  }

  initOptions(){
    this.options['regions']=[];
    this.options['departements']=[];
    this.options['villes']=[];
    console.log(this.options)
  }

  onCheckbox(schoolId){
    console.log(schoolId);
    if(this.compareList.includes(schoolId)){
      console.log("remove checkbox");
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
      // console.log(filter);
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


  onSubmitSearch(){
    let data = {
      class : this.searchForm.controls.classe.value,
      place : this.searchForm.controls.lieu.value,
      name : this.searchForm.controls.etablissement.value
    }
    this.searchFilter=[data.class, data.place, data.name]
    console.log(data);
    this.publicService.storeSearchSchool(data);
    this.postFastSearch(data)
    // this.getSearchFilter();
  }

  postFastSearch(data){
    this.publicService.postFastSearch(data, this.limit)
      .subscribe(
        response => {
          console.log(response);
          if(response.code==400){
            console.log(response.message)
          } else {
            this.schoolListFilter=response.data
            console.log(this.schoolListFilter)
          }
        }
      )
  }

  filterLieu(event){
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=2){
      this.getLieuFilter(filter)
    }
  }

  filterSchool(event){
    console.log(event.target.value);
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
          console.log(data);
          this.options['regions']=data.regions
          this.options['departements']=data.departments
          this.options['villes']=data.cities
        }
      )
  }

  getSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutocompleteSchool(data)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          this.schoolsOptions=data
        }
      )
  }

  // getAllSchool(limit){
  //   // console.log(this.limit)
  //   this.publicService.getSchoolsList(limit, this.schoolCode)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         if(response.code==400){
  //           console.log(response.message)
  //         } else {
  //           this.defaultSchoolList=response.data;
  //           this.schoolListFilter=response.data;
  //         }
  //       }
  //     )
  // }

  postAdvancedFilter(){
    console.log(this.advancedSearch)
    this.publicService.postSearchSchool(this.advancedSearch, this.limit)
      .subscribe(
        response=>{
          console.log(response);
          let data = response.data
          if(response.code==400){
            console.log(response.message)
          } else {
            this.defaultSchoolList=response.data;
            this.schoolListFilter=data;
            console.log(this.schoolListFilter)
            // this.filterCycleSchool(data)
          }
        }
      )
  }

  filterCycleSchool(cycleFromSearch){
    console.log(cycleFromSearch)
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
    console.log(event);
    if(event.srcElement.localName=="input"){
      if(event.srcElement.checked){
        console.log("checked!")
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
        console.log("unchecked!");
        delete this.advancedSearch[category][event.srcElement.name];
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
    console.log(event);
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
      console.log("test", this.languageAdvancedSearch, this.languageAdvancedSearchName)
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
    console.log(event.srcElement.value);  
    // this.cleanSearch();
    // this.schoolListFilter = this.schoolList.filter(
    //   school => {
    //     this.optionValue = event.srcElement.value;
    //     let size = this.optionValue.length;
    //     if(school.cycles[0].cycle.classes[0].options[0].name.substr(0, size) == this.optionValue){
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
  }

  cleanSearch(){
    console.log("clean search")
    this.languageAdvancedSearch=[];
    this.languageAdvancedSearchName=[]
    delete this.advancedSearch;
    this.setCodeName();
    this.advancedSearchToDisplay=[];
    this.advancedSearchCategory=[];
    this.advancedSearchValue=[]
    this.searchForm.reset();
    this.buildForm();
    this.searchFilter = ["", "", ""];
    this.publicService.storeSearchSchool(this.searchFilter);
    this.limit=20
    this.postAdvancedFilter();
    // this.getSearchFilter();
  }

  setCodeName(){
    if(this.pathName=="ecole"){
      this.advancedSearch={
        code:["maternelle", "primaire"]
      }
    } else {
      this.advancedSearch={
        code:[this.pathName]
      }
    }
  }

  cleanAdvancedSearch(){
    console.log("Clean all search");
    this.cleanSearch();
    this.optionValue="";
    // console.log($('.checkbox'));
    $('.checkbox').prop('checked', false)
  }

  onConfessionClick(){
    this.confessionChecked=!this.confessionChecked;
  }

  onRemoveFilter(index, advanced){
    console.log("click sur la croix", advanced)
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
    console.log("click")
    this[this.languageAdvancedSearch[index]]=""
    this.languageAdvancedSearch.splice(index, 1);
    this.languageAdvancedSearchName.splice(index, 1);
  }

  showMore(){
    this.limit+=20
    this.postAdvancedFilter()
  }

}
