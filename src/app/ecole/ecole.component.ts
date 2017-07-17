import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
import { SchoolService } from '../services/school.service';
declare var $:any;

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent implements OnInit, AfterViewInit {

  schoolList : any;
  schoolListFilter : any;
  compareList= [];
  four : boolean = false;
  canCompare : boolean = false;
  canFilter : boolean = false;
  compareListFilter = [];
  searchFilter = [];
  filterList = ["Cycles & Classes", "Langues", "Spécialités", 
                "Internat", "Stages", "Restauration", 
                "Externat", "Status", "Ens. Confessionel", 
                "Sections", "Diplôme", "Options", "Places Disponible"];
  searchForm : FormGroup;
  options: any;
  schoolsOptions: any;
  advancedSearch=[];
  advancedSearchToDisplay=[];
  languageAdvancedSearch=["", "", "", "", "", 
                          "", "", "", "", ""];
  religiousChecked : boolean = false;
  langues = [];
  languesRegio = [];
  diplomes = [];
  optionValue: string="";

  constructor(private publicService : PublicService,
              private router : Router,
              private compareService : CompareService,
              private fb : FormBuilder,
              private schoolService : SchoolService) { }

  ngOnInit() {
    this.buildForm();
    this.getSearchFilter();
    this.getSchoolList();
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
    console.log(this.advancedSearch);
    this.langues=this.schoolService.getLangues();
    this.languesRegio=this.schoolService.getLanguesRegio();
    this.diplomes=this.schoolService.getDiplomes();
  }

  getSchoolList(){
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          // console.log(response);
          this.schoolList = response.data;
          this.schoolListFilter = response.data;
          console.log(this.schoolList);
        }
      )
  }

  ngAfterViewInit() {
      /**
       * Show ads bases on delay time
       *
       */
      window.setTimeout(hideAd, 3000);

        function hideAd() {
            // console.log('time is up');
            // $('body').hover(function() {
                $('.popup-ad-holder').delay(3000).addClass('fadeOutDown');
                $('.from-popup').delay(6000).removeClass('hidden').addClass('fadeInDown animated');//.delay(16000).removeClass('fadeInDown').addClass('fadeOutDown');
            // });
        }

        window.setTimeout(hideSideAd, 13000);

        function hideSideAd() {
            $('.from-popup').delay(13000).removeClass('fadeInDown').addClass('fadeOutDown');
            $('.fixed-ad').delay(26000).removeClass('hidden').addClass('fadeIn animated');
        }


        $('.popup-ad-holder-mobile .close, .from-popup .close').on('click', function() { $(this).parent().addClass('fadeOutDown'); });


        // listen scrolling, in 500 px height will show footer ads
        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 500) {
                $('.footer-ads').removeClass('fadeOutDown hidden').addClass('fadeInUp');
            } else {
                $('.footer-ads').removeClass('fadeInUp').addClass('fadeOutDown');
            }
        });


        // Toggle advance filter
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


          // Initiate tooltip
        $('[data-toggle="tooltip"]').tooltip();

        // Carousel
        $('.slickjs').slick({
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              arrows: false,
              // centerMode: true
              responsive: [
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1
                    }
                  },
              ]
          });
  }

  getSearchFilter(){
    this.searchFilter = this.publicService.getSearchSchool();
    console.log(this.searchFilter);
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
      alert("Vous ne pouvez comparer plus de 4 écoles à la fois. Vous pouvez tout de même désélectionner une école déjà sélectionné");
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
    console.log(schoolList);
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
    this.searchFilter = this.publicService.getSearchSchool();
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
        console.log(this.advancedSearch);
        this.updateSchoolList();
      } else{
        console.log("unchecked!");
        let index = this.advancedSearch.indexOf(category, 0);
        this.advancedSearch.splice(index, 2);
        this.updateSchoolList();
        index = this.advancedSearchToDisplay.indexOf(event.srcElement.parentElement.children[1].textContent);
        this.advancedSearchToDisplay.splice(index, 1);
      }
    }
  }

  updateSchoolList(){
    console.log(this.advancedSearch.length);
    if(this.advancedSearch.length!=0){
      console.log("test");
      this.schoolListFilter = this.schoolList.filter(
        school => {
          for(let i=0; i<this.advancedSearch.length; i=+2){
            console.log(this.advancedSearch[i], this.advancedSearch[i+1]);
            return school.cycles[0].cycle[this.advancedSearch[i]][this.advancedSearch[i+1]].value
          }
        }
      )
    } else {
      this.schoolListFilter=this.schoolList;
    }
    console.log(this.schoolListFilter)
  }

  filterLanguage(event, category){
    console.log(event);
    if(category == 'lv1'){
      this.putFilterLanguage(0, 1, category, event);
    } else if (category == 'lv2'){
      this.putFilterLanguage(2, 3, category, event);
    } else if (category == 'lv3'){
      this.putFilterLanguage(4, 5, category, event);
    } else if (category == 'ancient'){
      this.putFilterLanguage(6, 7, category, event);
    } else {
      this.putFilterLanguage(8, 9, category, event);
    }
    this.updateSchoolListByLanguage();
  }

  updateSchoolListByLanguage(){
    for(let i=0; i<10; i+=2){
      if(this.languageAdvancedSearch[i]!=""){
        this.schoolListFilter = this.schoolList.filter(
          school => {
            if(school.cycles[0].cycle.language[this.languageAdvancedSearch[i]].value.length==0){
              return false;
            } else {
              if(school.cycles[0].cycle.language[this.languageAdvancedSearch[i]].value.indexOf(this.languageAdvancedSearch[i])==-1){
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

  putFilterLanguage(arg1, arg2, category, event){
    this.languageAdvancedSearch[arg1]=category;
    this.languageAdvancedSearch[arg2]=event.srcElement.value;
    console.log(this.languageAdvancedSearch);
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
    this.languageAdvancedSearch=["", "", "", "", "", "", "", "", "", ""];
    this.advancedSearch=[];
    this.advancedSearchToDisplay=[]
  }

  cleanAdvancedSearch(){
    console.log("Clean all search");
    this.cleanSearch();
    this.optionValue="";
    console.log($('.checkbox'));
    $('.checkbox :checked').removeAttr('checked')
  }

}
