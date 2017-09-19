import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '../services/public.service';
import { SchoolService } from '../services/school.service';
import swal from 'sweetalert2';
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
  rateId : string ="";
  apbForm: FormGroup;
  domaines=[];
  onMobile:boolean=false;
  lieuSelected=[];
  constructor(private fb : FormBuilder,
              private publicService : PublicService,
              private router : Router,
              private schoolService : SchoolService) { 
    this.buildForm();
    this.buildApbForm();
  }

  ngOnInit() {
    this.initRate();
    this.domaines=this.publicService.getDomaines();
    this.runScript();
  }
  runScript(){
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
		  this.onMobile=true;
		}else {
		  this.onMobile=false;
		}
	}

  buildForm(){
    // console.log('build form')
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.initOptions();
  }

  buildApbForm(){
    this.apbForm = this.fb.group({
      domaine : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.initOptions()
  }

  initOptions(){
    this.options['regions']=[];
    this.options['departements']=[];
    this.options['villes']=[];
    // console.log(this.options)
  }

  initRate(){
    let rate = {
      page : '1'
    }
    this.publicService.postRate(rate)
      .subscribe(
        response=>{
          // console.log(response);
          if(response.code!=400){
            this.rateId=response.data._id;
            // console.log(this.rateId);
          }
        }
      )
  }

  ngAfterViewInit() {
  	(<any> $('.landingpage__additional-content')).mouseenter(function() {
		if((<any> $(this)).find('.form-wrap').length>0)
		{
			(<any> $('.landingpage__additional-content .form-wrap')).removeClass('fadeIn').addClass('fadeOut');
			(<any> $('.landingpage__additional-content')).css('z-index', 0);
			
			(<any> $(this)).css('z-index', 10);
			(<any> $(this)).find('.form-wrap').removeClass('fadeOut').addClass('fadeIn');
			var img = (<any> $(this)).data('background'); 
			// console.log(img);

			(<any> $('body .main')).css({ 'background-image': 'url(' + img + ')', 'background-size': 'cover'});
		}
    }).mouseleave(function(){
		//console.log((<any> $('.landingpage__additional-content .form-wrap')).find("input:focus, select:focus").length);
		if((<any> $('.landingpage__additional-content .form-wrap')).find("input:focus, select:focus").length==0)
		{
			(<any> $('.landingpage__additional-content .form-wrap')).removeClass('fadeIn').addClass('fadeOut');
			(<any> $('.landingpage__additional-content')).css('z-index', 0);
		}
    });
  }

  onSubmitSearch(path){
    console.log("on submit", this.searchForm.value)
    console.log("on submit", this.apbForm.value)
    if(path!="enseignement" && ((this.searchForm.value.classe=="" || this.searchForm.value.lieu=="") && this.searchForm.value.etablissement=="")){
      swal({
        title: 'Attention',
        text: 'Vous devez choisir une classe et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
        type: 'warning',
        confirmButtonText: "J'AI COMPRIS"
      })
    }
	else if(path=="enseignement" && ((this.apbForm.value.domaine=="" || this.apbForm.value.lieu=="") && this.apbForm.value.etablissement=="")){
      swal({
        title: 'Attention',
        text: 'Vous devez choisir une classe et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
        type: 'warning',
        confirmButtonText: "J'AI COMPRIS"
      })
    }else{
      let data;
      if(path!="enseignement"){
        data = [
          this.searchForm.controls.classe.value,
          this.searchForm.controls.lieu.value,
          this.searchForm.controls.etablissement.value
        ]
      } else {
        data = [
          this.apbForm.controls.domaine.value,
          this.apbForm.controls.lieu.value,
          this.apbForm.controls.etablissement.value
        ]
      }
      if(data[0]=="Indifférent"){
        data[0]="";
      }
      this.publicService.storeSearchSchool(data);
      this.schoolService.storeSelectedLieu(this.lieuSelected);
      this.onNavigate(path);
    }
  }

  onNavigate(path){
    let rate = {
      id : this.rateId,
      click : true
    }
    this.publicService.putRate(rate)
      .subscribe(
        response=>{
          console.log(response)
        }
      )
    this.router.navigate(['/'+path]);
  }

  filterLieu(event){
    // console.log(event.target.value);
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
          // console.log(data);
          if(response.code!=400){
            this.options['regions']=data.regions;
            this.options['departements']=data.departments;
            this.options['villes']=data.cities;
          }
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

  filterApbSchool(event){
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
      this.getApbSchoolFilter(filter)
    }else {
      this.schoolsOptions=null;
    }
  }

  getApbSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
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

  navigateTo(index){
    this.router.navigate(['/landing-page-'+index])
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

  storeClassName(event){
    console.log(event)
    this.publicService.storeClassName(event.toElement.selectedOptions[0].text);
  }

}
