import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { SchoolService } from '../services/school.service';
import { UsersService } from '../services/users.service';
import { BrochureService } from '../services/brochure.service';
import { SendService } from '../services/send.service';
import { AdvancedSearchMdl } from '../model/advanced-search.model';
import { SendMessageComponent } from '../shared/send-message/send-message.component';
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
                "Externat", "Statut", "Enseignement Confessionel", 
                "Sections", "Diplôme", "Options", "Places Disponibles"]
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
    code : [],
    class : [''],
    name : '',
    place : []
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
  totalRecords=20;
  isLoader=false;
  slickNb : number;
  nbBodyClick : number =0;
  nbAdvancedClick : number = 0;
  forAdvancedSearch : boolean = false;
  onMobile : boolean = false;
  bottomAdCarousalClasses : string = "footer-ads hidden animated";
  lieuSelected=[];
  imageExtensions = ["png","gif","jpeg"];
  imagePathPre : string = "http://54.254.203.172/cideapi/";

  constructor(private publicService : PublicService,
              private schoolService : SchoolService,
              private compareService : CompareService,
              private usersService : UsersService,
              private brochureService : BrochureService,
              private router : Router,
              private fb : FormBuilder,
              private route : ActivatedRoute,
              private sendService : SendService,
              public dialog:MdDialog) { }

  ngOnInit() {
    this.slickNb=this.publicService.getNbSlick();
    this.setBackgroundImage();
    this.buildForm();
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
    // console.log(this.advancedSearch);
    this.langues=this.schoolService.getLangues();
    this.languesRegio=this.schoolService.getLanguesRegio();
    this.diplomes=this.schoolService.getDiplomes();
	  this.runScriptOnInit()
    // console.log(window.screen.width)
    setTimeout(()=>{
      this.runScript()
    })
  }

  runScriptOnInit(){
    function detectmob() {
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
          return true;
      }
      else {
          return false;
      }
    }
    var checkMobile = detectmob();
    if (checkMobile) {
      console.log(checkMobile)
      this.onMobile=true;
    }else {
      this.onMobile=false;
    }
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
      // console.log($(this).attr('id'))
      // if(typeof $event.target.attributes['class']!='undefined'){
      //   if($event.target.attributes['class'].value == 'main' || 
      //     $event.target.attributes['class'].value == 'filter-form-holder' || 
      //     $event.target.attributes['class'].value == 'form-inline searchform  school-page ng-untouched ng-pristine ng-valid'|| 
      //     $event.target.attributes['class'].value == "col-md-3" ||  
      //     $event.target.attributes['class'].value == "list-schools  row  white-background" ||
      //     $event.target.attributes['class'].value == 'row'){
      //     $('.advance-filter').hide();
      //   }
      // }
    })
    $('#mobileFilter').on('click', function(e){
		e.stopPropagation();
        $('.advance-filter').toggle();
    });
	$('*').click(function(e){
		var a = e.target;
		if ($(a).parents('.advancedFilter').length === 0) {
			if($('.advance-filter').is(':visible')){
				$('.advance-filter').hide();
				$('.switch.mobile #filter-trigger').trigger("click");
			  }
		}
	});
	
    window.setTimeout("hideAd()", 3000);
  	window.setTimeout("hideSideAd()", 13000);
   
  	$('.popup-ad-holder-mobile .close, .from-popup .close').on('click', function() { 
      $(this).parent().addClass('fadeOutDown'); 
    });
	
	
	var bottomadds_count=5;
	if(this.onMobile)
	{
		this.bottomAdCarousalClasses = "mobileads-carousal-bottom";
		bottomadds_count=2;
	}
	
    $('.slickjs'+this.slickNb).slick({
      arrows : false,
      slidesToShow: bottomadds_count,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
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
    //this.nbAdvancedClick++;
    //$('.advance-filter').show();
  }

  getSlickNb(){
    return 'slickjs'+this.slickNb;
  }

  setBackgroundImage(){
    this.subscription = this.route.url
      .subscribe(
        params =>{
          // console.log(params[0].path);
            this.pathName = params[0].path;
          if(this.pathName == "ecole"){
            this.schoolComponentTitle="ECOLE Maternelle / Primaire"
            $('.filter-form-holder').css('background-image', "url('./assets/images/ecole.jpg')")
            this.advancedSearch.code=["maternelle", "primaire"]
          } else if (this.pathName == "college"){
            this.schoolComponentTitle="Rechercher un collège (6ème-3ème)"
            $('.filter-form-holder').css('background-image', "url('./assets/images/college.jpg')")
            this.advancedSearch.code=[this.pathName]
          } else if(this.pathName == "lycee"){
            this.schoolComponentTitle="Rechercher un lycée (Seconde-Terminale)"
            $('.filter-form-holder').css('background-image', "url('./assets/images/lycee.jpg')")
            this.advancedSearch.code=[this.pathName]
          } else if(this.pathName == "internat"){
            this.advancedSearch.code=["maternelle", "primaire", "college", "lycee"]
            this.advancedSearch['boarding']={ onSite : true, notOnSite : true }
            this.schoolComponentTitle="Rechercher un Internat (Maternelle au Lycée)"
            $('.filter-form-holder').css('background-image', "url('./assets/images/internat.jpg')")
          } else {
            this.advancedSearch.code=["enseignement"]
            this.schoolComponentTitle="Enseignement Supérieur";
            $('.filter-form-holder').css('background-image', "url('./assets/images/autodoc.jpg')")
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
    // console.log(this.searchForm)
    this.fieldSearchForm()
    this.initOptions()
  }

  fieldSearchForm(){
    let data = this.publicService.getSearchSchool()
    // console.log(data)
    this.searchForm.patchValue({
      classe : data[0],
      lieu : data[1],
      etablissement : data[2]
    })
    this.forAdvancedSearch=true;
    this.lieuSelected=this.schoolService.getSelectedLieu();
    this.onSubmitSearch()
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


  onSubmitSearch(){
    // console.log(this.searchForm)
    if(!this.forAdvancedSearch){
      if((this.searchForm.value.classe=="" || this.searchForm.value.lieu=="") && this.searchForm.value.etablissement==""){
        swal({
          title: 'Attention',
          text: 'Vous devez choisir une classe et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
          type: 'warning',
          confirmButtonText: "J'AI COMPRIS"
        })
        return;
      }
    }
    let data = {
      class : this.searchForm.controls.classe.value=='' || this.searchForm.controls.classe.value=='Indifférent' ? '' : this.searchForm.controls.classe.value,
      place : [this.searchForm.controls.lieu.value],
      name : this.searchForm.controls.etablissement.value
    }
    console.log(this.lieuSelected, this.advancedSearch)
    this.searchFilter=[this.publicService.getClassName(), data.place, data.name];
    this.fillAdvancedSearchClass(data);
    this.advancedSearch.place = this.lieuSelected;
    if(this.advancedSearch.place.length==0){
      delete this.advancedSearch.place;
    }
    this.advancedSearch.name = data.name;
    // console.log(this.advancedSearch);
    this.publicService.storeSearchSchool(this.searchFilter);
    this.postAdvancedFilter();
    this.forAdvancedSearch=false;
  }

  fillAdvancedSearchClass(data){
    this.advancedSearch.class=[''];
    if(data.class=="Cursus international"){
      this.advancedSearch.class[0]="CI";
      this.advancedSearch.class[1]="BAC-I";
      this.advancedSearch.class[2]="cursus_non_francophone";
    }else{
      this.advancedSearch.class[0] = data.class;
    }
  }

  // postFastSearch(data){
  //   console.log(data)
  //   this.publicService.postFastSearch(data, this.limit)
  //     .subscribe(
  //       response => {
  //         // console.log(response);
  //         if(response.code==400){
  //           // console.log(response.message)
  //         } else {
  //           this.schoolListFilter=response.data
  //           // console.log(this.schoolListFilter)
  //         }
  //       }
  //     )
  // }

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
            this.options['regions']=data.regions;
            this.options['departements']=data.departments;
            this.options['villes']=data.cities;
            // console.log(this.options)
          }
        }
      )
  }

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

  postAdvancedFilter(){
    console.log(this.advancedSearch);
    this.isLoader=true;
    this.publicService.postSearchSchool(this.advancedSearch, this.limit)
      .subscribe(
        response=>{
          console.log(response);
          let data = response.data;
		  for(var j=0;j<data.length;j++)
		  {
			  var imgpath = data[j].cycles[0].logo1
			  for(var i=0;i<this.imageExtensions.length;i++)
			  {
				var tempimgpath = "uploads/school/"+data[j]._id+"/logo/"+data[j]._id+"."+this.imageExtensions[i];
				if(this.imageExists(this.imagePathPre + tempimgpath))
				{
					imgpath = tempimgpath;
					break;
				}
			  }
			  data[j].cycles[0].logo1 = imgpath;
		  }
		  this.isLoader=false;
          if(response.code==400){
            // console.log(response.message)
          } else {
            this.defaultSchoolList=data;
            this.schoolListFilter=data;
			      this.totalRecords = response.total;
            // console.log(this.schoolListFilter)
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
  imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
  }

  onAdvancedClick(event, category){
    // console.log(event);
    if(event.srcElement.localName=="input"){
      // console.log(event.srcElement.checked)
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
        // console.log(this.advancedSearch[category], event.srcElement.name)
        if(this.advancedSearch[category]!==undefined){
          delete this.advancedSearch[category][event.srcElement.name];
        }
        this.checkCategory(category);
        // console.log(this.advancedSearch);
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
    } else if(event.srcElement.value!="" && this.languageAdvancedSearchName.indexOf(event.srcElement.value)==-1){
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
    this.schoolService.cleanSelectedLieu();
    this.initAdvancedSearch();
    this.setCodeName();
    this.advancedSearchToDisplay=[];
    this.advancedSearchCategory=[];
    this.advancedSearchValue=[]
    this.searchForm.reset();
    this.searchFilter = ["", "", ""];
    this.publicService.storeSearchSchool(this.searchFilter);
    this.buildForm();
    this.limit=20
    console.log(this.advancedSearch)
    this.postAdvancedFilter();
    // this.getSearchFilter();
  }

  initAdvancedSearch(){
    this.advancedSearch={
      code : [],
      class : [''],
      name : '',
      place : ['']
    };
  }

  setCodeName(){
    if(this.pathName=="ecole"){
      this.advancedSearch.code=["maternelle", "primaire"]
    } else if(this.pathName=="college" || this.pathName=="lycee"){
      this.advancedSearch.code=[this.pathName]
    } else if(this.pathName="internat"){
      this.advancedSearch.code=["maternelle", "primaire", "college", "lycee"]
      this.advancedSearch['boarding']={
        notOnSite : true,
        onSite : true
      }
    }
  }

  cleanAdvancedSearch(){
    // console.log("Clean all search");
    this.lieuSelected=[];
    this.cleanSearch();
    this.optionValue="";
    this.schoolsOptions=null;
    this.options={
      regions : [],
      departements : [],
      villes : []
    };
    // console.log($('.checkbox'));
    $('.checkbox').prop('checked', false)
  }

  onConfessionClick(){
    this.confessionChecked=!this.confessionChecked;
    // console.log(this.advancedSearchToDisplay, this.advancedSearch)
    if(!this.confessionChecked){
      delete this.advancedSearch['religious']
      // console.log(this.advancedSearchCategory)
      for(let i =0; i< this.advancedSearchCategory.length; i++){
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
      // console.log(this.advancedSearchToDisplay, this.advancedSearchCategory, this.advancedSearchValue)
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
    this.postAdvancedFilter()
  }

  saveInWish(schoolId){
    const data = {
      type : "wish",
      schools : [{school : schoolId, class:'EE'}]
    }
    this.usersService.postApplication(data)
      .subscribe(
        response=>{
          console.log(response)
          // Bad Request.
          if(response.code==200){
            swal({
              title: 'Ajout à la liste des voeux',
              text: "L'école séléctionné a bien été ajouté à votre liste des voeux",
              type: 'warning',
              confirmButtonText: "J'ai compris"
              })
          }else {
            swal({
              title: 'Attention',
              text: response.message,
              type: 'warning',
              confirmButtonText: "J'ai compris"
              })
          }
        }
      )
  }

  goToBrochure(schoolName){
    // console.log(schoolName)
    this.brochureService.storeSchoolSearch(schoolName);
    this.router.navigate(['/brochure']);
  }

  sendMessage(school){
    let config = this.sendService.makeProfile(school)
    let dialogref = this.dialog.open(SendMessageComponent, config);
  }

  storeClassName(event){
    console.log(event)
    this.publicService.storeClassName(event.toElement.selectedOptions[0].text);
  }

}
