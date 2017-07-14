import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-articles',
  templateUrl: './etablissement-articles.component.html',
  styleUrls: ['./etablissement-articles.component.scss']
})
export class EtablissementArticlesComponent implements OnInit {
  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
  }

}
