import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-landing-page-1',
  templateUrl: './landing-page-1.component.html',
  styleUrls: ['./landing-page-1.component.scss']
})
export class LandingPage1Component implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
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

}
