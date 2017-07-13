import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-essentiel',
  templateUrl: './etablissement-essentiel.component.html',
  styleUrls: ['./etablissement-essentiel.component.scss']
})
export class EtablissementEssentielComponent implements OnInit {

  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
    // setTimeout(()=>{
    //   console.log(this.schoolData);
    // }, 1000)
  }

}
