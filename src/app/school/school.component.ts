import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { AutoCompleteModule, PaginatorModule } from 'primeng/primeng';
import { FilterModal, CompareModal } from '../models/schools.modal';
import { Router } from '@angular/router';



@Component({
    selector: 'app-school',    
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.scss'],
    providers: [SchoolService],
    
})

export class SchoolComponent {

    schoolCheckboxes: string;
    facilityCheckboxes: string;

    showFilter: boolean;
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
    currentUrl:string;


    constructor(private schoolService: SchoolService, private _router:Router) {
        this.showFilter = false;
        this.filterModal = new FilterModal();
        this.compareModal = new CompareModal;
        this.schoolCheckboxes = '';
        this.facilityCheckboxes = '';
        this.currentUrl =  (this._router.url).substr(1); 
        
        
        switch(this.currentUrl) { 


   case "une-ecole": { 
     this.currentUrl="ecole";
      break; 
   } 
   case "un-college": { 
     this.currentUrl="college";
      break; 
   } 
   case "un-lycee": {
     this.currentUrl="lycee";
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
        this.schoolService.getSchoolsAutoComplete(query).then(schools => {
            this.filteredSchoolSingle = this.filterSchool(schools);
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
        if (this.showFilter == true) {
            this.showFilter = false;
        }
        else {
            this.showFilter = true;
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