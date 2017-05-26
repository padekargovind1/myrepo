import { Component } from '@angular/core';
import {SchoolService} from '../services/school.service';
import {AutoCompleteModule, PaginatorModule} from 'primeng/primeng';
import { Router } from '@angular/router';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  providers: [SchoolService]
})

export class SchoolComponent{
showFilter:boolean;


handicappedHome:boolean=true;

schoolData;
totalSchools: number;

city: any;
cities: any[];
filteredCitiesSingle: any[];

schoolsData: any[];

school: any;
schools: any[];
filteredSchoolSingle: any[];

cycles;


constructor(private schoolService : SchoolService) {

this.showFilter=false;

/* Get School Data on page Load */

this.schoolService.getData().subscribe((data) => {
//this.totalSchools=data.total;
this.schoolsData= data.data;  
});


this.schoolService.getCycles().subscribe((data) => {
  this.cycles=data;
});
}

/* City Auto Complete */

 filterCitySingle(event) {
        let query = event.query;        
        this.schoolService.getCities(query).then(cities => {
            this.filteredCitiesSingle = this.filterCity(cities);
            //console.log(cities);
        });
    }   
    
    filterCity(cities: any[]):any[] {        
        let filtered : any[] = [];
        for(let i = 0; i < cities.length; i++) {
            let city = cities[i];           
             
             if(city.cityName.toLowerCase().indexOf(city.cityName.toLowerCase()) == 0) {
                 filtered.push(city);
            }

        }        
        return filtered;
    }

filterSchoolSingle(event) {
        let query = event.query;        
        this.schoolService.getSchoolsAutoComplete(query).then(schools => {
            this.filteredSchoolSingle = this.filterSchool(schools);
          //  console.log(cities);
        });
    }   
    
    filterSchool(schools: any[]):any[] {
        let filtered : any[] = [];
        for(let i = 0; i < schools.length; i++) {
            let school = schools[i];           
               filtered.push(school);
        }
        return filtered;
    }



search()
{

    
console.log(this.handicappedHome);

}


toggleFilter()
{
  if(this.showFilter==true)
  {
  this.showFilter=false;
   }
   else
   {
  this.showFilter=true;
   }
}

paginate(event) {
    console.log(event);
        
    }


}