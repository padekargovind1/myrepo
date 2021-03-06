import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { AgmMap, AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-etablissement-info',
  templateUrl: './etablissement-info.component.html',
  styleUrls: ['./etablissement-info.component.scss']
})
export class EtablissementInfoComponent implements OnInit {
  @Input() schoolData : any;
  canDisplay : boolean = false;
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  mapURL : string;
  @ViewChild(AgmMap) private map: any;
  constructor() {	}

  // Set the google Map
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

		window.onresize = (e) =>
		{
			this.map.triggerResize().then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
		}
      }, 500
    )
  }
}
