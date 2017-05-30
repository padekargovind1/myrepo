import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { AutoCompleteModule, PaginatorModule } from 'primeng/primeng';
import { FilterModal } from '../models/schools.modal';


@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.scss'],
    providers: [SchoolService]
})

export class SchoolComponent {

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

    constructor(private schoolService: SchoolService) {
        this.showFilter = false;
        this.filterModal = new FilterModal();
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


}