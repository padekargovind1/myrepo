import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-info',
  templateUrl: './etablissement-info.component.html',
  styleUrls: ['./etablissement-info.component.scss']
})
export class EtablissementInfoComponent implements OnInit {
  @Input() schoolData : any;
  canDisplay : boolean = false;
  constructor() { }

  ngOnInit() {
    setTimeout(
      ()=>{
        console.log(this.schoolData)
        this.canDisplay=true;
      }, 500
    )
  }

}
