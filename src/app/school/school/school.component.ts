import { ViewChild, Directive, ElementRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { SchoolService } from '../../core/services/school.service';
import { AutoCompleteModule, PaginatorModule } from 'primeng/primeng';
import { FilterModal, CompareModal } from '../../core/models/schools.modal';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layouts/header/header.component';
declare var $: any;


@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.scss'],
    providers: [SchoolService],

})

export class SchoolComponent implements OnInit, AfterViewInit {

    @ViewChild('tooltip') el: ElementRef;
    @ViewChild('slickjs') slickjs: ElementRef;

    ngAfterViewInit() {
        $(this.el.nativeElement).tooltip();
        $(this.slickjs.nativeElement).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            variableWidth: true
        });


        setTimeout(function(){
       $('.popup-ad-holder').delay(3000).addClass('fadeOutDown');
      $('.from-popup').delay(6000).removeClass('hidden').addClass('fadeInDown animated');
    },3000);

         setTimeout(function(){
        $('.from-popup').delay(13000).removeClass('fadeInDown').addClass('fadeOutDown');
        $('.fixed-ad').delay(26000).removeClass('hidden').addClass('fadeIn animated');
    },13000);

 

        $('.advance-filter a').on('click', function (e) {
            if ($(this).hasClass('open')) {
                $(this).siblings('ul').toggleClass('fadeIn open');
                $(this).removeClass('open');
            } else {
                $('.advance-filter a.open').removeClass('open').siblings('ul').removeClass('fadeIn open');
                $(this).siblings('ul').toggleClass('fadeIn open');
                $(this).addClass('open');
            }
        });



    }


    schoolCheckboxes: string;
    facilityCheckboxes: string;
    showFilter: string;
    schoolData;
    totalSchools: number;
    city?: any;
    cities: any[];
    filteredCitiesSingle: any[];
    schoolsData: any[];
    school?: any;
    schools: any[];
    filteredSchoolSingle: any[];
    cycles;
    filterModal;
    compareModal;
    schoolsToCompare: any[];
    compareCriteria: any[];
    currentUrl: any;

    constructor(private schoolService: SchoolService, private _router: Router) {
        this.showFilter = "";
        this.filterModal = new FilterModal();
        this.compareModal = new CompareModal;
        this.schoolCheckboxes = '';
        this.facilityCheckboxes = '';
        this.currentUrl = (this._router.url).split("/");

        //this.currentUrl=this.currentUrl.split("/");
        //console.log(this.currentUrl);

        switch (this.currentUrl[1]) {


            case "une-ecole": {
                this.currentUrl = "ecole";
                break;
            }
            case "un-college": {
                this.currentUrl = "college";
                break;
            }
            case "un-lycee": {
                this.currentUrl = "lycee";
                break;
            }
            default: {
                console.log("Invalid choice");
                break;
            }
        }

    }

    ngOnInit() {
        /* Get School Data on page Load */
        this.schoolService.getData().subscribe((data) => {
            //this.totalSchools=data.total;
            this.schoolsData = data.data;
        });

        this.schoolService.getCycles().subscribe((data) => {
            this.cycles = data;
        });
    }

    /* City Auto Complete */

    filterCitySingle(event) {
        let query = event.query;
        this.schoolService.getCities(query).then(cities => {
            this.filteredCitiesSingle = this.filterCity(cities);

        });
    }

    filterCity(cities: any[]): any[] {
        let filtered: any[] = [];
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];

            if (city.cityName.toLowerCase().indexOf(city.cityName.toLowerCase()) == 0) {
                filtered.push(city);
            }

        }
        return filtered;
    }

    filterSchoolSingle(event) {
        let query = event.query;
        this.schoolService.getSchoolsAutoComplete(query).subscribe(schools => {
            this.filteredSchoolSingle = this.filterSchool(schools.data);            
        });
    }

    filterSchool(schools: any[]): any[] {
        let filtered: any[] = [];
        for (let i = 0; i < schools.length; i++) {
            let school = schools[i];
            filtered.push(school);
        }
        return filtered;
    }

    search() {
        this.filterModal.city = this.city.cityName;
        this.filterModal.keyword = this.school.longName;
        let query = this.filterModal;

        this.schoolService.getSchools(query).subscribe((data) => {
            this.schoolsData = data.data;
        });
    }


    toggleFilter() {
        if (this.showFilter == "") {
            this.showFilter = "open";
        }
        else {
            this.showFilter = "";
        }
    }

    Checkboxes(id, id2) {
        if (id2) {
            this.schoolCheckboxes = (this.schoolCheckboxes + id[0] + ',');
        }
    }

    getFacilityCheckboxes(id, id2) {
        if (id2) {
            this.facilityCheckboxes = (this.facilityCheckboxes + id[0] + ',');
        }
    }

    selectedSchools() {
        /* console.log(this.schoolCheckboxes);
         console.log(this.compareModal);*/
    }
}