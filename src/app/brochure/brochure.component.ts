import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit, AfterViewInit {

    listBrochures = [];
  constructor(private publicService : PublicService) { 
      this.getBrochure();
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
  	(<any> $('#js-grid-juicy-projects')).cubeportfolio({
        filters: '#js-filters-juicy-projects',
        loadMore: '#js-loadMore-juicy-projects',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'quicksand',
        gapHorizontal: 35,
        gapVertical: 30,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 5
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        caption: 'overlayBottomReveal',
        displayType: 'sequentially',
        displayTypeSpeed: 80,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            // console.log('Hi');

            // $.ajax({
            //         url: url,
            //         type: 'GET',
            //         dataType: 'html',
            //         timeout: 10000
            //     })
            //     .done(function(result) {
            //         t.updateSinglePage(result);
            //     })
            //     .fail(function() {
            //         t.updateSinglePage('AJAX Error! Please refresh the page!');
            //     });
        },
    });
  }

  getBrochure(){
    this.publicService.getBrochure()
        .subscribe(
            (data)=>{
                let response = data;
                // console.log(response.data);
                if(response.code==400){
                    console.log(response.message);
                } else {
                    this.listBrochures=response.data;
                    console.log(this.listBrochures);
                }
            }
        )
  }

}
