import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mysearch-card',
  templateUrl: './mysearch-card.component.html',
  styleUrls: ['./mysearch-card.component.scss']
})
export class MysearchCardComponent implements OnInit {

  @Input() cardData;
  constructor() { }

  ngOnInit() {
  }

}
