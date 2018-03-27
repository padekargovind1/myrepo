import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublicService } from '../services/public.service';
import { SchoolService } from '../services/school.service';
import * as $ from 'jquery';
import swal from 'sweetalert2';

declare var wheelnav: any;
//declare var sliceTransform: any;

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
  apbOptions : any
  searchForm: FormGroup;
  apbForm: FormGroup;
  rateId : string = '';
  domaines=[];
  onMobile : boolean = false;
  lieuSelected = [];
  showSweetAlert : boolean = true;
  constructor(private router: Router,
              //private route: ActivatedRoute,
              private publicService: PublicService,
              private fb: FormBuilder,
              private schoolService : SchoolService
              ) {
    this.runScript();
    this.buildForm();
    this.buildApbForm();
  }

  ngOnInit() {
    this.wheel = new wheelnav("tabwheel");
    this.wheel.spreaderInTitle = 'imgsrc:assets/images/new-landing-page-2/cide-french.png';
    this.wheel.spreaderOutTitle = 'imgsrc:assets/images/new-landing-page-2/cide-french.png';
    this.wheel.spreaderInTitleWidth = 100;
    this.wheel.spreaderOutTitleWidth = 100;
    this.wheel.spreaderEnable = true;
    this.wheel.spreaderRadius = 0;
                    //This is the place for code snippets from the documentation -> http://wheelnavjs.softwaretailoring.net/documentation.html
    this.wheel.clockwise = false;
    this.wheel.clickModeRotate = false;
    this.wheel.createWheel(["", "", "", "", "", "", ""]);
    // this.wheel.sliceSelectedTransformFunction = sliceTransform().MoveMiddleTransform;
    this.wheelNavigation();
    this.initRate();
    this.domaines=this.publicService.getDomaines();
  }

  runScript(){
    var self = this;
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
      self.onMobile=true;
      $('.select-all-advisor').on('click', function() {
          $(this).hide();
          $('.deselect-all-advisor').show();
      });
      $('.deselect-all-advisor').on('click', function() {
          $(this).hide();
          $('.select-all-advisor').show();
      });
    }else {
      self.onMobile=false;
    }
  }

  wheelNavigation(){
    var self = this;
    $('#wheelnav-tabwheel-slice-0, #wheelnav-tabwheel-slice-1, #wheelnav-tabwheel-slice-2, #wheelnav-tabwheel-slice-3, #wheelnav-tabwheel-slice-4, #wheelnav-tabwheel-slice-5, #wheelnav-tabwheel-slice-6').mousedown(function(e){
      // console.log($(this).attr('id').charAt(24));
      let wheelNavId : String = $(this).attr('id');
      let contentName :String;
      switch ($(this).attr('id').charAt(24)){
        case '0' :
          contentName='ecole';
          break;
        case '1' :
          contentName='college';
          break;
        case '2' :
          contentName='lycee';
          break;
        case '3' :
          contentName='internat';
          break;
        case '4' :
          contentName='enseignement';
          break;
        case '5' :
          contentName='linguistic';
          break;
        case '6' :
          contentName='orientation';
          break;
      }
      console.log(contentName)
      self.switchWheelComponent(wheelNavId, contentName);
    });

    $('#wheelnav-tabwheel-spreadertitle').mousedown(function(e){
      self.onNavigate('conseil');
    });

  }

  switchWheelComponent(wheelNavId: String, contentName: String){
    var self = this;
    $('#wheelnav-tabwheel-slice-0, #wheelnav-tabwheel-slice-1, #wheelnav-tabwheel-slice-2, #wheelnav-tabwheel-slice-3, #wheelnav-tabwheel-slice-4, #wheelnav-tabwheel-slice-5, #wheelnav-tabwheel-slice-6').removeClass('open');
    $('#'+wheelNavId).addClass('open');
    if ($('.'+contentName+'-content').hasClass('fadeIn')) {
      if(contentName!="ecole" && contentName!="college" && contentName!="lycee" && contentName!="internat" && contentName!="enseignement"){
        console.log("Need to navigate", contentName);
        self.onNavigate(contentName);
      }
    }
    $('.content-holder').removeClass('fadeIn').addClass('fadeOut');
    $('.'+contentName+'-content').removeClass('fadeOut').addClass('fadeIn');
    console.log($('.'+contentName+'-content'));
    // var image = $('.'+contentName+'-content').data('image');
    // console.log(image);
    $('.main').css('background-image', 'url(assets/images/new-landing-page-2/'+ contentName +'.jpg)');
  }

  initRate(){
    let rate = {
      page : '3'
    }
    this.publicService.postRate(rate)
      .subscribe(
        response=>{
          // console.log(response);
          if(response.code!=400){
            this.rateId=response.data._id;
            console.log(this.rateId);
          }
        }
      )
  }

  navigate(componentName : String){
    console.log("routing work!!");
    this.publicService.cleanSearch();
    this.router.navigate(['/'+componentName]);
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

  filterApbSchool(event){
    console.log(event.target.value);
    let filter: string = event.target.value;
    if(filter.length>=3){
      this.getApbSchoolFilter(filter)
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
          if(response.code!=400){
            this.options['regions']=data.regions;
            this.options['departements']=data.departments;
            this.options['villes']=data.cities;
          }
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
          if(response.code==200){
            let data = response.data;
            // console.log(data);
            this.schoolsOptions=data
          }
        }
      )
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

  buildForm(){
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
    this.initOptions()
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
    console.log(this.options)
  }
  displayAlert(){
    swal({
      title: 'Attention',
      //text: 'Vous devez choisir une classe et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
      text: 'Vous devez choisir une classe et un lieu, ou entrer seulement le nom d\'un établissement pour pouvoir ' +
      'effectuer une recherche rapide.',
      type: 'warning',
      confirmButtonText: "J'AI COMPRIS"
    })
    return 0;
  }
  onSubmitSearch(path){
    console.log("on submit", this.searchForm.value)
    if((this.searchForm.value.classe=="" || this.searchForm.value.lieu=="") && this.searchForm.value.etablissement=="" && path!="enseignement"){
      swal({
        title: 'Attention',
        //text: 'Vous devez choisir une classe et un lieu ou entrer le nom d\'un établissement afin d\'effectuer une recherche rapide. Merci',
        text: 'Vous devez choisir une classe et un lieu, ou entrer seulement le nom d\'un établissement pour pouvoir ' +
        'effectuer une recherche rapide.',
        type: 'warning',
        confirmButtonText: "J'AI COMPRIS"
      })
    }else if ((this.apbForm.value.domaine=="" || this.apbForm.value.lieu=="") && this.apbForm.value.etablissement=="" && path=="enseignement"){
      swal({
        title: 'Attention',
        text: 'Vous devez choisir une classe et un lieu, ou entrer seulement le nom d\'un établissement pour pouvoir ' +
        'effectuer une recherche rapide.',
        type: 'warning',
        confirmButtonText: "J'AI COMPRIS"
      })
    }else{
      let data;
      //console.log("====>",this.searchForm.value.classe,this.searchForm.controls.classe.value,this.searchForm.controls.classe.value);
      if(path!="enseignement"){
        data = [
          this.searchForm.controls.classe.value=='' || this.searchForm.controls.classe.value=='Indifférent' ? '' : this.searchForm.controls.classe.value,
          this.searchForm.controls.lieu.value,
          this.searchForm.controls.etablissement.value
        ]
      if(this.searchForm.controls.classe.value != '' && this.searchForm.controls.lieu.value != '' && this.searchForm.controls.etablissement.value != ''){
        console.log('harish 1');
        this.showSweetAlert = false;
        this.displayAlert();
      }
      else if(this.searchForm.controls.classe.value != '' && this.searchForm.controls.lieu.value == '' && this.searchForm.controls.etablissement.value != ''){
        console.log('harish 2');
        this.showSweetAlert = false;
        this.displayAlert();
      }  
      else if(this.searchForm.controls.classe.value != '' && this.searchForm.controls.lieu.value == '' && this.searchForm.controls.etablissement.value == ''){
        console.log('harish 3');
        this.showSweetAlert = false;
        this.displayAlert();
      }  
      else if(this.searchForm.controls.classe.value == '' && this.searchForm.controls.lieu.value != '' && this.searchForm.controls.etablissement.value != ''){
        console.log('harish 4');
        this.showSweetAlert = false;
        this.displayAlert();
      }  
      else if(this.searchForm.controls.classe.value == '' && this.searchForm.controls.lieu.value != '' && this.searchForm.controls.etablissement.value == ''){
        console.log('harish 5');
        this.showSweetAlert = false;
        this.displayAlert();
      }  
      else if(this.searchForm.controls.classe.value == '' && this.searchForm.controls.lieu.value == '' && this.searchForm.controls.etablissement.value != ''){
        console.log('harish 6');
        this.showSweetAlert = false;
        this.displayAlert();
      }  
      } else {
        data = [
          this.apbForm.controls.domaine.value,
          this.apbForm.controls.lieu.value,
          this.apbForm.controls.etablissement.value
        ]
        if(this.apbForm.controls.domaine.value != '' && this.apbForm.controls.lieu.value != '' && this.apbForm.controls.etablissement.value != ''){
          console.log('harish 1');
          this.showSweetAlert = false;
          this.displayAlert();
        }
        else if(this.apbForm.controls.domaine.value != '' && this.apbForm.controls.lieu.value == '' && this.apbForm.controls.etablissement.value != ''){
          console.log('harish 2');
          this.showSweetAlert = false;
          this.displayAlert();
        }  
        else if(this.apbForm.controls.domaine.value != '' && this.apbForm.controls.lieu.value == '' && this.apbForm.controls.etablissement.value == ''){
          console.log('harish 3');
          this.showSweetAlert = false;
          this.displayAlert();
        }  
        else if(this.apbForm.controls.domaine.value == '' && this.apbForm.controls.lieu.value != '' && this.apbForm.controls.etablissement.value != ''){
          console.log('harish 4');
          this.showSweetAlert = false;
          this.displayAlert();
        }  
        else if(this.apbForm.controls.domaine.value == '' && this.apbForm.controls.lieu.value != '' && this.apbForm.controls.etablissement.value == ''){
          console.log('harish 5');
          this.showSweetAlert = false;
          this.displayAlert();
        }  
        else if(this.apbForm.controls.domaine.value == '' && this.apbForm.controls.lieu.value == '' && this.apbForm.controls.etablissement.value != ''){
          console.log('harish 6');
          this.showSweetAlert = false;
          this.displayAlert();
        }  
  
      }
      if(this.showSweetAlert === true)
      {      this.schoolService.storeSelectedLieu(this.lieuSelected);
            this.publicService.storeSearchSchool(data);
            this.onNavigate(path);
      }    
}
  }

  // navigateTo(index){
  //   this.router.navigate(['/landing-page-'+index])
  // }

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
