import { Component, OnInit } from '@angular/core';
// import { jQuery } from '@types/jquery';

// import $ from 'jquery';

declare var $:any;
declare var tooltip: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor() { 
  	this.doTooltip();
  }

  ngOnInit() {
  }

  doTooltip() {
  	// (<any> $('[data-toggle="tooltip"]')).tooltip();
  }

}
