import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-evenement',
  templateUrl: './etablissement-evenement.component.html',
  styleUrls: ['./etablissement-evenement.component.scss']
})
export class EtablissementEvenementComponent implements OnInit {

  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
  }

}
