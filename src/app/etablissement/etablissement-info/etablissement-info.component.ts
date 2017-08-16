import { Component, OnInit, Input } from '@angular/core';

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

}
