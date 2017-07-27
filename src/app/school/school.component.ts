import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { SchoolService } from '../services/school.service';
import { AdvancedSearchMdl } from '../model/advanced-search.model';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  schoolList : any;
  schoolListFilter : any;
  compareList= [];
  compareListFilter = [];
  filterList = ["Cycles & Classes", "Langues", "Spécialités", 
                "Internat", "Stages", "Restauration", 
                "Externat", "Status", "Ens. Confessionel", 
                "Sections", "Diplôme", "Options", "Places Disponible"]
  four : boolean = false;
  canCompare : boolean = false;
  canFilter : boolean = false;
  searchFilter = [];
  searchForm : FormGroup;
  options: any;
  schoolsOptions: any;
  advancedSearch=[];
  advancedSearchToDisplay=[];
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
  boardingChecked : boolean = false;

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
    this.getSchoolList();
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
		$('.advance-filter').toggleClass('open');
		// $('.main').toggleClass('open');
		// $('.ad-holder').toggleClass('hide');
		// $('.survey-holder').toggleClass('hide');
	  });
    $('#filter-trigger').on('change', function() {
        // console.log();
        if ($(this).prop('checked')) {
            $('.advance-filter').toggleClass('open');
        } else {
            $('.advance-filter').toggleClass('open');
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
          } else if (this.pathName == "college"){
            this.schoolComponentTitle="Un collège 6ème-3ème"
            $('.filter-form-holder').css('background-image', "url('./assets/images/secondary-school.jpg')")
          } else {
            this.schoolComponentTitle="Un lycée 2nde-Tle"
            $('.filter-form-holder').css('background-image', "url('./assets/images/high-school.jpg')")
          }
        }
      )
  }

  getSchoolList(){
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          // console.log(response);
          this.schoolList = response.data;
          this.schoolListFilter = response.data;
          console.log(this.schoolList);
          this.getSearchFilter();
        }
      )
  }

  getSearchFilter(){
    this.searchFilter = this.publicService.getSearchSchool();
    this.patchValue();
    console.log(this.searchFilter);
    if(this.searchFilter[0]!="" && this.searchFilter[1]!="" && this.searchFilter[2]==""){
      this.schoolListFilter = this.schoolList.filter(
      school => {
        return school.cycles[0].cycle.classes[0].className == this.searchFilter[0] &&
          school.address.city == this.searchFilter[1];
      })
    } else if (this.searchFilter[0]=="" && this.searchFilter[1]=="" && this.searchFilter[2]!=""){
      this.schoolListFilter = this.schoolList.filter(
      school => {
        return school.longName==this.searchFilter[2] || school.shortName==this.searchFilter[2]
      })
    } else if (this.searchFilter[0]!="" && this.searchFilter[1]!="" && this.searchFilter[2]!=""){
      this.schoolListFilter = this.schoolList.filter(
      school => {
        return school.longName==this.searchFilter[2] || school.shortName==this.searchFilter[2] &&
          school.cycles[0].cycle.classes[0].className == this.searchFilter[0] && school.address.city == this.searchFilter[1]
      })
    } else if(this.advancedSearch.length!=0){
      console.log("test");
      this.schoolListFilter = this.schoolList.filter(
        school => {
          for(let i=0; i<this.advancedSearch.length; i=+2){
            // console.log(this.advancedSearch[i], this.advancedSearch[i+1]);
            return school.cycles[0].cycle[this.advancedSearch[i]][this.advancedSearch[i+1]].value
          }
        }
      )
    }else {
      this.schoolListFilter=this.schoolList;
    }
    if(this.languageAdvancedSearch.length!=0){
      for(let i=0; i<this.languageAdvancedSearch.length; i++){
        this.schoolListFilter = this.schoolList.filter(
          school => {
            console.log("test")
            if(school.cycles[0].cycle.language[this.languageAdvancedSearch[i]].value.length==0){
              return false;
            } else {
              if(school.cycles[0].cycle.language[this.languageAdvancedSearch[i]].value.indexOf(this.languageAdvancedSearchName[i])==-1){
                return false;
              }else{
                return true;
              }
            }
          }
        )
      }
    } 
  }

  patchValue(){
    this.searchForm.patchValue({
      classe : this.searchFilter[0],
      lieu : this.searchFilter[1],
      etablissement : this.searchFilter[2]
    })
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
    console.log(this.canFilter);
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
    let schoolList = this.compareList;
    console.log(schoolList, this.compareListFilter);
    this.compareService.storeCompareFilter(this.compareListFilter);
    this.router.navigate(['/compare-mode/', schoolList]);
  }

  buildForm(){
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
  }

  onSubmitSearch(){
    let data = [
      this.searchForm.controls.classe.value,
      this.searchForm.controls.lieu.value,
      this.searchForm.controls.etablissement.value
    ]
    this.publicService.storeSearchSchool(data);
    this.getSearchFilter();
  }

  filterLieu(event){
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=2){
      this.getLieuFilter(filter)
    }else {
      this.options=null;
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
          this.options=data
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

  onAdvancedClick(event, category){
    console.log(event);
    if(event.srcElement.localName=="input"){
      if(event.srcElement.checked){
        console.log("checked!")
        this.advancedSearch.push(category);
        this.advancedSearch.push(event.srcElement.name);
        this.advancedSearchToDisplay.push(event.srcElement.parentElement.children[1].textContent)
        // console.log(this.advancedSearch);
        this.getSearchFilter();
      } else{
        console.log("unchecked!");
        let index = this.advancedSearch.indexOf(category, 0);
        this.advancedSearch.splice(index, 2);
        this.getSearchFilter();
        index = this.advancedSearchToDisplay.indexOf(event.srcElement.parentElement.children[1].textContent);
        this.advancedSearchToDisplay.splice(index, 1);
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
    this.languageAdvancedSearch.push(category);
    this.languageAdvancedSearchName.push(event.srcElement.value);
    this.getSearchFilter();
  }

  addOptionFilter(event){
    console.log(event.srcElement.value);  
    this.cleanSearch();
    this.schoolListFilter = this.schoolList.filter(
      school => {
        this.optionValue = event.srcElement.value;
        let size = this.optionValue.length;
        if(school.cycles[0].cycle.classes[0].options[0].name.substr(0, size) == this.optionValue){
          return true;
        } else {
          return false;
        }
      })
  }

  cleanSearch(){
    console.log("clean search")
    this.languageAdvancedSearch=[];
    this.languageAdvancedSearchName=[]
    this.advancedSearch=[];
    this.advancedSearchToDisplay=[];
    this.searchForm.reset();
    this.buildForm();
    this.searchFilter = ["", "", ""];
    this.publicService.storeSearchSchool(this.searchFilter);
    this.getSearchFilter();
  }

  cleanAdvancedSearch(){
    console.log("Clean all search");
    this.cleanSearch();
    this.optionValue="";
    // console.log($('.checkbox'));
    $('.checkbox :checked').removeAttr('checked')
  }

  onConfessionClick(){
    this.confessionChecked=!this.confessionChecked;
  }

  onBoardingClick(){
    this.boardingChecked=!this.boardingChecked;
    console.log(this.boardingChecked);
  }

  onRemoveFilter(index){
    console.log("click sur la croix")
    this.advancedSearchToDisplay.splice(index, 1)
    this.getSearchFilter();
  }

  onRemoveLanguageFilter(index){
    console.log("click")
    this.languageAdvancedSearch.splice(index, 1);
    this.languageAdvancedSearchName.splice(index, 1);
    this.getSearchFilter();
  }

}
