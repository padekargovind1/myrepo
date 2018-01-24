import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { SchoolService } from '../services/school.service';
//import { AdvancedSearchMdl } from '../model/advanced-search.model';
//import swal from 'sweetalert2';
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
  niveauSelect:any;
  rhytmeSelect:any;
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
  advancedSearchToDisplay1=[];
  advancedSearchCategory=[];
  advancedSearchValue=[];
  religiousChecked : boolean = false;
  langues = [];
  languesRegio = [];
  diplomes = [];
  optionValue: string="";
  schoolComponentTitle = "";
  limit=20;
  page=1;
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
  nbBodyClick : number =0;
  nbAdvancedClick : number = 0;
  temp : number = 0;
  recognizedByStateCheck:false;
  curriculumAbroadCheck:false;
  constructor(private publicService : PublicService,
              private schoolService : SchoolService,
              private compareService : CompareService,
              private router : Router,
              private fb : FormBuilder,
              private route : ActivatedRoute) { }

  ngOnInit() {
    // this.getApbSchool();
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
    // console.log(this.searchBody)
    this.publicService.getApbSchool(this.limit, this.searchBody)
      .subscribe(
        response=>{
          // console.log(response)
          if(response.code!=400){
            this.apbSchools = response.data;
          }
        }
      )
  }

  onSubmitSearch(){
    this.searchBody.courses.professionalSector=this.searchForm.value.domaine;
    this.searchBody.keyword=this.searchForm.value.etablissement;
    this.searchFilter[0]=this.searchBody.courses.professionalSector;
    this.searchFilter[1]=this.searchBody.keyword;
    let lieu = this.searchForm.value.lieu;
    this.searchFilter[2]=lieu
    // console.log(this.searchForm.value, this.options)
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
    // console.log(this.searchBody)
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
      //if(typeof $event.target.attributes['class']!='undefined'){
        //if($event.target.attributes['class'].value == 'main' || $event.target.attributes['class'].value == 'filter-form-holder' || //$event.target.attributes['class'].value == 'form-inline searchform  school-page ng-untouched ng-pristine ng-valid'){
         // $('.advance-filter').hide();
        //}
      //}
    })
    $('#mobileFilter').on('click', function(e){
		e.stopPropagation();
        $('.advance-filter').toggle();
    });
	$('*').click(function(e){
		var a = e.target;
		if ($(a).parents('.filter-wrapper').length === 0) {
			if($('.advance-filter').is(':visible')){
				$('.advance-filter').hide();
				$('.switch.mobile #filter-trigger').trigger("click");
			  }
		}
	});

    setTimeout(()=>{
      $('.filter-form-holder').addClass('filter-form-holder-height')
    }, 3000);

    $('.slickjs').slick({
      arrows : false,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });

    window.setTimeout("hideAd()", 3000);
  	window.setTimeout("hideSideAd()", 13000);

  	$('.popup-ad-holder-mobile .close, .from-popup .close').on('click', function() {
      $(this).parent().addClass('fadeOutDown');
    });
  }

  setBackgroundImage(){
    this.advancedSearch.code=["enseignement"]
    this.schoolComponentTitle="Enseignement Supérieur";
    $('.filter-form-holder').css('background-image', "url('./assets/images/enseignement.jpg')")
    //$('.filter-form-holder').css('background-image', "url('./assets/images/primary-school.jpg')");
  }

  buildForm(){
    this.searchForm = this.fb.group({
      domaine : [''],
      lieu : [''],
      etablissement : ['']
    })
    // console.log(this.searchForm)
    this.initOptions();
    this.fieldForm()
  }

  initOptions(){
    this.options['regions']=[];
    this.options['departements']=[];
    this.options['villes']=[];
    // console.log(this.options)
  }

  fieldForm(){
    let data = this.publicService.getSearchSchool()
    // console.log(data);
    this.searchForm.patchValue({
      domaine : data[0],
      lieu : data[1],
      etablissement : data[2]
    })
    this.onSubmitSearch()
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
          // console.log(response)
          if(response.code!=400){
            this.schoolsOptions=[]
            for(let i = 0; i<response.data.length; i++){
              if(this.schoolsOptions.indexOf(response.data[i].longName)==-1){
                this.schoolsOptions.push(response.data[i].longName)
              }
            }
            // console.log(this.schoolsOptions)
          }
        }
      )
  }

  postAdvancedFilter(){
    // console.log(this.advancedSearch)
    this.publicService.postSearchSchool(this.advancedSearch, this.limit, this.page)
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

  // filterCycleSchool(cycleFromSearch){
  //   // console.log(cycleFromSearch)
  //   if(cycleFromSearch.length==0){
  //     this.schoolListFilter=[];
  //   } else {
  //     var schoolIdTab =[];
  //     for(let schoolId of cycleFromSearch){
  //       schoolIdTab.push(schoolId.school._id)
  //     }
  //     this.schoolListFilter = this.defaultSchoolList.filter(
  //       school => {
  //         if(schoolIdTab.indexOf(school._id)!=-1){
  //           return true
  //         } else{
  //           return false
  //         }
  //       }
  //     )
  //   }
  // }
  
  onLevelRythme(event,flag){
    console.log("val:- ",event.srcElement.value, flag)

    this.searchBody.courses.educationLevel=event.srcElement.value
    if(event.srcElement.value!=''){
      if(event.srcElement.value=="Alternance" || event.srcElement.value=="Classique"){
        this.advancedSearchToDisplay1[0]=event.srcElement.value;
        this.searchBody.courses.courseType=event.srcElement.value
        console.log("====>>> 1 ");
      } else {
        this.advancedSearchToDisplay[0]=event.srcElement.value;
        this.searchBody.courses.educationLevel=event.srcElement.value
        console.log("====>>> 2 ");
      }
      console.log(this.searchBody)
    } else {
      let index = this.advancedSearchToDisplay.indexOf(event.srcElement.value)
      console.log("index====>>> ",index);
      //this.advancedSearchToDisplay.splice(index, 1) // Commented By Harish
      if(event.srcElement.value=="Alternance" || event.srcElement.value=="Classique"){
        this.searchBody.courses.courseType=''
      } else {
        if(flag == "rhytmeFlag")
        this.advancedSearchToDisplay1[0]=event.srcElement.value;
        else if(flag == "niveauFlag")
        this.advancedSearchToDisplay[0]=event.srcElement.value;
        this.searchBody.courses.educationLevel=''
      }
    }
    console.log("====>>> ",this.advancedSearchToDisplay);
    this.getApbSchool();
  }

  onReconnaissanceClick(event){    
    console.log(event.srcElement.localName,event.srcElement.checked)
    if(event.srcElement.name=='recognizedByState'){
      if(event.srcElement.checked){
        this.searchBody['recognizedByState']=true;
        this.advancedSearchToDisplay[2]="Reconnu par l'État";
      } else {
        delete this.searchBody['recognizedByState']
        this.advancedSearchToDisplay.splice(2, 1)
      }
      this.getApbSchool();
    }
  }

  onEtrangerClick(event){
    console.log(event.srcElement.localName,event.srcElement.checked)
    if(event.srcElement.name=='curriculumAbroad'){
      if(event.srcElement.checked){
        this.searchBody.courses['curriculumAbroad']=true
        this.advancedSearchToDisplay[3]="Cursus avec une période à l'étranger";
      } else {
        delete this.searchBody.courses['curriculumAbroad'];
        this.advancedSearchToDisplay.splice(3, 2)
      }
      this.getApbSchool();
    }
  }

  // checkCategory(category){
  //   let i = 0;
  //   for(var prop in this.advancedSearch[category]){
  //     i++;
  //   }
  //   if(i==0){
  //     delete this.advancedSearch[category];
  //   }
  // }

  // addOptionFilter(event){
  //   // console.log(event.srcElement.value);
  //   this.advancedSearch['options'] = {option : event.srcElement.value}
  //   // console.log(this.advancedSearch['options']['option'])
  //   if(this.advancedSearch['options']['option']==""){
  //     delete this.advancedSearch['options']
  //   }
  //   // console.log(this.advancedSearch)
  //   this.postAdvancedFilter();
  // }

  cleanSearch(){
    // console.log("clean search")
    delete this.advancedSearch;
    // this.advancedSearchToDisplay=[];
    // this.advancedSearchCategory=[];
    // this.advancedSearchValue=[]
    //console.log("----===================->",this.test1);
    this.niveauSelect = '';
    this.rhytmeSelect = '';
    this.onRemoveFilter(0, 'advancedSearchToDisplay[0]');
    this.searchForm.reset();
    this.buildForm();
    this.searchFilter = ["", "", ""];
    this.searchBody.courses.professionalSector='';
    this.searchBody.postcode='';
    this.searchBody.departmentNumber='';
    this.searchBody.region='';
    this.searchBody.keyword='';
    this.publicService.storeSearchSchool(this.searchFilter);
    this.limit=20;
    this.getApbSchool();

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
    console.log("=====>",index,advanced);
    if(advanced=="Alternance" || advanced=="Classique"){
      console.log("1");
     if ($('.test2').hasClass('open')) {
        $('.test2').siblings('ul').toggleClass('fadeIn open');
        $('.test2').removeClass('open');
      } 
      this.advancedSearchToDisplay1.splice(index, 1);
      this.searchBody.courses.courseType='';
      this.rhytmeSelect = ''
    } else if (advanced=="Reconnu par l'État"){
      {  
        console.log("111");
        this.recognizedByStateCheck=false;
         this.advancedSearchToDisplay.splice(index, 1);
        delete this.searchBody['recognizedByState'];
      }
    } else if (advanced=="Cursus avec une période à l'étranger"){
      {
                console.log("222");

//    this.advancedSearchToDisplay.splice(index, 1); 
         this.advancedSearchToDisplay.splice(index, 1);
        this.curriculumAbroadCheck=false;
        delete this.searchBody['curriculumAbroad'];
      }
    } else {
                console.log("333",index,advanced);

     if ($('.test1').hasClass('open')) {
        $('.test1').siblings('ul').toggleClass('fadeIn open');
        $('.test1').removeClass('open');
          this.niveauSelect = '';
      }
       
    this.advancedSearchToDisplay.splice(index, 1); 
    this.searchBody.courses.educationLevel='';
    }
    this.getApbSchool();
  }

  showMore(){
    this.limit+=20
    this.getApbSchool()
  }

  clickOnBody(event){
    // console.log(event.srcElement.attributes['class'].textContent)
    // if(event.srcElement)
    //this.nbBodyClick++;
    //if(this.nbBodyClick!=this.nbAdvancedClick){
      //$('.advance-filter').hide();
      //this.nbAdvancedClick=this.nbBodyClick
    //}
  }

  showAdvanced(){
    //this.nbAdvancedClick++
    //$('.advance-filter').show();
  }

}
