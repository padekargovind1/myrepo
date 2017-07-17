import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PublicService } from '../services/public.service';
import { CompareService } from '../services/compare.service';
declare var $:any;

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent implements OnInit, AfterViewInit {

  schoolList : any;
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

  constructor(private publicService : PublicService,
              private router : Router,
              private compareService : CompareService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getSearchFilter();
    this.publicService.getSchoolsList()
      .subscribe(
        (response)=>{
          console.log(response);
          this.schoolList=response.data;
        }
      )
    for (let list of this.filterList){
      this.compareListFilter.push(false);
    }
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

}
