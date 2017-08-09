import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '../services/public.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-landing-page-1',
  templateUrl: './landing-page-1.component.html',
  styleUrls: ['./landing-page-1.component.scss']
})
export class LandingPage1Component implements OnInit, AfterViewInit {

  searchForm: FormGroup;
  options={
    regions : [],
    departements : [],
    villes : []
  };
  schoolsOptions: any;
  constructor(private fb : FormBuilder,
              private publicService : PublicService,
              private router : Router) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm(){
    console.log('build form')
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.initOptions();
  }

  initOptions(){
    this.options['regions']=[];
    this.options['departements']=[];
    this.options['villes']=[];
    console.log(this.options)
  }

  ngAfterViewInit() {
  	(<any> $('.landingpage__additional-content')).on('mouseover', function() {

        (<any> $('.landingpage__additional-content .form-wrap')).removeClass('fadeIn').addClass('fadeOut');
        (<any> $('.landingpage__additional-content')).css('z-index', 0);
        
        (<any> $(this)).css('z-index', 10);
        (<any> $(this)).find('.form-wrap').removeClass('fadeOut').addClass('fadeIn');
        var img = (<any> $(this)).data('background'); 
        // console.log(img);

        (<any> $('body .main')).css({ 'background-image': 'url(' + img + ')', 'background-size': 'cover'});
    });
  }

  

  onSubmitSearch(path){
    console.log("on submit", this.searchForm.value)
    let data = [
      this.searchForm.controls.classe.value,
      this.searchForm.controls.lieu.value,
      this.searchForm.controls.etablissement.value
    ]
    this.publicService.storeSearchSchool(data);
    this.router.navigate(['/'+path]);
  }

  filterLieu(event){
    console.log(event.target.value);
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
          console.log(this.options);
          if(response.code!=400){
            this.options['regions']=data.regions
            this.options['departements']=data.departments
            this.options['villes']=data.cities
            // console.log(this.options)
          }
        }
      )
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

  navigateTo(index){
    if(index==2){
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/landing-page-'+index])
    }
  }

}
