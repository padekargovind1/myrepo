import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brochure-card',
  templateUrl: './brochure-card.component.html',
  styleUrls: ['./brochure-card.component.scss']
})
export class BrochureCardComponent implements OnInit {
  @Input() brochureData : any;
  constructor() { }

  ngOnInit() {
    console.log(this.brochureData);
  }

}
