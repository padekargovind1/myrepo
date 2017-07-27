import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;
declare var cube: any;

//import 'assets/js/cube.js';


@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, AfterViewInit {

  @Input() eventData: any;
  @Input() counter: any;
  cube;
  video;

  constructor(private sanitizer : DomSanitizer,
                private route : Router) {
    
  }

  ngOnInit() {    
    this.createCube();
    this.video="https://www.youtube.com/embed/"+this.eventData.video;
    console.log(this.video);
  }

  ngAfterViewInit() {
      this.createCube();
  }

  getUrl(){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
  }

  createCube(){
    
    var cube = (<any> $('.cube-' + this.counter)).cubeBox({
        'speed':400,
        'width': 300,
        'height': 400,
        'opacity': 1,
        'activeOpacity':1,
        'drag':false,
        'autoPlay':false
    });


    var goto='';
    (<any> $('.cube-' + this.counter + ' .btns a')).on('click', function(event) {
        console.log($(this));
        var el = $(this).parent().parent();
        var page = el.data('page');
        var cubeNumber = el.data('cube');

        if ($(this).hasClass('next')) {
            var showPage = page;
            if (page === 4) {
                showPage = 1;
                el.data('page', showPage);
            } else {
                showPage = page + 1;
                el.data('page', page + 1);
            }

            switch (showPage) {
                case 1 : goto = 'show-front'; break;
                case 2 : goto = 'show-right'; break;
                case 3 : goto = 'show-back'; break;
                case 4 : goto = 'show-left'; break;
            }
            cube.goTo(goto);

        } else if ($(this).hasClass('prev')) {
            var showPage = page;
            if (page === 1) {
                showPage = 4;
                el.data('page', showPage);
            } else {
                showPage = page - 1;
                el.data('page', showPage);
            }

            switch (showPage) {
                case 1 : goto = 'show-front'; break;
                case 2 : goto = 'show-right'; break;
                case 3 : goto = 'show-back'; break;
                case 4 : goto = 'show-left'; break;
            }
            cube.goTo(goto);
        }
    }); // button click      
  }

  rotateMiddleCube(direction) {
        this.cube.goTo(direction);
  }

    onClickCube(){
    this.route.navigate(['/etablissement/'+this.eventData.school]);
  }  

}

