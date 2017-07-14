import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-mode',
  templateUrl: './compare-mode.component.html',
  styleUrls: ['./compare-mode.component.scss']
})
export class CompareModeComponent implements OnInit {

  schoolToCompare=[];

  constructor(private location : Location,
              private route : ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    let param = this.route.snapshot.params;
    console.log(param);
    this.schoolToCompare[0]=param[0];
    this.schoolToCompare[1]=param[1];
    // console.log(this.schoolToCompare);
  }

  onNavigateBack(){
    this.location.back();
  }

}
