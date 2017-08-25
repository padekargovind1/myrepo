import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

declare var google:any;

@Component({
  selector: 'app-etablissement-info',
  templateUrl: './etablissement-info.component.html',
  styleUrls: ['./etablissement-info.component.scss']
})
export class EtablissementInfoComponent implements OnInit {
  @Input() schoolData : any;
  canDisplay : boolean = false;
  title: string = 'My first AGM project';
  lat: number ;
  lng: number ;
  map: any;
  constructor() { }

  ngOnInit() {
    setTimeout(
      ()=>{
        console.log(this.schoolData)
        this.canDisplay=true;
        let i= 0;
        do{
          this.lat=this.schoolData.cycles[i].address.lat;
          this.lng=this.schoolData.cycles[i].address.long;
          console.log(this.lat, this.lng)
          i++;
        }while(this.lat==0.0 && this.lng==0.0)        
      }, 500
    )
  }
  
  public loadAPIWrapper(map) {
    this.map = map;
  }

  public markerClicked = (markerObj) => {
    const position = new google.maps.LatLng(markerObj.latitude, markerObj.longitude);
    this.map.panTo(position);
  }

}
