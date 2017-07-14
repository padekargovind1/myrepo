import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etablissement-faq',
  templateUrl: './etablissement-faq.component.html',
  styleUrls: ['./etablissement-faq.component.scss']
})
export class EtablissementFaqComponent implements OnInit {

  @Input() schoolData : any;
  constructor() { }

  ngOnInit() {
  }

}
