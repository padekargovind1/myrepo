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

text: string;    
country: any;    
countries: any[];        
filteredCountriesSingle: any[];
schoolsData: any[];
constructor(private schoolService : SchoolService) {
this.showFilter=false;

this.schoolService.getData().subscribe((data) => {
  console.log(data.schools);
  this.schoolsData= data.schools;
// alert(data.school.[0].addresses.city);
  this.schoolData=data;
});
}


filterCountrySingle(event) {
        let query = event.query;        
        this.schoolService.getCities().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });
    }
    
   
    
    filterCountry(query, countries: any[]):any[] {
        
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
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

paginate(onPageChange) {
    console.log("Page changed");
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }


}