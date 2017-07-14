import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-media',
  templateUrl: './etablissement-media.component.html',
  styleUrls: ['./etablissement-media.component.scss']
})
export class EtablissementMediaComponent implements OnInit {
  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
  }

}
