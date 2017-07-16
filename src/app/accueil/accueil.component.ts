import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublicService } from '../services/public.service';
import * as $ from 'jquery';

declare var wheelnav: any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  wheel : any;
  options: any;
  schoolsOptions: any;
  searchForm: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private publicService : PublicService,
              private fb : FormBuilder
              ) { 
    this.buildForm();
  }

  ngOnInit() {
    this.wheel = new wheelnav("tabwheel");
    this.wheel.spreaderInTitle = 'imgsrc:assets/images/new-landing-page-2/cide-french.png';
    this.wheel.spreaderOutTitle = 'imgsrc:assets/images/new-landing-page-2/cide-french.png';
    this.wheel.spreaderInTitleWidth = 130;
    this.wheel.spreaderOutTitleWidth = 130;
    this.wheel.spreaderEnable = true;
    this.wheel.spreaderRadius = 0;
                    //This is the place for code snippets from the documentation -> http://wheelnavjs.softwaretailoring.net/documentation.html
    this.wheel.clockwise = false;
    this.wheel.clickModeRotate = false;
    this.wheel.createWheel(["", "", "", "", "", "", ""]);
    // this.wheel.sliceSelectedTransformFunction = sliceTransform().MoveMiddleTransform;
    this.wheelNavigation();
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
      self.navigate('conseil');
    });

  }

  switchWheelComponent(wheelNavId: String, contentName: String){
    var self = this;
    $('#wheelnav-tabwheel-slice-0, #wheelnav-tabwheel-slice-1, #wheelnav-tabwheel-slice-2, #wheelnav-tabwheel-slice-3, #wheelnav-tabwheel-slice-4, #wheelnav-tabwheel-slice-5, #wheelnav-tabwheel-slice-6').removeClass('open');                
    $('#'+wheelNavId).addClass('open');
    if ($('.'+contentName+'-content').hasClass('fadeIn')) {
        console.log("Need to navigate");
        self.navigate(contentName);
    }
    $('.content-holder').removeClass('fadeIn').addClass('fadeOut');
    $('.'+contentName+'-content').removeClass('fadeOut').addClass('fadeIn');
    // console.log($('.'+contentName+'-content'));
    var image = $('.'+contentName+'-content').data('image');
    $('.main').css('background-image', 'url('+ image +')');
  }

  navigate(componentName : String){
    console.log("routing work!!");
    this.publicService.cleanSearch();
    this.router.navigate([componentName], {relativeTo: this.route});
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

  buildForm(){
    this.searchForm = this.fb.group({
      classe : [''],
      lieu : [''],
      etablissement : ['']
    })
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

}
