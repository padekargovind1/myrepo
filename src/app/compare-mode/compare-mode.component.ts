import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss']
})
export class CompareModeComponent implements OnInit {

  constructor(private location : Location) { }

  ngOnInit() {
  }

  onNavigateBack(){
    this.location.back();
  }

}
