import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// import { AdvancedSearchMdl, SpecialityMdl,
//         BoardingMdl, CurriculumMdl,
//         CanteenMdl, ExternalMdl,
//         StatusMdl, ReligiousMdl,
//         LanguageMdl, SectionMdl,
//         DiplomaMdl, OptionMdl, SeatsMdl } from '../model/advanced-search.model';

const TRIPS_API: string = "http://localhost:3000/api/schools/trips";
const STATISTICS_API: string = "http://localhost:3000/api/schools/statictics";

@Injectable()
export class SchoolService {

  langues = ["Allemand", "Anglais", "Arabe", "Chinois", "Coréen", "Danois", "Espagnol", "Grec Moderne",
            "Hébreu", "Italien", "Japonais", "Néerlandais", "Persan", "Polonais", "Portugais", "Russe",
            "Suédois", "Vietnamien"];
  
  languesRegio = ["Alsacien", "Auvergnat", "Basque", "Breton", "Catalan", "Corse", "Nicois", "Occitan", "Pays Mosel", "Provençal"]

  diplomes = [];
  onApply : boolean =false;
  selectedLieu = [];
  onCancel : boolean = false;

  constructor(private http: Http) { }

  getTrips() :  Observable<any>{
    return this.http.get(TRIPS_API)
      .map((response) => response.json());
  }

  // getStatistics() : Observable<any> {
  //   return this.http.get(STATISTICS_API)
  //     .map((response)=>response.json());
  // }

  // buildAdvancedSearch(){
  //   let advancedSearch : AdvancedSearchMdl = new AdvancedSearchMdl();
  //   advancedSearch.speciality = new SpecialityMdl();
  //   advancedSearch.boarding = new BoardingMdl();
  //   advancedSearch.curriculum = new CurriculumMdl();
  //   advancedSearch.canteen = new CanteenMdl();
  //   advancedSearch.external = new ExternalMdl();
  //   advancedSearch.status = new StatusMdl();
  //   advancedSearch.religious = new ReligiousMdl();
  //   advancedSearch.language = new LanguageMdl();
  //   advancedSearch.sections = new SectionMdl();
  //   advancedSearch.diplomas = new DiplomaMdl();
  //   advancedSearch.options = new OptionMdl();
  //   advancedSearch.seats = new SeatsMdl();
  //   return advancedSearch;
  // }
  
  getLangues(){
    return this.langues;
  }

  getLanguesRegio(){
    return this.languesRegio;
  }

  getDiplomes(){
    return this.diplomes;
  }

  onApplyTo(onApp : boolean){
    this.onApply=onApp;
  }

  isOnApply(){
    return this.onApply;
  }

  storeSelectedLieu(data){
    this.selectedLieu=data;
  }

  getSelectedLieu(){
    return this.selectedLieu;
  }

  cleanSelectedLieu(){
    this.selectedLieu=[];
  }

  isOnCancel(){
    this.onCancel=true;
  }

  getPopUpOnCancel(){
    return this.onCancel;
  }

  resetOnCancel(){
    this.onCancel=false;
  }

  storeClassName(className){
    localStorage.setItem('ClassName', className);
  }

  getClassName(){
    return localStorage.getItem('ClassName');
  }

  cleanClassName(){
    localStorage.removeItem('ClassName')
  }
}
