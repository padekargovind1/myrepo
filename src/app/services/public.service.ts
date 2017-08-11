import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const SCHOOLS_API : string = "http://54.254.203.172/cideapi/api/public/schools/";
const CITIES_API : string = "http://54.254.203.172/cideapi/api/public/cities/autocomplete";
const LINGUISTIC_API: string = "http://54.254.203.172/cideapi/api/public/linguistic";
const LANGUAGE_API: string = "http://54.254.203.172/cideapi/api/public/language";
const SEARCH_API : string = "http://54.254.203.172/cideapi/api/public/search/";
const RATE_API : string = "http://54.254.203.172/cideapi/api/public/rate";
const APB_API : string = "https://api2.apbprive.fr/";

@Injectable()
export class PublicService {
  numLandingPage : number=null;
  searchData = ["", "", ""];
  domaines = [
    "Action sociale, animation, sciences sociales",
    "Archives, Bibliothèque, Documentation",
    "Artisanat, Métiers d'art, Restauration d'art",
    "Arts (appliqués, décoratifs, plastiques)",
    "Banque, assurances",
    "Cosmétique, esthétique, soins personnels",
    "Droits et sciences politiques",
    "Ecoles de commerce",
    "Ecoles d'ingénieurs (CTI)",
    "Edition, métiers du Livre",
    "Energie, électricité",
    "Environnement, développement durable",
    "Génie civil, bâtiment",
    "Graphisme, Design, Bande dessinée",
    "Hôtellerie, restauration",
    "Immobilier",
    "Informatique, numérique",
    "Internet, 3D, multimédia",
    "Langues étrangères, traduction",
    "Marché de l'Art - Culture - Patrimoine",
    "Mécanique, aéronautique",
    "Photographie, Vidéo, son, cinéma",
    "Prépa concours administratifs",
    "Prépa. économiques et commerciales",
    "Prépa Spécialisées",
    "Ressources humaines",
    "Sc. de la matière (chimie, physique, matériaux...)",
    "Sport, management sportif",
    "Tourisme, loisirs",
    "Transport, logistique",
    "Technologie industrielle",
    "Secrétariat, assistanat",
    "Spectacle, Théâtre, Danse, Musique",
    "Sciences et techniques (divers)",
    "Santé",
    "Publicité",
    "Prépa. scientifiques",
    "Prépa. littéraires",
    "Prépa études santé",
    "Prépa Ecoles d'arts",
    "Paramédical",
    "Métiers de la Mode",
    "Urbanisme, Paysagisme",
    "Management",
    "Evénementiel",
    "Enseignement",
    "Electronique, automatique",
    "Humanitaire",
    "Comptabilité, gestion, audit",
    "Communication",
    "Commerce, vente, marketing",
    "Commerce international",
    "Mathématiques, statistiques",
    "Bâtiment, Travaux Publics",
    "Accueil",
    "Architecture, Aménagement d'intérieur"
  ]
  nbSlick = 1;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { 
    this.domaines=this.domaines.sort()
    // console.log(this.domaines)
  }

  // getSchoolsList(limit, codeName) : Observable<any>{
  //   return this.http.post(SCHOOLS_API+"schools?limit="+limit, codeName)
  //     .map((response)=>response.json());
  // }

  getSchoolById(schoolId : string){
    return this.http.get(SCHOOLS_API+"schools/"+schoolId)
      .map((response)=>response.json());
  }

  getEvent() : Observable<any>{
    return this.http.get(SCHOOLS_API+'/events')
      .map((response)=>response.json());
  }

  postBrochure(data): Observable<any>{
    return this.http.post(SCHOOLS_API+'brochures', data)
      .map((response)=>response.json());
  }

  getBrochurebyId(schoolId, cycleId): Observable<any>{
    return this.http.get(SCHOOLS_API+'brochures/' + schoolId+'?id='+cycleId)
      .map((response)=>response.json());
  }

  postAutoCompleteLieu(keyword) : Observable<any>{
    return this.http.post(CITIES_API, keyword)
      .map((response)=>response.json());
  }

  postAutocompleteSchool(keyword): Observable<any>{
    return this.http.post(SCHOOLS_API+'autocomplete', keyword)
      .map((response)=>response.json());
  }

  storeSearchSchool(data){
    // console.log(data);
    this.searchData=data;
  }

  getSearchSchool(){
    // console.log(this.searchData);
    return this.searchData;
  }

  cleanSearch(){
    this.searchData=["", "", ""];
  }

  getLinguistics() : Observable <any> {
    return this.http.get(LINGUISTIC_API)
      .map((response)=>response.json());
  }

  getLanguage() : Observable<any> {
    return this.http.get(LANGUAGE_API)
      .map((response)=>response.json());
  }

  postSearchSchool(data, limit) : Observable<any>{
    return this.http.post(SEARCH_API+'schools?limit='+limit, data)
      .map((response)=>response.json())
  }

  postComparing(data) : Observable<any>{
    return this.http.post(SCHOOLS_API+'comparing', data)
      .map((response)=>response.json())
  }

  postFastSearch(data, limit): Observable<any>{
    return this.http.post(SCHOOLS_API+'schools?limit='+limit, data)
      .map((response)=>response.json())
  }

  postRate(data):Observable<any>{
    return this.http.post(RATE_API, data)
      .map((response)=>response.json())
  }

  putRate(data):Observable<any>{
    return this.http.put(RATE_API, data)
      .map((response)=>response.json())
  }

  storeNumLanding(num){
    this.numLandingPage=num
  }

  hasNumLanding(){
    if(this.numLandingPage!=null){
      return true
    } else {
      return false
    }
  }

  getNumLanding(){
    return this.numLandingPage;
  }

  cleanNumLanding(){
    this.numLandingPage=null;
  }

  getApbSchool(limit, body):Observable<any>{
    return this.http.post(APB_API+'search/schools?limit='+limit, body)
      .map((response)=>response.json())
  }

  getAutoCompleteApb(query):Observable<any>{
    return this.http.get(APB_API+'search/schools?keyword='+query)
      .map((response)=>response.json())
  }

  getDomaines(){
    return this.domaines;
  }

  storePath(data){
    localStorage.setItem('pathBack', data)
  }

  getStorePath(){
    return localStorage.getItem('pathBack')
  }

  getNbSlick(){
    this.nbSlick++;
    return this.nbSlick
  }
}
