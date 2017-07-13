import { Component, OnInit, Input } from '@angular/core';


//import * as $ from 'jquery';
// declare var cube: any;

//import 'assets/js/cube.js';

declare var $:any;
declare var cubeBox: any;

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {

  @Input() eventData: any;

  cube;
  constructor() {
    this.createCube();
      // (<any> $('.cube-1')).cubeBox({
      //     'speed':400,
      //     'width': 300,
      //     'height': 400,
      //     'opacity': 1,
      //     'activeOpacity':1,
      //     'drag':false,
      //     'autoPlay':false
      // });
  }

  ngOnInit() {    
  }

  createCube(){
    // this.cube = $('.cube-wrapper');
      

      
      // if(this.cube.length !== 0) {
      //   // Rotate the cube to notice user first come to the page
      //   window.setTimeout(function() { this.rotateMiddleCube('show-right'); }, 1000);
      //   window.setTimeout(function() { this.rotateMiddleCube('show-back'); }, 2000);
      //   window.setTimeout(function() { this.rotateMiddleCube('show-left'); }, 3000);
      //   window.setTimeout(function() { this.rotateMiddleCube('show-front'); }, 4000);
      // }
      // this.rotate();
  }

  rotateMiddleCube(direction) {
        this.cube.goTo(direction);
  }

  

}

// cube = $('.cube-wrapper');

//     var arrayCube = [];
    
//     for (var i = 1; i <= cube.length; i++) {

//         arrayCube[i] = $('.cube-' + i).cubeBox({
//             'speed':400,
//             'width': 300,
//             'height': 400,
//             'opacity': 1,
//             'activeOpacity':1,
//             'drag':false,
//             'autoPlay':false
//         });

//     }

//     if(cube.length !== 0) {
//         // Rotate the cube to notice user first come to the page
//         window.setTimeout(function() { rotateMiddleCube('show-right'); }, 1000);
//         window.setTimeout(function() { rotateMiddleCube('show-back'); }, 2000);
//         window.setTimeout(function() { rotateMiddleCube('show-left'); }, 3000);
//         window.setTimeout(function() { rotateMiddleCube('show-front'); }, 4000);
//     }

//     function rotateMiddleCube(direction) {
//         arrayCube[2].goTo(direction);
//     }

//     var goto='';
//     $('.btns a').on('click', function(event) {

//         var el = $(this).parent().parent();
//         var page = el.data('page');
//         var cubeNumber = el.data('cube');

//         if ($(this).hasClass('next')) {
//             var showPage = page;
//             if (page === 4) {
//                 showPage = 1;
//                 el.data('page', showPage);
//             } else {
//                 showPage = page + 1;
//                 el.data('page', page + 1);
//             }

//             switch (showPage) {
//                 case 1 : goto = 'show-front'; break;
//                 case 2 : goto = 'show-right'; break;
//                 case 3 : goto = 'show-back'; break;
//                 case 4 : goto = 'show-left'; break;
//             }
//             arrayCube[cubeNumber].goTo(goto);

//         } else if ($(this).hasClass('prev')) {
//             var showPage = page;
//             if (page === 1) {
//                 showPage = 4;
//                 el.data('page', showPage);
//             } else {
//                 showPage = page - 1;
//                 el.data('page', showPage);
//             }

//             switch (showPage) {
//                 case 1 : goto = 'show-front'; break;
//                 case 2 : goto = 'show-right'; break;
//                 case 3 : goto = 'show-back'; break;
//                 case 4 : goto = 'show-left'; break;
//             }
//             arrayCube[cubeNumber].goTo(goto);
//         }
//     }); // button click
