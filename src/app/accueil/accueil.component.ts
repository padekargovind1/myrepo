import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublicService } from '../services/public.service';
import { SchoolService } from '../services/school.service';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import {HelperService} from '../services/helper.service';
declare const wheelnav: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  wheel : any;
  options={
    regions : [],
    departements : [],
    villes : []
  };
  schoolsOptions: any;
  apbOptions : any;
  searchForm: FormGroup;
  apbForm: FormGroup;
  rateId : string = '';
  domaines=[];
  onMobile : boolean = false;
  lieuSelected = [];
  selectorWheel: String = '#wheelnav-tabwheel-slice-0, #wheelnav-tabwheel-slice-1, #wheelnav-tabwheel-slice-2, ' +
    '#wheelnav-tabwheel-slice-3, #wheelnav-tabwheel-slice-4, #wheelnav-tabwheel-slice-5, #wheelnav-tabwheel-slice-6';
  _section = {
    'school': null,
    'name': null,
    'subName': null
  };

  constructor(private router: Router,
              private publicService: PublicService,
              private fb: FormBuilder,
              private schoolService: SchoolService,
              private helperService: HelperService
              ) {
    this.runScript();
    this.buildForm();
    this.buildApbForm();
  }

  private _initSection() {
    this._section.school = null;
    this._section.name = null;
    this._section.subName = '';
  }

  // Init wheel menu
  // Init rating API
  // Get domaines for Enseignement supérieur select options
  ngOnInit() {
    this.wheel = new wheelnav('tabwheel');
    this.wheel.spreaderInTitle = 'imgsrc:assets/images/new-landing-page-2/cide-french.png';
    this.wheel.spreaderOutTitle = 'imgsrc:assets/images/new-landing-page-2/cide-french.png';
    this.wheel.spreaderInTitleWidth = 100;
    this.wheel.spreaderOutTitleWidth = 100;
    this.wheel.spreaderEnable = true;
    this.wheel.spreaderRadius = 0;
    // This is the place for code snippets from the documentation -> http://wheelnavjs.softwaretailoring.net/documentation.html
    this.wheel.clockwise = false;
    this.wheel.clickModeRotate = false;
    this.wheel.createWheel(['', '', '', '', '', '', '']);
    // this.wheel.sliceSelectedTransformFunction = sliceTransform().MoveMiddleTransform;
    this.wheelNavigation();
    this.initRate();
    this.domaines = this.publicService.getDomaines();
  }

  //Run script
  // Check if is on mobile or not
  runScript() {
    const self = this;
    const checkMobile = this.helperService.detectmob();
    const selector_select: any = $('.select-all-advisor');
    const selector_deselect: any = $('.deselect-all-advisor');
    if (checkMobile) {
      self.onMobile = true;
      selector_select.on('click', function() {
          $(this).hide();
          $('.deselect-all-advisor').show();
      });
      selector_deselect.on('click', function() {
          $(this).hide();
          selector_select.show();
      });
    }else {
      self.onMobile = false;
    }
  }

  // Init wheel navigation
  wheelNavigation() {
    const self = this;
    $(this.selectorWheel).mousedown(function(e){
      const wheelNavId: String = $(this).attr('id');
      // let contentName: String;
      self._initSection();
      const school = self.helperService.getAllList();

      switch (wheelNavId.slice(-1)) {
        case '0' :
          self._section.name = 'ecole';
          self._section.subName = 'Maternelle / Primaire';
          self._section.school = school.infant_primary;
          break;
        case '1' :
          self._section.name = 'college';
          self._section.subName = '6ème - 3ème';
          self._section.school = school.secondary_school;
          break;
        case '2' :
          self._section.name = 'lycee';
          self._section.subName = 'Seconde - Terminale';
          self._section.school = school.college;
          break;
        case '3' :
          self._section.name = 'internat';
          break;
        case '4' :
          self._section.name = 'enseignement';
          break;
        case '5' :
          self._section.name = 'linguistic';
          break;
        case '6' :
          self._section.name = 'orientation';
          break;
      }
      self.switchWheelComponent(wheelNavId);
    });

    $('#wheelnav-tabwheel-spreadertitle').mousedown(function(e){
      self.onNavigate('conseil');
    });

  }

  // Swithing item on the wheel nav menu
  switchWheelComponent(wheelNavId: String) {
    const self = this;
    const selector_content = $('.' + this._section.name + '-content');
    const school_name: String[] = ['ecole', 'college', 'lycee', 'internat', 'enseignement'];

    $(this.selectorWheel).removeClass('open');
    $('#' + wheelNavId).addClass('open');
    // self.onNavigate(contentName);
    if ($('.content-holder').hasClass('fadeIn')) {
      if (school_name.includes(this._section.name)) {
        console.log('Need to navigate', this._section.name);
        self.onNavigate(this._section.name);
      }
    }

    $('.content-holder').removeClass('fadeIn').addClass('fadeOut');
    // $('.content-holder').removeClass('fadeOut').addClass('fadeIn');

    // var image = $('.'+contentName+'-content').data('image');
    // console.log(image);
    const header = $('.header');
    const header_height = header.height();
    const windows_height = $(window).height();
    const main = $('.main');


    const css = {
      'background-image': 'url(assets/images/new-landing-page-2/' + this._section.name + '.jpg)',
      'margin': 0,
      'padding': 0,
      'height': (windows_height - header_height) + 'px',
      '-webkit-background-size': 'cover', /* pour anciens Chrome et Safari */
      'background-size': 'cover',
    };

    main.css(css);
  }

  // Init rate
  // Post rate in API
  initRate() {
    const rate = {
      page : '3'
    };
    this.publicService.postRate(rate)
      .subscribe(
        response => {
          // console.log(response);
          if(response.code != 400) {
            this.rateId = response.data._id;
            console.log(this.rateId);
          }
        }
      )
  }

  // Navigate to the page name
  // componentName = page name
  navigate(componentName: String){
    this.publicService.cleanSearch();
    this.router.navigate(['/' + componentName]);
  }

  // Call after keyup detected on location input
  // if the word is more or equals to 2 letters, it call the function getLieuFilter to get the list
  filterLieu(event) {
    const filter: string = event.target.value;
    if (filter.length >= 2) {
      this.getLieuFilter(filter)
    }
  }

  // Call after keyup detected on school input
  // If they have more or equal to 3 letter then we call API to get school name
  filterSchool(event){
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
      this.getSchoolFilter(filter)
    }else {
      this.schoolsOptions=null;
    }
  }

  // Same as filterSchool method except it's for enseignement supérieur
  filterApbSchool(event){
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
      this.getApbSchoolFilter(filter)
    }else {
      this.schoolsOptions=null;
    }
  }

  // Method to get the location list from API
  getLieuFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutoCompleteLieu(data)
      .subscribe(
        (response)=>{
          let data = response.data;
          console.log(data);
          if(response.code!=400){
            this.options['regions']=data.regions;
            this.options['departements']=data.departments;
            this.options['villes']=data.cities;
          }
        }
      )
  }

  // Method to get the school list for before BAC from API
  getSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.postAutocompleteSchool(data)
      .subscribe(
        (response)=>{
          if(response.code==200){
            let data = response.data;
            // console.log(data);
            this.schoolsOptions=data
          }
        }
      )
  }

  // Method to get the school list for after BAC from API
  getApbSchoolFilter(filter: string){
    let data = {
      keyword : filter
    }
    this.publicService.getAutoCompleteApb(filter)
      .subscribe(
        response=>{
          console.log(response)
          if(response.code!=400){
            this.apbOptions=[]
            for(let i = 0; i<response.data.length; i++){
              if(this.apbOptions.indexOf(response.data[i].longName)==-1){
                this.apbOptions.push(response.data[i].longName)
              }
            }
            console.log(this.apbOptions)
          }
        }
      )
  }

  // Build form the before BAC search
  buildForm(){
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.initOptions()
  }

  // Build form the after BAC search
  buildApbForm(){
    this.apbForm = this.fb.group({
      domaine : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.initOptions()
  }

  // Init the 3 tabs for location list
  initOptions(){
    this.options['regions']=[];
    this.options['departements']=[];
    this.options['villes']=[];
    console.log(this.options)
  }

  //After submit the fast search
  // Sweet alert if the form is not correctly field
  // Else we store the data in the service and go to the component page
  onSubmitSearch(path){
    console.log("on submit", this.searchForm.value)
    if((this.searchForm.value.classe=="" || this.searchForm.value.lieu=="") && this.searchForm.value.etablissement=="" && path!="enseignement"){
      swal({
        title: 'Attention',
        text: 'Vous devez choisir une classe et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
        type: 'warning',
        confirmButtonText: "J'AI COMPRIS"
      })
    }else if ((this.apbForm.value.domaine=="" || this.apbForm.value.lieu=="") && this.apbForm.value.etablissement=="" && path=="enseignement"){
      swal({
        title: 'Attention',
        text: 'Vous devez choisir un domaine et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
        type: 'warning',
        confirmButtonText: "J'AI COMPRIS"
      })
    }else{
      let data;
      if(path!="enseignement"){
        data = [
          this.searchForm.controls.classe.value=='' || this.searchForm.controls.classe.value=='Indifférent' ? '' : this.searchForm.controls.classe.value,
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
      this.schoolService.storeSelectedLieu(this.lieuSelected);
      this.publicService.storeSearchSchool(data);
      this.onNavigate(path);
    }
  }

  // navigateTo(index){
  //   this.router.navigate(['/landing-page-'+index])
  // }

  // Function to navigate in different page with the path
  // We also call rate's API
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

  // function to show the good location name b'cause it's different than the value we send to API
  // ex : 75001 to send but 75001 Paris to show on the website
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

  // function to store the right name of the class name to show it on the school list
  storeClassName(event){
    console.log(event)
    this.publicService.storeClassName(event.toElement.selectedOptions[0].text);
  }

}
