import { Component } from '@angular/core';
import {SchoolService} from '../services/school.service';
import {AutoCompleteModule, PaginatorModule} from 'primeng/primeng';




@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  providers: [SchoolService]
})


export class SchoolComponent{
showFilter:boolean;
schoolData;
totalSchools: number;

text: string;    
city: any;    
cities: any[];        
filteredCitiesSingle: any[];
schoolsData: any[];
constructor(private schoolService : SchoolService) {
this.showFilter=false;

this.schoolService.getData().subscribe((data) => { 
  this.totalSchools=data.total;
  this.schoolsData= data.data;
  //this.schoolData=data;
  //console.log(data);
  console.log(this.schoolsData);
});
}


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
        console.log(filtered);
        return filtered;
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