import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-formation',
  templateUrl: './etablissement-formation.component.html',
  styleUrls: ['./etablissement-formation.component.scss']
})
export class EtablissementFormationComponent implements OnInit {

  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
  }

}
