import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-superieur-info',
  templateUrl: './superieur-info.component.html',
  styleUrls: ['./superieur-info.component.scss']
})
export class SuperieurInfoComponent implements OnInit {

  @Input() schoolData : any;
  canDisplay : boolean = false;
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  mapURL : string;
  map: any;
  constructor() {	}

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
        }while(this.lat==0.0 && this.lng==0.0);
		
		//this.gMaps.setCenter({ lat: markerObj.latitude, lng: markerObj.longitude });
		
		//this.mapURL = "https://maps.google.com/maps?q="+this.lat+","+this.lng+"&hl=es;z=14&amp;output=embed";
      }, 500
    )
  }

}
