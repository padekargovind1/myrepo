import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-etablissement-asso',
  templateUrl: './etablissement-asso.component.html',
  styleUrls: ['./etablissement-asso.component.scss']
})
export class EtablissementAssoComponent implements OnInit {

  @Input() schoolData: any;
  constructor() { }

  ngOnInit() {
  }

}
