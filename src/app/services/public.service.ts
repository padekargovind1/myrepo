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

  country = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
    , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
    , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
    , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
    , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
    , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
    , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
    , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
    , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
    , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
    , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
    , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
    , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia"
    , "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)"
    , "Yemen", "Zambia", "Zimbabwe"];
  nbSlick = 0;
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

  getNbSlick(){
    this.nbSlick++;
    return this.nbSlick
  }

  getCountry(){
    return this.country;
  }

}
